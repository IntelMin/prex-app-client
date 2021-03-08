import React, { useState } from "react";
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import utils from "../blockchain/utils";

const Home = (props) => {
  
  const {wallet} = props;
  const [eth_balance, setEthBalance] = useState(0);
  const [dai_balance, setDaiBalance] = useState(0);

  if (!wallet) {
    return (
      <React.Fragment>
        <p style={{marginTop: 20}}>Please connect your wallet first.</p>
      </React.Fragment>
    )
  }


  const account = utils.getAccount();
  utils.getEthBalance()
    .then(balance => {
      setEthBalance(Number(balance).toFixed(4));
    });
  utils.getDaiBalance()
    .then(balance => {
      setDaiBalance(Number(balance).toFixed(4));
    });
  
  return (
    <Container fluid className="main-container">
      <Row>
        <div className="wallet-desc">
          <span className="wallet-address">{account}</span>
          <span className="wallet-asset">{eth_balance} ETH</span>
          <span className="wallet-asset">{dai_balance} DAI</span>
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;

  return { wallet };
};

export default connect(mapStateToProps, { })(Home);