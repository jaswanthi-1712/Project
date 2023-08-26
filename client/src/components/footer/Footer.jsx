import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <a href="/" className="image-link">
              <img
                src="./img/zalogo.png"
                alt="Link Image"
                className="left-image"
              />
            </a>
            <div className="right-text">
              <h2>Ziegler Aerospace is a Global Aerospace Company, Operating under the EASA Part 21 framework and headquartered in the United Kingdom. our experienced Engineering Team is engaged in the design and certification of Structural and Cabin Interiors repairs and modifications for all types of Large Aircraft.</h2>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Footer;
