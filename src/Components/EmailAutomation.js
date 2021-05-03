/**@jsxRuntime classic*/
/**@jsx jsx*/

import { css, jsx } from "@emotion/react";
// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_8kuNy7f1b4qE6qcAsLmoz");

function EmailAutomation() {
  let intervalID = useRef(null);
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(
    "Please enter the details and press the submit button."
  );
  const templateId = "template_4ljqxzi";

  const minDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = dd + "-" + mm + "-" + yyyy;
    return today;
  };

  const [date, setDate] = useState(minDate());

  const refreshPage = () => {
    window.location.reload(false);
  };

  const loadData = async () => {
    try {
      setDate(minDate());
      console.log(date, pin);
      const res = await fetch(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
      );
      const data = res.json();
      data.then((val) => {
        // console.log(
        val.sessions?.map((session) => {
          if (session.available_capacity > 0) {
            let message = `Vaccine are available at ${
              session.name
            }, address: ${session.address}, ${session.state_name}.${
              session.pincode
            }. The center-id is ${
              session.center_id
            }. \n\nThe age limit to get vaccinated here is, ${
              session.min_age_limit
            } and the fees is: ₹${session.fee}/-.\n\nVaccine Available: ${
              session.vaccine
            }\n\nAvailable Capacity: ${
              session.available_capacity
            }\n\nTime Slots Available:\n\t${session.slots.join("\n\t")}`;
            // console.log(session);
            console.log(message);

            // let message = JSON.stringify(session, null, "\t");
            // console.log(message);
            //
            // clearInterval(intervalID.current);
            // ----
            emailjs
              .send("service_8fmyqeq", templateId, {
                message: message,
                from_name: "Satyam Dua",
                to_email: email,
              })
              .then((res) => {
                console.log("Email Successfully Sent!");
                refreshPage();
              })
              .catch((err) => {
                console.log(err);
                setStatus(`Error: ${err.message}`);
              });
            //  ------
          }
          return true;
        });
        // );
      });
    } catch (error) {
      console.log(error.message);
      setStatus(`ERROR: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.classList.add("noHover");
    console.log(e);
    setStatus(
      "Searching... Don't close this Window! Page will reload automatically once found a match."
    );
    intervalID.current = setInterval(loadData, 6000);
    // console.log(intervalID.current);
  };

  const handleStop = (e) => {
    e.preventDefault();
    e.target.form.classList.remove("noHover");
    e.target.form.children[2].children[0].classList.remove("noHover");
    e.target.form.children[2].children[0].disabled = false;
    refreshPage();
    console.log(e.target.form.children);
  };

  return (
    <div className="container" css={CSS}>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="pin">Enter Pincode:</label>
            <input
              type="text"
              name="pin"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="400001"
            />
          </div>
          <div className="form__group">
            <label htmlFor="email">Enter Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@xyz.com"
            />
          </div>
          <div className="form__group">
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
            <button type="reset" onClick={handleStop}>
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="tracker__status">
        <h1>{status}</h1>
      </div>
    </div>
  );
}

const CSS = css`
  .form__container {
    width: 100%;
    display: flex;
    justify-content: center;

    form {
      display: flex;
      flex-direction: column;
      width: 300px;
      background-color: rgba(135, 135, 255, 0.5);
      border-radius: 4px;
      padding: 10px 20px;

      .form__group {
        display: flex;
        flex-direction: column;
        margin: 8px 0;

        label {
          margin-bottom: 5px;
        }

        input {
          padding: 5px;
          border: none;
          background-color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          border-radius: 4px;

          :hover,
          :focus {
            background-color: white;
          }
        }

        input[type="text"] {
          padding: 7.5px 5px;
        }

        button {
          padding: 5px;
          border: none;
          color: rgb(135, 135, 255);
          text-transform: uppercase;
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 1px;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 6px;

          :not(.noHover):hover {
            color: white;
            background-color: rgb(135, 135, 255);
          }
        }
      }
    }
  }
  .tracker__status {
    width: 100%;
    max-width: 1200px;
    margin: 100px auto;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    h1 {
      font-weight: 400;
      border-bottom: 1px solid lightgray;
      border-top: 1px solid lightgray;
      background-color: rgb(135, 135, 255);
      transition: all 0.5s ease;

      :hover {
        background: rgb(135, 135, 255);
        background: linear-gradient(
          164deg,
          rgba(135, 135, 255, 1) 25%,
          rgba(200, 200, 255, 0.5) 100%
        );
      }
    }
  }
`;

export default EmailAutomation;
