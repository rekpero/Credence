import Arweave from "arweave/web";
import { APP_NAME, APP_VERSION } from "../utils";
import { readContract, selectWeightedPstHolder } from "smartweave";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const contractId = "s_IMWNug5-I3c22v_oIIUV_8wfh_AiDXzQIyKVUVuRw";

export default class ArweaveService {
  static getWalletAddress = (wallet) => {
    return arweave.wallets.jwkToAddress(wallet);
  };

  static getWalletAmount = (address) => {
    return arweave.wallets.getBalance(address);
  };

  static convertToAr = (amount) => {
    return arweave.ar.winstonToAr(amount);
  };

  static convertToWinston = (amount) => {
    return arweave.ar.arToWinston(amount);
  };

  static getTxStatus = async (txIds) => {
    const getAllStatus = await Promise.all(
      txIds.map((txId) => this.fetchStatus(txId))
    );
    return getAllStatus;
  };

  static fetchStatus = async (txId) => {
    const res = await fetch(`https://arweave.net/tx/${txId}/status`)
      .then((data) => data.json())
      .catch((err) => console.log(err));
    return res;
  };

  static uploadFiles = async (file, fileType, wallet) => {
    let transaction = await arweave.createTransaction({ data: file }, wallet);
    console.log(transaction.id);

    transaction.addTag("Content-Type", fileType);

    await arweave.transactions.sign(transaction, wallet);

    let uploader = await arweave.transactions.getUploader(transaction);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
    return transaction.id;
  };

  static createNotary = async (notary, wallet) => {
    console.log(wallet);
    const contractState = await readContract(arweave, contractId);
    const holder = selectWeightedPstHolder(contractState.balances);
    console.log(holder);
    const transaction = await arweave.createTransaction(
      {
        target: holder,
        quantity: arweave.ar.arToWinston("0.01"),
      },
      wallet
    );
    transaction.addTag("type", notary.type);
    transaction.addTag("title", notary.title);
    transaction.addTag("description", notary.description);
    if (notary.type === "text") {
      const contentBuffer = Buffer.from(notary.content);
      const hash = await Arweave.crypto.hash(contentBuffer);
      const hashBase64 = Arweave.utils.bufferTob64Url(hash);
      transaction.addTag("content", notary.content);
      transaction.addTag("hash", hashBase64);
    } else {
      const documentId = await this.uploadFiles(
        notary.document.buffer,
        notary.document.file.type,
        wallet
      );
      const hash = await Arweave.crypto.hash(notary.document.buffer);
      const hashBase64 = Arweave.utils.bufferTob64Url(hash);
      console.log(hashBase64);
      transaction.addTag("document", documentId);
      transaction.addTag("hash", hashBase64);
      const fileMeta = {
        name: notary.document.file.name,
        type: notary.document.file.type,
        size: notary.document.file.size,
      };
      console.log(fileMeta);
      transaction.addTag("documentMeta", JSON.stringify(fileMeta));
      console.log(documentId);
    }
    transaction.addTag("time", Math.round(new Date().getTime() / 1000));
    transaction.addTag("App-Name", APP_NAME);
    transaction.addTag("App-Version", APP_VERSION);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);
  };

  static getAllNotaries = async (walletAddress) => {
    let get_mail_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "from",
        expr2: walletAddress,
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "App-Name",
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: APP_VERSION,
        },
      },
    };

    const res = await arweave.api.post(`arql`, get_mail_query);

    var tx_rows = [];
    if (res.data === "") {
      tx_rows = [];
    } else {
      tx_rows = await Promise.all(
        res.data.map(async (id, i) => {
          let tx_row = {};
          const tx_status = await arweave.transactions.getStatus(id);
          console.log(tx_status);
          if (tx_status.confirmed) {
            let tx = await arweave.transactions.get(id);
            console.log(tx);
            tx.get("tags").forEach((tag) => {
              let key = tag.get("name", { decode: true, string: true });
              let value = tag.get("value", { decode: true, string: true });
              tx_row[key] = value;
            });
            tx_row["txId"] = id;
            tx_row["id"] = id;
            tx_row["txQty"] = arweave.ar.winstonToAr(tx.quantity);
            tx_row["txStatus"] = tx_status;
            return tx_row;
          }
        })
      );
    }
    tx_rows = tx_rows.filter((tx) => tx);
    console.log(tx_rows);
    return tx_rows;
  };

  static getName = async (addr) => {
    let get_name_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "App-Name",
        expr2: "arweave-id",
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: addr,
        },
        expr2: {
          op: "equals",
          expr1: "Type",
          expr2: "name",
        },
      },
    };

    const txs = await arweave.api.post(`arql`, get_name_query);

    if (txs.data.length === 0) return addr;

    const tx = await arweave.transactions.get(txs.data[0]);
    return tx.get("data", { decode: true, string: true });
  };
}
