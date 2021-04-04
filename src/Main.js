import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import MarketRegistry from './blockchain/contracts/MarketRegistry';
import NotFound from "./layout/NotFound";
import Markets from "./pages/Markets";
import MarketDetail from "./pages/MarketDetail";
import { setPairs, setMarkets } from './redux/actions';
import * as utils from './helpers/utils';
import Loader from './components/common/Loader';

const Main = (props) => {
  
  const {wallet} = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (wallet) {
      fetchAll();
    }
  }, [wallet])

  async function fetchAll() {
    setLoading(true);
    try {
      let registry = new MarketRegistry();
      let regData = await registry.call("getRegistryData");
      let timeOffset = Math.floor(Date.now()/1000) - Number(regData._time);
      utils.setTimeOffset(timeOffset);
      console.log(`Time offset is ${timeOffset}s`);

      let nPairs = Number(regData._nPairs);
      let pairs = [];
      for (let i = 0; i < nPairs; i++) {
        let pairData = await registry.call("marketPairs", i);
        pairData.decimal = Number(pairData.decimal);
        pairs.push(pairData);
      }
      utils.setMarketPairs(pairs);
      props.setPairs(pairs);
    }
    catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  if (!wallet) {
    return (
      <React.Fragment>
        <p style={{marginTop: 20}}>Please connect your wallet first.</p>
      </React.Fragment>
    )
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Markets} />
        <Route exact path="/market/:addr" component={MarketDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;
  const { pairs } = state.Market;

  return { wallet, pairs };
};

export default connect(mapStateToProps, { setPairs, setMarkets })(Main);