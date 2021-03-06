import React, { useContext } from "react";
import "./Modal.scss";
import { StateContext, ActionContext } from "../../hooks";
import { Auth, CreateNotary } from "..";
import { X } from "react-feather";

function Modal() {
  const { toggleModal } = useContext(ActionContext);
  const { openModal, modalConfig } = useContext(StateContext);

  return (
    <div>
      <div
        className={`modal-overlay ${!openModal ? "closed" : null}`}
        id="modal-overlay"
        onClick={(e) => toggleModal({ openModal: false, modalConfig: {} })}
      ></div>

      <div className={`modal ${!openModal ? "closed" : null}`} id="modal">
        <button
          className="close-button"
          id="close-button"
          onClick={(e) => toggleModal({ openModal: false, modalConfig: {} })}
        >
          <X />
        </button>
        <div className="modal-guts">
          {modalConfig.type === "sign-in" && <Auth />}
          {modalConfig.type === "create-notary" && <CreateNotary />}
        </div>
      </div>
    </div>
  );
}

export default Modal;
