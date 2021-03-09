import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import functions from "../blockchain/functions";
import MarketDataDisplay from "../components/home/MarketDataDisplay";
import PredictionDataDisplay from "../components/home/PredictionDataDisplay";
import utils from '../helpers/utils';

const Home = (props) => {
  
  const {wallet} = props;
  const [accountInfo, setAccountInfo] = useState({eth_balance: 0, dai_balance: 0});
  const [marketData, setMarketData] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    if (wallet) {
      functions.getAccountInfo()
        .then(info => {
          setAccountInfo(info);
        });
      functions.getCurrentMarketData()
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

  const account = functions.getAccount(); 

  return (
    <Container fluid className="main-container">
      <Row>
        <div className="wallet-desc">
          <span className="wallet-address">{account}</span>
          <span className="wallet-asset">{utils.cut(accountInfo.eth_balance)} ETH</span>
          <span className="wallet-asset">{utils.cut(accountInfo.dai_balance)} DAI</span>
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
            <PredictionDataDisplay data={predictionData} maxAsset={Number(accountInfo.dai_balance)} marketData={marketData} />
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