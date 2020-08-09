import React from "react";
import "./Header.scss";
import makeBlockie from "ethereum-blockies-base64";
import { ActionContext, StateContext } from "../../hooks";
import copy from "clipboard-copy";
import { shortenAddress } from "../../utils";
import { Search, Clipboard, ExternalLink } from "react-feather";
import { Link } from "react-router-dom";

function Header() {
  const { signOut, searchNotaries } = React.useContext(ActionContext);
  const { walletAddress, backupNotaries, userName } = React.useContext(
    StateContext
  );
  const [showDropdown, setShowDropdown] = React.useState(false);
  const logout = () => {
    signOut();
  };
  const copyWalletAddress = () => {
    copy(walletAddress);
  };
  const openArweaveIdLink = () => {
    window.open(
      "https://alz4bdsrvmoz.arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0",
      "_blank"
    );
  };
  return (
    <div className="Header">
      <div className="logo-container">
        <Link to="/">
          <h3 className="logo-name">Credence.</h3>
        </Link>
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <Search />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search notary"
            onChange={(e) => searchNotaries(e.target.value, backupNotaries)}
          />
        </div>
      </div>
      <div className="user-profile-container">
        {/* <div className="notification-container">
          <FontAwesomeIcon icon={faBell} />
        </div> */}
        <div onClick={(e) => setShowDropdown(!showDropdown)}>
          <img
            src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
            alt="address-blockie"
            className="user-profile-blockie-icon"
          />
        </div>
      </div>
      {showDropdown && (
        <div
          className="dropdown-overlay"
          onClick={(e) => setShowDropdown(false)}
        ></div>
      )}
      {showDropdown && (
        <div className="toolbar-dropdown-box">
          <div className="toolbar-dropdown-profile-icon-container">
            <img
              src={makeBlockie("jeNnvxnU0qguF-xj3k1hMYlSHgEOMAxtpeYBwKy1r9k")}
              alt="address-blockie"
              className="user-profile-blockie-icon"
            />
          </div>
          <div className="wallet-address-container" onClick={copyWalletAddress}>
            <div className="dropdown-title">{shortenAddress(userName)}</div>
            <div className="wallet-address-copy">
              <Clipboard height={16} width={16} />
            </div>
          </div>
          <div className="wallet-address-container" onClick={openArweaveIdLink}>
            <div className="dropdown-title">Configure ArweaveId</div>
            <div className="wallet-address-copy">
              <ExternalLink height={16} width={16} />
            </div>
          </div>
          <div className="dropdown-menu-button-container">
            <button
              type="button"
              onClick={logout}
              className="dropdown-menu-button"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
