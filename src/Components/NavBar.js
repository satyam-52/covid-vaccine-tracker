/**@jsxRuntime classic*/
/**@jsx jsx*/

import { css, jsx } from "@emotion/react";
// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header css={CSS}>
      <Link to="/covid-vaccine-tracker/">
        <h1>COVID-19 VACCINE TRACKER</h1>
      </Link>
      <div className="home">
        <Link to="/covid-vaccine-tracker/">
          <button>Home</button>
        </Link>
      </div>
    </header>
  );
}

const CSS = css`
background: rgb(135, 135, 255);
background: linear-gradient(
  164deg,
  rgba(135, 135, 255, 1) 25%,
  rgba(200, 200, 255, 0.01) 100%
);
  h1 {
    width: 100%;
    text-align: center;
    color: white;
    padding: 10px;
    // margin-bottom: 15px;
  }

  .home {
    padding-left: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 15px;
    margin-top: -2px;
    display: flex;
    justify-content: center;
    
    button {
      padding: 5px;
      border: none;
      background-color: rgb(255, 255, 255, 0.1);
      font-size: 18px;
      color: white;
      text-transform: uppercase;
      transition: all 0.3s ease;
      font-weight: 600;
      letter-spacing: 1px;
      border-radius: 2px;
      // border: 1px solid rgb(135, 135, 255);
      cursor: pointer;
      width: fit-content;

      ::after {
        content: "";
        height: 3px;
        width: 0;
        background-color: rgb(135, 135, 255);
        display: block;
        transition: 0.5s all ease;
      }

      :hover {
        background-color: white;
        color: rgb(135, 135, 255);
      }

      :hover::after {
        width: 100%;
      }
    }
  }
`;

export default NavBar;
