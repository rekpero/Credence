import React, { useEffect } from "react";
import "./NotaryBox.scss";
import NotaryBoxTopBar from "../NotaryBoxTopBar";
import NotaryBoxContent from "../NotaryBoxContent";
import { ArweaveService } from "../../services";

function NotaryBox() {
  return (
    <div className="NotaryBox">
      <NotaryBoxTopBar />
      <NotaryBoxContent />
    </div>
  );
}

export default NotaryBox;
