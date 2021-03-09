import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import utils from "../blockchain/utils";
import MarketDataDisplay from "../components/home/MarketDataDisplay";
import PredictionDataDisplay from "../components/home/PredictionDataDisplay";

const Home = (props) => {
  
  const {wallet} = props;
  const [accountInfo, setAccountInfo] = useState({eth_balance: 0, dai_balance: 0});
  const [marketData, setMarketData] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    if (wallet) {
      utils.getAccountInfo()
        .then(info => {
          setAccountInfo(info);
        });
      utils.getCurrentMarketData()
        .then(res => {
          console.log(res);
          setMarketData(res.marketData);
          setPredictionData(res.predictionData);
        })
        .catch(console.log);
    }    
  }, [wallet])

  if (!wallet) {
    return (
      <React.Fragment>
        <p style={{marginTop: 20}}>Please connect your wallet first.</p>
      </React.Fragment>
    )
  }

  const account = utils.getAccount();
  

  return (
    <Container fluid className="main-container">
      <Row>
        <div className="wallet-desc">
          <span className="wallet-address">{account}</span>
          <span className="wallet-asset">{Number(accountInfo.eth_balance).toFixed(4)} ETH</span>
          <span className="wallet-asset">{Number(accountInfo.dai_balance).toFixed(4)} DAI</span>
        </div>
      </Row>
      {
        marketData && 
          <Row>
            <MarketDataDisplay data={marketData}/>
          </Row>
      }
      {
        predictionData && 
          <Row>
            <PredictionDataDisplay data={predictionData} maxAsset={Number(accountInfo.dai_balance)} />
          </Row>
      }
      
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;

  return { wallet };
};

export default connect(mapStateToProps, { })(Home);