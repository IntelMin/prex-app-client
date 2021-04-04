import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import * as utils from '../helpers/utils';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { setPairs } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import Loader from "../components/common/Loader";
import Market from '../blockchain/contracts/Market';
import MarketRegistry from '../blockchain/contracts/MarketRegistry';

const columns = [{
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'start_time',
  text: 'Start time'
}, {
  dataField: 'end_time',
  text: 'End time'
}, {
  dataField: 'start_price',
  text: 'Start price'
}, {
  dataField: 'end_price',
  text: 'End price'
}, {
  dataField: 'participants',
  text: 'Participants'
}, {
  dataField: 'total_staked',
  text: 'Total staked'
}, {
  dataField: 'view_button',
  text: 'Total staked',
  formatter: viewFormatter
}];

function viewFormatter(cell, row, rowIndex, formatExtraData) {
  return ( 
    <div style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}>
      <Button style={{ fontSize: 20 }} onClick={row.onView}>View</Button>
    </div> 
  );
}

const Markets = (props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchMarketList();
  }, [])

  async function fetchMarketList() {
    setLoading(true);
    try {
      let registry = new MarketRegistry();
      let _markets = await registry.call("getMarketList");
      console.log("Markets", _markets);

      let markets = [];
      for (let i = 0; i < _markets.length; i++) {
        let marketContract = new Market(_markets[i]);
        let marketData = await marketContract.call("getMarketData");
        const market = utils.produceMarketListingData(marketData, () => {
          history.push(`/market/${_markets[i]}`);
        });
        markets.push(market);
      }
      setData(markets);
    }
    catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <Container fluid className="main-container">
      <Row>
        <div className="table-wrapper">
          <BootstrapTable
            classes="markets"
            keyField='name' 
            columns={columns} 
            data={data}
            pagination={ paginationFactory() }
          />
        </div>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { wallet } = state.Blockchain;
  const { pairs, markets } = state.Market;

  return { wallet, pairs, markets };
};

export default connect(mapStateToProps, { setPairs })(Markets);