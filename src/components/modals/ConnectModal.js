import React, {useState, useEffect} from 'react';
import { useWallet } from 'use-wallet';
import {Modal} from 'react-bootstrap';
import { Spinner } from '../common/Spinner';
import metaMaskLogo from '../../assets/images/metamask-fox.svg';
import walletConnectLogo from '../../assets/images/wallet-connect.svg';

const ConnectModal = (props) => {

  const wallet = useWallet();

  const [showInstructions, setShowInstructions] = useState(false);
  const [connectingToMetaMask, setConnectingToMetaMask] = useState(false);
  const [selectMetaMask, setMetaMask] = useState(false);

  useEffect(() => {

    if (wallet.account) {
      handleClose();
    }

    if (wallet.error && connectingToMetaMask) {
      setConnectingToMetaMask(false);
      setShowInstructions(true);
    }
  }, [wallet]);

  const renderContent = () => {
    if (connectingToMetaMask) {
      return <Spinner className="ml-2" label="Connecting..." />
    }

    return <>
      <div className="connect-btn">
        <button
          type="button"
          onClick={() => {
            setConnectingToMetaMask(true);
            setMetaMask(true);
            wallet.connect();
          }}
          className="smart-shadow bg-transparent"
        >
          <div className="border-t border-b flex">
            <img src={metaMaskLogo} alt="metamask" className="m-auto pt-2 pb-2 pr-2" />
            <div className="m-auto">MetaMask</div>
          </div>
        </button>
      </div>
      {showInstructions && selectMetaMask && (
        <div className="m-auto text-center justify-center">
          <div className="py-4 text-lg font-bold">
            Connection to MetaMask failed
           </div>
          <div className="py-4 text-justify">
            If you're experiencing issues when connecting your wallet, try the following troubleshooting tips.
          </div>
          <ul className="list-disc list-inside text-left" >
            <li>Reload the page</li>
            <li>Be sure to approve the connection</li>
            <li>Make sure another wallet is not conflicting with the connection approval</li>
            <li>Connect your wallet using Walletconnect</li>
          </ul>
        </div>
      )}
      {!selectMetaMask && false && (
        <div className="connect-btn">
          <button type="button" onClick={() => wallet.connect('walletconnect')} className="smart-shadow bg-transparent">
            <div className="border-t border-b flex">
              <img src={walletConnectLogo} alt="walletConnect" className="m-auto border-b pb-2 pt-2 pr-2" style={{ width: '35px', height: '51px' }} />
              <div className="m-auto">Walletconnect</div>
            </div>
          </button>
        </div>
      )}
    </>
  };

  const handleClose = () => {
    if (props.handleClose)
      props.handleClose();
    setConnectingToMetaMask(false);
    setShowInstructions(false);
    setMetaMask(false);
  }

  return (
    <Modal show={props.show} onHide={handleClose} className="connect-modal">
      <Modal.Header closeButton>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderContent()}
      </Modal.Body>
    </Modal>
  );
}

export default ConnectModal;