import React, { useContext } from "react";
import "./Landing.scss";
import { ActionContext } from "../../hooks";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";

function Landing() {
  const { toggleModal } = useContext(ActionContext);
  const [selectedUsage, setSelectedUsage] = React.useState(0);
  const usageList = [
    "yWXfY1_YpL3rNcTCYdepWK13GwmRIZhjIoqNizLFYVo",
    "pSvIUgcl3npQmaBLr2hj5qQdLOh7FPORlDFEUwr50ZI",
    "6yc5bDppM04XFdU5cLdBI7xm1MPeui2OjciKCGxVrXA",
  ];

  return (
    <div className="Landing">
      <div className="landing-container" id="home">
        <div className="header-section">
          <div className="header-bar">
            <div className="header-app-icon">
              <Link to="/">Credence.</Link>
            </div>
            <div className="header-action-button-container">
              <div className="header-tabs">
                <AnchorLink href="#home">Home</AnchorLink>
              </div>
              {/* <div className="header-tabs">
                <AnchorLink href="#feature">Features</AnchorLink>
              </div> */}
              <div className="header-tabs">
                <AnchorLink href="#usage">How to Use?</AnchorLink>
              </div>
              <div className="header-tabs">
                <button
                  className="header-play-buttons"
                  onClick={(e) =>
                    toggleModal({
                      openModal: true,
                      modalConfig: { type: "sign-in" },
                    })
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="home-section">
          <div className="home-placeholder">
            <div className="home-text-container">
              <div className="home-title-container">
                <h1 className="home-title">Notary made permanent</h1>
              </div>
              <div className="home-tagline">
                <span className="highlight">Permanotary</span> lets you store{" "}
                <span className="highlight">notary permanently</span>.
              </div>
              <div className="get-started-container">
                <button
                  className="header-play-buttons"
                  onClick={(e) =>
                    toggleModal({
                      openModal: true,
                      modalConfig: { type: "sign-in" },
                    })
                  }
                >
                  Get Started
                </button>
              </div>
            </div>
            <div className="home-icon-container"></div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div className="usage-section" id="usage">
          <div className="usage-container">
            <h1>How do I use permanotary?</h1>
            <p>
              It's a simple <span className="highlight">3-step process</span>.
            </p>
            <div className="usage-demo-container">
              <div className="usage-list-container">
                <div
                  className={`usage-list-item ${
                    selectedUsage === 0 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(0)}
                >
                  <div className="usage-number">1</div>
                  <div className="usage-details">
                    <div className="usage-details-title">
                      Create Arweave Wallet
                    </div>
                    <div className="usage-details-description">
                      First, create a permaweb wallet.
                    </div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 1 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(1)}
                >
                  <div className="usage-number">2</div>
                  <div className="usage-details">
                    <div className="usage-details-title">Login to weavy</div>
                    <div className="usage-details-description">
                      Use your wallet to sign-in.
                    </div>
                  </div>
                </div>
                <div
                  className={`usage-list-item ${
                    selectedUsage === 2 ? "selected" : ""
                  }`}
                  onClick={(e) => setSelectedUsage(2)}
                >
                  <div className="usage-number">3</div>
                  <div className="usage-details">
                    <div className="usage-details-title">
                      Send messages with weavy
                    </div>
                    <div className="usage-details-description">
                      Use weavy to send and receive!
                    </div>
                  </div>
                </div>
              </div>
              <div className="usage-image-container">
                <img
                  src={"https://arweave.net/" + usageList[selectedUsage]}
                  alt="demo-icon"
                  className="usage-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-app-section">
            <h1 className="footer-app-name">permanotary.</h1>
            <p>
              Built with{" "}
              <span role="img" aria-label="Purple heart">
                💜
              </span>{" "}
              in{" "}
              <a
                href="https://github.com/mmitrasish/weavy"
                target="_blank"
                rel="noopener noreferrer"
                className="open-source"
              >
                open-source
              </a>
              .
            </p>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Quick Links</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Arweave
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/technology#permaweb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Permaweb
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/get-involved/community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Community
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  className="footer-link"
                  href="https://www.arweave.org/mine/learn-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-section">
            <h3 className="footer-link-header">Navigations</h3>
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <AnchorLink href="#home" className="footer-link">
                  Home
                </AnchorLink>
              </li>
              <li className="footer-link-item">
                {/* <AnchorLink href="#feature" className="footer-link">
                  Feature
                </AnchorLink> */}
              </li>
              <li className="footer-link-item">
                <AnchorLink href="#usage" className="footer-link">
                  Demo
                </AnchorLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
