import React, {useEffect} from 'react';
import Countdown from "react-countdown";
import check_icon from  "../../assets/images/check.png";
import { Image, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setStatus } from '../../redux/actions';

var interval = null;

const MarketDataDisplay = (props) => {

  const {data, status} = props;
  const {marketData, timeOffset} = data;
  const startTime = Number(marketData.startTime)*1000 + timeOffset;
  const predictionTime = Number(marketData.predictionTime)*1000 + timeOffset;
  const endTime = Number(marketData.endTime)*1000 + timeOffset;
  useEffect(() => {
    if (props.wallet) {
      if (interval)
        window.clearInterval(interval);
      interval = setInterval(() => {
        var sta = 0;
        const utcNow = Date.now();
        if (utcNow < startTime)
          sta = 1;
        else if (utcNow < predictionTime)
          sta = 2;
        else if (utcNow < endTime)
          sta = 3;
        else
          sta = 4;
        props.setStatus(sta);
      }, 1000);
    }
  }, [startTime, props.wallet])
  
  const getDateStr = (timestamp) => {
    const date = new Date(timestamp);
    return date.toUTCString(); 
  }
  const renderCheckIcon = () => {
    return (
      <Image src={check_icon} width={20} height={20}/>
    )
  }
  var statusText = "";
  switch(status) {
    case 1: statusText = "In-Creation"; break;
    case 2: statusText = "Live"; break;
    case 3: statusText = "Waiting-Result"; break;
    case 4: statusText = "Ended"; break;
    default: break;
  }
  return (
    <Container className="no-padding">
      <Row className="mt-10">
        <span className="title">Status</span>
        <div className="statusText">{statusText}</div>
      </Row>
      <Row className="mt-10">
        <span className="title">Detail</span>
      </Row>
      <Row>
      <table className="market-info-table">
        <tbody>
          <tr className={status===1?"active":""}>
            <td>Start at:</td>
            <td>{getDateStr(startTime)}</td>
            <td>{status===1?<Countdown date={startTime}/>:(status>1?renderCheckIcon():null)}</td>
          </tr>
          <tr className={status===2?"active":""}>
            <td>Predict until:</td>
            <td>{getDateStr(predictionTime)}</td>
            <td>{status===2?<Countdown date={predictionTime}/>:(status>2?renderCheckIcon():null)}</td>
          </tr>
          <tr className={status===3?"active":""}>
            <td>End at:</td>
            <td>{getDateStr(endTime)}</td>
            <td>{status===3?<Countdown date={endTime}/>:(status>3?renderCheckIcon():null)}</td>
          </tr>
        </tbody>
      </table>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  const { status, wallet } = state.Blockchain;

  return { status, wallet };
};

export default connect(mapStateToProps, { setStatus })(MarketDataDisplay);