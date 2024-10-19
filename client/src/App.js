import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import React from "react";

import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
const ethers = require("ethers");

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const newProvider = new ethers.providers.Web3Provider(
            window.ethereum
          );

          // Request access to the user's MetaMask accounts
          await newProvider.send("eth_requestAccounts", []);

          // Get the signer (used to sign transactions)
          const signer = newProvider.getSigner();

          // Get the user's address
          const address = await signer.getAddress();
          setAccount(address);

          // Set the contract
          const contractAddress = "0xb4D4EC74539d391C18Bb677d1310c5AF3e892E53";
          const newContract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          // Update states
          setContract(newContract);
          setProvider(newProvider);

          // Handle chain and account changes
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error connecting to MetaMask", error);
        }
      } else {
        console.error("MetaMask is not installed!");
      }
    };

    loadProvider();
  }, []);

  return (
    <div>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>IPFS_XdDrive</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </div>
  );
}

export default App;
