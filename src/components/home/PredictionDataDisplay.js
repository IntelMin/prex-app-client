import React, {useState, useEffect} from 'react';
import bullish_icon from  "../../assets/images/bullish.png";
import neutral_icon from  "../../assets/images/neutral.png";
import bearish_icon from  "../../assets/images/bearish.png";
import { Image, Container, Row, Button } from 'react-bootstrap';
import StakeForm from './StakeForm';
import utils from '../../helpers/utils';

const PredictionDataDisplay = (props) => {

  const {data, maxAsset, marketData} = props;
  const totalUsers = Number(data[0]);
  const totalStaked = data[1];
  var totalStakedSum = 0;
  for (let i = 0; i < totalStaked.length; i++)
    totalStakedSum += Number(totalStaked[i]);
  const userStaked = data[2];
  var userStakedSum = 0;
  for (let i = 0; i < userStaked.length; i++)
    userStakedSum += Number(userStaked[i]);

  const options = [
    {title: "Bullish", icon: bullish_icon, description: ">$" + marketData.neutralMaxValue},
    {title: "Neutral", icon: neutral_icon, description: "$" + marketData.neutralMinValue + " to $" + marketData.neutralMaxValue},
    {title: "Bearish", icon: bearish_icon, description: "<$" + marketData.neutralMinValue}
  ];
  return (
    <Container className="no-padding no-max-width">
      <Row className="mt-10">
        <span className="title">Prediction</span>
      </Row>
      <Row>
        <span className="label">Participants:</span><span className="value">{totalUsers}</span>
        <span className="label ml-20">Total Staked:</span><span className="value">{utils.cut(totalStakedSum)} DAI</span>
        <span className="label ml-20">You Staked:</span><span className="value">{utils.cut(userStakedSum)} DAI</span>
          <span className="subvalue">({(userStakedSum*100/totalStakedSum).toFixed(2)}% of total)</span>
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
                    <td style={{maxWidth: 150}}>
                      <div className="option-title"><Image className="option-icon" src={option.icon} width={20} height={20} />{option.title}</div>
                      <div className="option-desc">{option.description}</div>
                    </td>
                    <td>{utils.cut(totalStaked[index])} DAI</td>
                    <td>
                      {utils.cut(userStaked[index])} DAI
                      <span className="subvalue">({(userStaked[index]*100/totalStaked[index]).toFixed(2)}%)</span>
                    </td>
                    <td>
                      <StakeForm max={maxAsset}/>
                    </td>
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

export default PredictionDataDisplay;