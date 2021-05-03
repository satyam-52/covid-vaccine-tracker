/**@jsxRuntime classic*/
/**@jsx jsx*/

import { css, jsx } from "@emotion/react";
// eslint-disable-next-line
import React from "react";

function Footer() {
  return (
    <footer css={CSS}>
      <p>No Copyrights.</p>
      <p>
        Created by:{" "}
        <a href="https://linkedin.com/in/satyamdua-18101999" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i> Satyam Dua.
        </a>
      </p>
    </footer>
  );
}

const CSS = css`
  width: 100%;
  padding: 15px 0;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  text-align: center;
  background: rgb(135, 135, 255);
  background: linear-gradient(
    164deg,
    rgba(135, 135, 255, 1) 25%,
    rgba(255, 255, 255, 1) 100%
  );
  color: white;

  p {
    a {
      transition: all 0.5s ease;

      i {
        transition: all 0.3s ease;
      }

      :hover i {
        color: #0ff;
      }

      :hover {
        color: #ff0;
      }
    }
  }
`;

export default Footer;
