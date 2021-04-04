import React, {useState} from 'react';
import bullish_icon from  "../../assets/images/bullish.png";
import bearish_icon from  "../../assets/images/bearish.png";
import winner from  "../../assets/images/winner.png";
import { Image, Container, Row } from 'react-bootstrap';
import StakeForm from './StakeForm';
import * as utils from '../../helpers/utils';
import { connect } from 'react-redux';
import { setStatus } from '../../redux/actions';

const PredDataDisplay = (props) => {

  const { data, predData, maxAsset, status } = props;
  const [busy, setBusy] = useState(-1);

  const totalUsers = Number(predData._totalUsers);
  const totalStaked = [...predData._totalStaked];
  const userStaked = [...predData._userStaked];
  for (let i = 0; i < totalStaked.length; i++) {
    totalStaked[i] = utils.num(totalStaked[i]);
    userStaked[i] = utils.num(userStaked[i]);
  }
  var totalStakedSum = 0;
  var userStakedSum = 0;
  for (let i = 0; i < totalStaked.length; i++) {
    totalStakedSum += Number(totalStaked[i]);
    userStakedSum += Number(userStaked[i]);
  }

  const startPrice = utils.fromEthPrice(data._startPrice);
  const endPrice = utils.fromEthPrice(data._endPrice);

  const options = [
    {title: "Bullish", icon: bullish_icon, description: ">=$" + startPrice},
    {title: "Bearish", icon: bearish_icon, description: "<$" + startPrice}
  ];
  const calculateReward = (option) => {
    if (totalStaked[option] == 0 || totalStakedSum == 0 || userStaked[option] == 0)
      return 0;
    
    return (totalStakedSum*userStaked[option]/totalStaked[option]).toFixed(4);
  }
  return (
    <Container className="no-padding">
      <Row className="mt-10">
        <span className="title">Prediction</span>
      </Row>
      <Row>
        <span className="label">Participants:</span><span className="value">{totalUsers}</span>
        <span className="label ml-20">Total Staked:</span><span className="value">{utils.cut(totalStakedSum)} DAI</span>
        <span className="label ml-20">You Staked:</span><span className="value">{utils.cut(userStakedSum)} DAI</span>
          <span className="subvalue">({totalStakedSum>0?(userStakedSum*100/totalStakedSum).toFixed(2):'0.00'}% of Total)</span>
      </Row>
      <Row className="mt-10">
        <span className="label">Start Price:</span><span className="value">{startPrice>0?('$'+startPrice):"Waiting to Start"}</span>
        <span className="label ml-20">End Price:</span><span className="value">{endPrice>0?('$'+endPrice):"Waiting Result"}</span>
      </Row>
      <Row className="mt-10">
        <table className="prediction-table">
          <thead>
            <tr>
              <th></th>
              <th>Total Staked</th>
              <th>You Staked</th>
            </tr>
          </thead>
          <tbody>
            {
              options.map((option, index) => {
                return (
                  <>
                  <tr className="spacer"></tr>
                  <tr>
                    <td style={{maxWidth: 170}}>
                      <div className="option-title"><Image className="option-icon" src={option.icon} width={20} height={20} />{option.title}</div>
                      <div className="option-desc">{option.description}</div>
                    </td>
                    <td>{utils.cut(totalStaked[index])} DAI</td>
                    <td>
                      {utils.cut(userStaked[index])} DAI
                      <span className="subvalue">({totalStaked[index]>0?(userStaked[index]*100/totalStaked[index]).toFixed(2):"0.00"}%)</span>
                    </td>
                    {status==2 &&
                      <td>
                        {
                          (userStakedSum != 0 && userStaked[index] == 0) || (busy>=0 && busy !== index)?
                            <span></span>
                          :
                            <StakeForm 
                              max={maxAsset} 
                              option={index} 
                              predData={predData} 
                              busy={busy} 
                              setBusy={setBusy}
                              updateStaked={props.updateStaked}
                              placePrediction={props.placePrediction}
                            />
                        }
                      </td>
                    }
                    {endPrice>0 &&
                      <td>
                        {
                          index==data._winningOption && 
                          <>
                            <Image src={winner} width={20} height={20} style={{marginRight: 10}} />
                            You rewarded {calculateReward(index)} DAI
                          </>
                        }
                      </td>
                    }
                  </tr>
                  <tr className="spacer"></tr>
                  </>
                );
              })
            }
          </tbody>
        </table>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  const { status } = state.Blockchain;

  return { status };
};

export default connect(mapStateToProps, { setStatus })(PredDataDisplay);