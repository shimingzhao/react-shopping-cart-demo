import React from "react";
//import { Col, Container, Row, Footer } from "mdbreact";

export const openInNewTab = url => {
  let win = window.open(url, "_blank");
  win.focus();
};

class Footer extends React.Component {
  render() {
    const stickToBottomStyle = {
      left: 0,
      position: "absolute",
      width: "100%",
      bottom: 0,
      overflow: "hidden",
      display: "block"
    };
    let date=new Date();

    return (
      <div className="Footer">
        <div className="footer-blueband">
          <div className="footer-content">
            <div className="social-icons">
              <a
                href="https://www.facebook.com/MultidevTechnologies"
                target="_blank"
                className="footer"
              >
                <i className="large facebook f icon" />
              </a>
              <a
                href="https://twitter.com/chaindrive"
                target="_blank"
                className="footer"
              >
                <i className="large twitter icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/multidev-technologies-inc-"
                target="_blank"
                className="footer"
              >
                <i className="large linkedin icon" />
              </a>
              <a
                href="https://plus.google.com/+ChaindriveRetail"
                target="_blank"
                className="footer"
              >
                <i className="large google plus g icon" />
              </a>
              <a
                href="https://www.youtube.com/user/MultidevTech"
                target="_blank"
                className="footer"
              >
                <i className="large youtube icon" />
              </a>
              <a
                href="https://chaindrive.com/blog/"
                target="_blank"
                className="footer"
              >
                <i className="large rss icon" />
              </a>
            </div>
            <p id="address" style={{ color: "white", float:"right", margin:"16px 32px 0 0", fontSize:"14px", fontFamily:"'Muli', sans-serif" }}>

              999 de Maisonneuve W. Suite 1100, Montreal, QC H3A 3L4
            </p>

          </div>
        </div>
              <p id="copyright">© 1997‑{date.getFullYear()}  Multidev Technologies Inc. All Rights Reserved.</p>

      </div>
    );
  }
}

export default Footer;
