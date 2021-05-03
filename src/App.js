/**@jsxRuntime classic*/
/**@jsx jsx*/

import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App" css={CSS}>
      <main className="body">
        <section className="choices">
          <div className="option">
            <h3>Get Vaccine Sessions on a specific date:</h3>
            <ul>
              <Link to="/covid-vaccine-tracker/pin-tracker/"><li>Search by PIN</li></Link>
              <Link to="/covid-vaccine-tracker/district-tracker/"><li>Search by District</li></Link>
            </ul>
          </div>

          <div className="option">
            <h3>
              Get Vaccine Sessions for the next 7 days from a specific date:
            </h3>
            <ul>
            <Link to="/covid-vaccine-tracker/pin-tracker-weekly/"><li>Search by PIN</li></Link>
              <Link to="/covid-vaccine-tracker/district-tracker-weekly/"><li>Search by District</li></Link>
            </ul>
          </div>

          <div className="option">
            <h3>
              Get automated email when the vaccine is available in your area:
            </h3>
            <ul>
            <Link to="/covid-vaccine-tracker/automated-email"><li>Use Service <span>[BETA]</span></li></Link>
            </ul>
          </div>
        </section>

        <section className="details">
          <p>
            ** This application uses Co-WIN public APIs to find appointment
            availability.
          </p>
        </section>
      </main>
    </div>
  );
}

const CSS = css`
  width: 100%;

  .body {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    .choices {
      padding: 10px;

      @media screen and (max-width: 410px) {
        padding: 5px;
      }

      .option {
        h3 {
          font-size: 22px;
          width: fit-content;

          ::after {
            content: "";
            height: 4px;
            width: 0;
            background-color: rgba(135, 135, 255, 0.5);
            display: block;
            margin-left: 2px;
            transition: all 1s ease;
          }

          :hover::after {
            width: 100%;
          }

          @media screen and (max-width: 410px) {
            font-size: 18px;
          }
        }

        ul {
          padding: 20px;

          li {
            margin: 5px 0;
            color: rgba(0, 135, 135, 1);
            transition: all 0.3s ease;
            cursor: pointer;
            width: fit-content;

            ::after {
              content: "";
              height: 3px;
              width: 0;
              background-color: rgba(0, 135, 135, 1);
              display: block;
              transition: all 0.5s ease;
            }

            :hover::after {
              width: 100%;
            }

            :hover {
              color: rgb(0, 50, 50);
            }

            span {
              color: red;
            }
          }
        }
      }
    }

    .details {
      color: red;
      border-top: 1px solid red;
      border-bottom: 1px solid red;
      padding: 10px;
      margin-bottom: 100px;
    }
  }
`;

export default App;
