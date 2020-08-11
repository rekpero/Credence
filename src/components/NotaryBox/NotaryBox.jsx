import React from "react";
import "./NotaryBox.scss";
import NotaryBoxTopBar from "../NotaryBoxTopBar";
import NotaryBoxContent from "../NotaryBoxContent";

function NotaryBox() {
  return (
    <div className="NotaryBox">
      <NotaryBoxTopBar />
      <NotaryBoxContent />
    </div>
  );
}

export default NotaryBox;
