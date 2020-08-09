/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./Home.scss";
import { StateContext } from "../../hooks";
import Header from "../Header";
import Sidebar from "../Sidebar";
import NotaryBox from "../NotaryBox";
import ViewNotary from "../ViewNotary";

function Home() {
  const { mailLoader } = React.useContext(StateContext);

  return (
    <>
      <Header />
      <div className="Home">
        {mailLoader && (
          <div className="notary-loader-container">
            <div className="notary-loader-text">Loading...</div>
          </div>
        )}
        <Sidebar></Sidebar>
        <NotaryBox></NotaryBox>
        <ViewNotary></ViewNotary>
      </div>
    </>
  );
}

export default Home;
