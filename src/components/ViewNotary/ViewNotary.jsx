import React, { useState } from "react";
import "./ViewNotary.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFolderOpen,
  faCircle,
  faInfoCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { StateContext, ActionContext } from "../../hooks";
import moment from "moment";
import Iframe from "react-iframe";
import Truncate from "react-truncate";
import SlidingPanel from "react-sliding-side-panel";

function ViewNotary() {
  const { selectNotary } = React.useContext(ActionContext);
  const { selectedNotary } = React.useContext(StateContext);
  const [openPanel, setOpenPanel] = useState(false);

  return (
    <div className="ViewNotary">
      {selectedNotary ? (
        <>
          <div className="view-notary-header">
            <div className="view-notary-header-content">
              <h2 className="view-notary-header-subject">
                {selectedNotary.title ? selectedNotary.title : "(no title)"}
              </h2>
              <span className="view-notary-divider">
                <FontAwesomeIcon icon={faCircle} />
              </span>
              <span className="view-notary-description">
                <Truncate lines={1} ellipsis={<span>...</span>}>
                  {selectedNotary.txId}
                </Truncate>
              </span>
            </div>
            <div className="notary-header-right">
              <span className="notary-time">
                {moment.unix(selectedNotary.time).fromNow()}
              </span>
              <span
                className="view-notary-header-close"
                onClick={(e) => setOpenPanel(true)}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span
                className="view-notary-header-close"
                onClick={(e) => selectNotary(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          </div>
          <div className="view-notary-body-container">
            <Iframe
              url={`https://arweave.net/${selectedNotary.document}`}
              width="100%"
              height="100%"
              id="myId"
              className="view-notary-body-item"
              display="initial"
              position="relative"
            />
          </div>
        </>
      ) : (
        <div className="no-notary-container">
          <div>
            <FontAwesomeIcon
              className="no-notary-icon"
              icon={faFolderOpen}
            ></FontAwesomeIcon>
          </div>
          <div>No Notary Selected</div>
        </div>
      )}
      {selectedNotary && (
        <SlidingPanel
          type={"right"}
          isOpen={openPanel}
          size={20}
          noBackdrop={true}
          // panelClassName="notary-info-panel"
        >
          <div className="notary-info-panel-container">
            <div className="notary-info-header">
              <span
                className="view-notary-header-close"
                onClick={(e) => setOpenPanel(false)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </span>
              <h3 className="notary-info-header-title">Notary Info</h3>
            </div>
            <div className="notary-info-content">
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">Title</div>
                <div className="notary-info-content-field-value">
                  {selectedNotary.title}
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">
                  Description
                </div>
                <div className="notary-info-content-field-value">
                  {selectedNotary.description}
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">
                  Notary Hash
                </div>
                <div className="notary-info-content-field-value">
                  {selectedNotary.hash}
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">Tx Id</div>
                <div className="notary-info-content-field-value">
                  {selectedNotary.txId}
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">
                  Arweave Viewblock
                </div>
                <div className="notary-info-content-field-value">
                  <a
                    href={`https://viewblock.io/arweave/tx/${selectedNotary.txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`https://viewblock.io/arweave/tx/${selectedNotary.txId}`}</a>
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">
                  Notary Link
                </div>
                <div className="notary-info-content-field-value">
                  <a
                    href={`https://arweave.net/${selectedNotary.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`https://arweave.net/${selectedNotary.document}`}</a>
                </div>
              </div>
              <div className="notary-info-content-field">
                <div className="notary-info-content-field-title">
                  Created On
                </div>
                <div className="notary-info-content-field-value">
                  {moment
                    .unix(selectedNotary.time)
                    .format("YYYY-MM-DD hh:mm:ss A")}
                </div>
              </div>
            </div>
          </div>
        </SlidingPanel>
      )}
    </div>
  );
}

export default ViewNotary;
