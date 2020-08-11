import React from "react";
import "./Sidebar.scss";
import { ActionContext, StateContext } from "../../hooks";
import { Plus, FileText } from "react-feather";

function Sidebar() {
  const { toggleModal, selectMenu } = React.useContext(ActionContext);
  const { selectedMenu } = React.useContext(StateContext);

  return (
    <div className="Sidebar">
      <button
        className="notary-create-container"
        onClick={(e) =>
          toggleModal({
            openModal: true,
            modalConfig: { type: "create-notary" },
          })
        }
      >
        <span className="compose-icon">
          <Plus />
        </span>
        <span className="compose-title">Create Notary</span>
      </button>
      <div
        className={`sidebar-item ${
          selectedMenu === "notary" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("notary")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FileText />
          </span>
          <span className="sidebar-item-title">Notaries</span>
        </span>
        {/* <span className="sidebar-item-number">1</span> */}
      </div>
      {/* <div
        className={`sidebar-item ${
          selectedMenu === "progress" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("progress")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <Loader />
          </span>
          <span className="sidebar-item-title">In Progress</span>
        </span>
        <span className="sidebar-item-number">1</span>
      </div> */}
    </div>
  );
}

export default Sidebar;
