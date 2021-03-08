import React, { useEffect, useState } from "react";
import { useWallet } from 'use-wallet';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { setNavPage, setWallet } from "../redux/actions";
import { Image, Button } from 'react-bootstrap';
import icon from '../assets/images/favicon.ico';
import ConnectModal from '../components/modals/ConnectModal';

function Header(props) {

  const wallet = useWallet();
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const onBtnClick = () => {
    if (props.wallet)
      wallet.reset();
    else 
      handleShow();
  }
  useEffect(() => {
    if (wallet.status === "connected") {
      props.setWallet(wallet);   
    }
    else if (wallet.status === "disconnected") {
      props.setWallet(null);
    }
  }, [wallet.status]);

  return (
    <div className="header">
      <div className="header-left">
        <Image src={icon} width={40} height={40}/>
        PREX
      </div>
      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="active" to="/markets">
          Markets
        </NavLink>
        <NavLink exact activeClassName="active" to="/blogs">
          Blogs
        </NavLink>
        <NavLink exact activeClassName="active" to="/help">
          Help
        </NavLink>
      </nav>
      <div className="header-right">
        <Button className="wallet-button" variant="info" onClick={onBtnClick}>
          {props.wallet?"Disconnect Wallet":"Connect Wallet"}
        </Button>
      </div>
      <ConnectModal show={modalShow} handleClose={handleClose}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { nav_page } = state.Layout;
  const { wallet } = state.Blockchain;

  return { nav_page, wallet };
};

export default connect(mapStateToProps, { setNavPage, setWallet })(Header);