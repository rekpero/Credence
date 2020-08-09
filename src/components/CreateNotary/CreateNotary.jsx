import React, { useContext, useState } from "react";
import "./CreateNotary.scss";
import { ArweaveService } from "../../services";
import { UploadCloud } from "react-feather";
import { ActionContext, StateContext } from "../../hooks";
import Loader from "react-loader-spinner";
import ReactTooltip from "react-tooltip";

function CreateNotary() {
  const { toggleModal, getAllNotaries } = useContext(ActionContext);
  const { wallet, walletAddress } = useContext(StateContext);
  const [notaryType, setNotaryType] = useState("");
  const [notaryDocument, setNotaryDocument] = useState();
  const [notaryContent, setNotaryContent] = useState("");
  const [notaryTitle, setNotaryTitle] = useState("");
  const [notaryDescription, setNotaryDescription] = useState("");
  const [createNotaryLoader, setCreateNotaryLoader] = useState(false);
  // load file to json
  const fileUpload = (file) => {
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => convertToBuffer(reader, file);
  };

  const convertToBuffer = async (reader, file) => {
    const buffer = Buffer.from(reader.result);
    // ArweaveService.uploadFiles(buffer, file.type, wallet);
    setNotaryDocument({ file, buffer });
  };

  const saveNotary = async () => {
    setCreateNotaryLoader(true);
    const notary = {
      type: notaryType,
      title: notaryTitle,
      description: notaryDescription,
      document: notaryDocument,
      content: notaryContent,
    };
    await ArweaveService.createNotary(notary, wallet);
    setCreateNotaryLoader(false);
    getAllNotaries(walletAddress);
    toggleModal({ openModal: false, modalConfig: {} });
    console.log("Done");
  };

  return (
    <>
      <ReactTooltip id="pst-tooltip" place="top" type="dark" effect="float">
        <span>
          Transaction fees payout to credence PST holders and support Credence
          development.
        </span>
      </ReactTooltip>
      <div className="CreateNotary">
        <div className="create-notary-title">Create Notary</div>
        <div className="create-notary-container">
          {notaryType ? (
            <div className="create-notary-form-container">
              {notaryType === "media" ? (
                <div className="create-notary-form-field">
                  <div className="create-notary-upload-title">
                    Notary Document
                  </div>
                  {!notaryDocument ? (
                    <div className="create-notary-input-field">
                      <input
                        className="create-notary-file-import"
                        type="file"
                        id="file"
                        onChange={(e) => fileUpload(e.target.files[0])}
                      />
                      <div>
                        <div className="create-notary-upload-icon">
                          <UploadCloud />
                        </div>
                        <div className="create-notary-upload-icon-title">
                          Upload a document you want to notarize
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="create-notary-document">
                      {notaryDocument.file.name}
                    </div>
                  )}
                </div>
              ) : (
                <div className="create-notary-form-field">
                  <div className="create-notary-upload-title">
                    Notary Content
                  </div>
                  <textarea
                    name="notarize-text"
                    id="notarize-text"
                    cols="30"
                    rows="3"
                    className="create-notary-textarea"
                    placeholder="Enter the text you want to notarize"
                    value={notaryContent}
                    onChange={(e) => setNotaryContent(e.target.value)}
                  ></textarea>
                </div>
              )}
              <div className="create-notary-form-field">
                <div className="create-notary-upload-title">Notary Title</div>
                <input
                  type="text"
                  className="create-notary-input"
                  placeholder="Enter a title"
                  value={notaryTitle}
                  onChange={(e) => setNotaryTitle(e.target.value)}
                />
              </div>
              <div className="create-notary-form-field">
                <div className="create-notary-upload-title">
                  Notary Description
                </div>
                <input
                  type="text"
                  className="create-notary-input"
                  placeholder="Enter a description"
                  value={notaryDescription}
                  onChange={(e) => setNotaryDescription(e.target.value)}
                />
              </div>
              <div className="fee-container">
                <span className="fee-title">PST Fee:</span>
                <span className="fee-value" data-tip data-for="pst-tooltip">
                  0.1 AR
                </span>
              </div>
              <div className="create-notary-form-field">
                <button
                  type="button"
                  className="create-notary-form-button"
                  onClick={saveNotary}
                >
                  {createNotaryLoader ? (
                    <Loader
                      type="Oval"
                      color="#FFF"
                      height={24}
                      width={24}
                      style={{ display: "flex" }}
                    />
                  ) : (
                    "Create Notary"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="create-notary-type-container">
              <div className="create-notary-type-title">Select Notary Type</div>
              <div className="create-notary-type-options">
                <div
                  className="create-notary-type-item right-margin"
                  onClick={(e) => setNotaryType("text")}
                >
                  <img
                    src={require("../../assets/text.png")}
                    alt="text"
                    className="upload-text-icon"
                  />
                  <div className="create-notary-type-text">Text</div>
                  <div className="create-notary-type-description">
                    Notarize any text you want to permanently persist
                  </div>
                </div>
                <div
                  className="create-notary-type-item left-margin"
                  onClick={(e) => setNotaryType("media")}
                >
                  <img
                    src={require("../../assets/file.png")}
                    alt="file"
                    className="upload-text-icon"
                  />
                  <div className="create-notary-type-text">Media</div>
                  <div className="create-notary-type-description">
                    Notarize any media you want to permanently persist
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateNotary;
