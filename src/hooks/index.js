import React, { createContext, useMemo } from "react";
import { ArweaveService } from "../services";
import { useHistory } from "react-router-dom";
import moment from "moment";

export const ActionContext = createContext();
export const StateContext = createContext();

export const AppProvider = (props) => {
  const history = useHistory();
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            wallet: action.wallet.walletPrivateKey,
            walletAddress: action.wallet.walletAddress,
            userName: action.wallet.userName,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            wallet: null,
            walletAddress: "",
            userName: "",
          };
        case "TOGGLE_MODAL":
          return {
            ...prevState,
            openModal: action.modal.openModal,
            modalConfig: action.modal.modalConfig,
          };
        case "SET_ALL_NOTARIES":
          return {
            ...prevState,
            allNotaries: action.allNotaries,
          };
        case "SET_BACKUP_NOTARIES":
          return {
            ...prevState,
            backupNotaries: action.backupNotaries,
          };
        case "SET_SELECTED_NOTARY":
          return {
            ...prevState,
            selectedNotary: action.selectedNotary,
          };
        case "SET_LAST_SYNC_TIME":
          return {
            ...prevState,
            lastSyncTime: action.lastSyncTime,
          };
        case "SET_NOTARIES_LOADING":
          return {
            ...prevState,
            notariesLoading: action.notariesLoading,
          };
        default:
      }
    },
    {
      wallet: JSON.parse(sessionStorage.getItem("wallet")),
      walletAddress: sessionStorage.getItem("walletAddress"),
      userName: sessionStorage.getItem("userName"),
      openModal: false,
      modalConfig: {},
      notaryLoader: false,
      selectedMenu: "notary",
      selectedNotary: null,
      allNotaries: [],
      backupNotaries: [],
      bookmarkedNotaries: [],
      lastSyncTime: moment().toString(),
      notariesLoading: false,
      paginationConfig: {
        current: 1,
        count: 10,
      },
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: async (pData) => {
        pData.userName = await ArweaveService.getName(pData.walletAddress);
        sessionStorage.setItem(
          "wallet",
          JSON.stringify(pData.walletPrivateKey)
        );
        sessionStorage.setItem("walletAddress", pData.walletAddress);
        sessionStorage.setItem("userName", pData.userName);
        dispatch({ type: "SIGN_IN", wallet: pData });
        dispatch({
          type: "TOGGLE_MODAL",
          modal: { openModal: false, modalConfig: {} },
        });
        history.push("/home");
      },
      signOut: () => {
        sessionStorage.removeItem("wallet");
        sessionStorage.removeItem("walletAddress");
        sessionStorage.removeItem("userName");
        dispatch({ type: "SIGN_OUT" });
        history.push("/");
      },
      restoreWallet: () => {
        const data = {
          walletPrivateKey: JSON.parse(sessionStorage.getItem("wallet")),
          walletAddress: sessionStorage.getItem("walletAddress"),
          userName: sessionStorage.getItem("userName"),
        };
        dispatch({ type: "RESTORE_TOKEN", wallet: data });
      },
      toggleModal: (modal) => {
        console.log(modal);
        dispatch({ type: "TOGGLE_MODAL", modal });
      },
      getAllNotaries: async (walletAddress) => {
        dispatch({ type: "SET_NOTARIES_LOADING", notariesLoading: true });
        const allNotaries = await ArweaveService.getAllNotaries(walletAddress);
        dispatch({ type: "SET_ALL_NOTARIES", allNotaries });
        dispatch({ type: "SET_BACKUP_NOTARIES", backupNotaries: allNotaries });
        dispatch({ type: "SET_NOTARIES_LOADING", notariesLoading: false });
      },
      selectNotary: (notary) => {
        dispatch({ type: "SET_SELECTED_NOTARY", selectedNotary: notary });
      },
      searchNotaries: (text, backupNotaries) => {
        const notaryList = backupNotaries.filter(
          (notary) =>
            notary.title.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
        dispatch({ type: "SET_ALL_NOTARIES", allNotaries: notaryList });
      },
      refreshAllNotaries: async (walletAddress, isFirstTime, lastSyncTime) => {
        // if (isFirstTime) {
        //   dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: true });
        // } else {
        //   dispatch({ type: "SET_MAIL_LOADER", mailLoader: true });
        // }
        const allNotaries = await ArweaveService.getAllNotaries(walletAddress);
        const paginationConfig = state.paginationConfig;
        const startingPagination =
          (paginationConfig.current - 1) * paginationConfig.count;
        const endingPagination =
          paginationConfig.current * paginationConfig.count - 1;
        const finalNotaries = allNotaries.filter(
          (notary, index) =>
            index >= startingPagination && index <= endingPagination
        );
        console.log(finalNotaries);
        dispatch({
          type: "SET_ALL_NOTARIES",
          allNotaries: finalNotaries,
        });
        dispatch({
          type: "SET_BACKUP_NOTARIES",
          backupNotaries: finalNotaries,
        });
        lastSyncTime = moment().toString();
        dispatch({ type: "SET_LAST_SYNC_TIME", lastSyncTime });

        // if (isFirstTime) {
        //   dispatch({ type: "SET_FIRST_TIME_LOADER", firstTimeLoader: false });
        // } else {
        //   dispatch({ type: "SET_MAIL_LOADER", mailLoader: false });
        // }
      },
      setPagination: (prevPaginationConfig, paginationType, backupNotaries) => {
        let paginationConfig = {
          ...prevPaginationConfig,
          current:
            paginationType === "next"
              ? prevPaginationConfig.current + 1
              : prevPaginationConfig.current - 1,
        };
        const startingPagination =
          (paginationConfig.current - 1) * paginationConfig.count;
        const endingPagination =
          paginationConfig.current * paginationConfig.count - 1;
        const finalNotaries = backupNotaries.filter(
          (mail, index) =>
            index >= startingPagination && index <= endingPagination
        );
        dispatch({
          type: "SET_ALL_NOTARIES",
          allNotaries: finalNotaries,
        });
        dispatch({ type: "SET_PAGINATION_CONFIG", paginationConfig });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
