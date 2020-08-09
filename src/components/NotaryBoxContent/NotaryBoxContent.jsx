import React, { useEffect } from "react";
import "./NotaryBoxContent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hooks";
import moment from "moment";

function NotaryBoxContent() {
  const {
    allNotaries,
    selectedNotary,
    selectedMenu,
    walletAddress,
  } = React.useContext(StateContext);
  const { selectNotary, getAllNotaries } = React.useContext(ActionContext);

  useEffect(() => {
    if (walletAddress) {
      console.log(walletAddress);
      getAllNotaries(walletAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  console.log(allNotaries);

  return (
    <div className="NotaryBoxContent">
      {selectedMenu === "notary" && allNotaries.length
        ? allNotaries.map((notary, id) => (
            <div
              className={`${
                selectedNotary && selectedNotary.id === notary.id
                  ? "selected"
                  : ""
              } notary-item`}
              key={id}
              onClick={(e) => selectNotary(notary)}
            >
              <div className="notary-content-container">
                <div className="notary-header-container">
                  <span className="notary-title-container">
                    <span className="notary-title">{notary.title}</span>
                  </span>
                  <span className="notary-time">
                    {moment.unix(notary.time).fromNow()}
                  </span>
                </div>
                <div className="notary-body-container">
                  <span className="notary-body">{notary.description}</span>
                </div>
              </div>
            </div>
          ))
        : selectedMenu === "notary" && (
            <div className="no-notary-container">
              <div>
                <FontAwesomeIcon
                  className="no-notary-icon"
                  icon={faFolderOpen}
                ></FontAwesomeIcon>
              </div>
              <div>No Notary Found</div>
            </div>
          )}
    </div>
  );
}

export default NotaryBoxContent;
