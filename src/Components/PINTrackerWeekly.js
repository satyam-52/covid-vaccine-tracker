/**@jsxRuntime classic*/
/**@jsx jsx*/

import { css, jsx } from "@emotion/react";
// eslint-disable-next-line
import React, { useState } from "react";

function PINTrackerWeekly() {
  const [state, setState] = useState([]);
  const [pin, setPin] = useState("");

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

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const [date, setDate] = useState(minDate());
  const [display, setDisplay] = useState("none");

  const dateFormat = (e) => {
    let d = new Date(date);
    let day = d.getDate();
    let month = d.getMonth();
    month++;
    let year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${dateFormat()}`
    )
      .then((res) => {
        res.json().then((val) => {
          setState(val.centers);
          // console.log(state);
          setDisplay("block");
        });
      })
      .catch((error) => {
        setState([]);
        alert(error.message);
      });
  };

  return (
    <div css={CSS}>
      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="pin">Enter Pincode</label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="400001"
            />
          </div>
          <div className="form__group">
            <label htmlFor="date">Enter Date</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="dd-mm-yyyy"
              min={minDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* For 1 Day */}
      <main style={{ display: `${display}` }}>
        <header>
          <h1>Details:</h1>
        </header>
        {state?.length !== 0 && pin > 100000 ? (
          state?.map((cur, id) => (
            <div key={id} className="details">
              <p>
                District Name: <span>{cur?.district_name}</span>
              </p>
              <p>
                Block Name: <span>{cur?.block_name}</span>
              </p>
              <p>
                Center Name: <span>{cur?.name}</span>
              </p>
              <p>
                PIN Code: <span>{cur?.pincode}</span>
              </p>
              <p>
                State Name: <span>{cur?.state_name}</span>
              </p>
              <p>
                Sessions:
                <ul>
                  {cur?.sessions.map((val, k) => (
                    <li key={k}>
                      <p>
                        Date:{" "}
                        <span style={{ color: "red", fontWeight: "bolder" }}>
                          {val?.date}
                        </span>
                      </p>
                      <p>
                        Fees: <span>{val.fee ? val.fee : "Not Available"}</span>
                      </p>
                      <p>
                        Minimum Age Limit: <span>{val.min_age_limit}</span>
                      </p>
                      <p>
                        Vaccine Name:{" "}
                        <span>
                          {val.vaccine === "" ? "Not Available" : val.vaccine}
                        </span>
                      </p>
                      <p>
                        Time Slots:{" "}
                        <ul>
                          {val?.slots &&
                            val.slots.map((slot, i) => <li key={i}>{slot}</li>)}
                        </ul>
                      </p>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          ))
        ) : (
          <div className="details" style={{ color: "red" }}>
            <p>No Slots found for the given date.</p>
            <p>Please enter a different date or PIN code.</p>
          </div>
        )}
      </main>
    </div>
  );
}

// district_name: "Lucknow", block_name: "LUCKNOW URBAN", …}
// available_capacity: 100
// block_name: "LUCKNOW URBAN"
// center_id: 601853
// date: "05-04-2021"
// district_name: "Lucknow"
// fee: "0"
// fee_type: "Paid"
// from: "09:00:00"
// lat: 26
// long: 80
// min_age_limit: 45
// name: "Azad Nagar Rajpoot Hospital"
// pincode: 226005
// session_id: "699a1e3f-8fe9-4407-b998-34055e559864"
// slots: (4) ["09:00AM-11:00AM", "11:00AM-01:00PM", "01:00PM-03:00PM", "03:00PM-06:00PM"]
// state_name: "Uttar Pradesh"
// to: "18:00:00"
// vaccine: "COVISHIELD"

const CSS = css`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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

          :hover {
            color: white;
            background-color: rgb(135, 135, 255);
          }
        }
      }
    }
  }
  main {
    margin-top: 25px;
    margin-bottom: 100px;

    header {
      font-size: 24px;
      color: rgb(100, 100, 255);

      h1 {
        margin: 0 auto;
        width: fit-content;

        ::after {
          content: "";
          height: 4px;
          width: 50%;
          background-color: rgb(100, 100, 255);
          display: block;
          margin-left: 2px;
        }
      }
    }

    .details {
      margin-top: 10px;
      border: 1px solid lightgray;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 20px;

      p {
        font-weight: bold;
        text-transform: uppercase;
        margin: 6px 0;

        span {
          font-weight: 400;
        }

        ul {
          margin-top: 5px;
          margin-left: 20px;
          font-weight: 400;

          li {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
`;

export default PINTrackerWeekly;
