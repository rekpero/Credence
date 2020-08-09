import React from "react";
import "./NotaryBoxTopBar.scss";
import { StateContext, ActionContext } from "../../hooks";
import moment from "moment";
import { RefreshCcw, ChevronLeft, ChevronRight } from "react-feather";

function NotaryBoxTopBar() {
  const {
    walletAddress,
    backupNotaries,
    paginationConfig,
    lastSyncTime,
  } = React.useContext(StateContext);
  const { refreshAllNotaries, setPagination } = React.useContext(ActionContext);
  const startingPagination =
    (paginationConfig.current - 1) * paginationConfig.count + 1;
  const endingPagination =
    paginationConfig.current * paginationConfig.count > backupNotaries.length
      ? backupNotaries.length
      : paginationConfig.current * paginationConfig.count;
  const leftEnabled = startingPagination !== 1;
  const rightEnabled = endingPagination !== backupNotaries.length;

  return (
    <div className="NotaryBoxTopBar">
      <div className="notary-box-top-bar-left">
        {/* <div className="select-all-container">
          <input type="checkbox" className="filled" />
        </div> */}
        <div
          className="reload-container"
          onClick={(e) =>
            refreshAllNotaries(walletAddress, false, lastSyncTime)
          }
        >
          <RefreshCcw height={18} width={18} />
        </div>
      </div>
      <div className="notary-box-top-bar-right">
        <div className="last-synced-container">
          Last synced at {moment(lastSyncTime).format("LT")}
        </div>
        <div className="pagination-content-container">
          {backupNotaries.length > startingPagination
            ? startingPagination
            : backupNotaries.length}
          -{endingPagination} of {backupNotaries.length}
        </div>
        <div
          className={`pagination-left-container ${
            !leftEnabled ? "disabled" : ""
          }`}
          onClick={(e) =>
            setPagination(paginationConfig, "prev", backupNotaries)
          }
        >
          <ChevronLeft />
        </div>
        <div
          className={`pagination-right-container ${
            !rightEnabled ? "disabled" : ""
          }`}
          onClick={(e) =>
            setPagination(paginationConfig, "next", backupNotaries)
          }
        >
          <ChevronRight />
        </div>
        {/* <div className="pagination-menu-container">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div> */}
      </div>
    </div>
  );
}

export default NotaryBoxTopBar;
