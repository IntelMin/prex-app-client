import React, {useState, useEffect} from 'react';
import bullish_icon from  "../../assets/images/bullish.png";
import neutral_icon from  "../../assets/images/neutral.png";
import bearish_icon from  "../../assets/images/bearish.png";
import { Image, Container, Row, Button } from 'react-bootstrap';
import StakeForm from './StakeForm';

const PredictionDataDisplay = (props) => {

  const {data, maxAsset} = props;
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
    {title: "Bullish", icon: bullish_icon},
    {title: "Neutral", icon: neutral_icon},
    {title: "Bearish", icon: bearish_icon}
  ];
  return (
    <Container className="no-padding">
      <Row className="mt-10">
        <span className="title">Prediction</span>
      </Row>
      <Row>
        <span className="label">Participants:</span><span className="value">{totalUsers}</span>
        <span className="label ml-20">Total Staked:</span><span className="value">{totalStakedSum}</span>
        <span className="label ml-20">You Staked:</span><span className="value">{userStakedSum}</span>
          <span className="subvalue">({(userStakedSum*100/totalStakedSum).toFixed(2)}% of total)</span>
      </Row>
      <Row className="mt-10">
        <table className="prediction-table">
          <thead>
            <th></th>
            <th>Total Staked</th>
            <th>You Staked</th>
          </thead>
          <tbody>
            {
              options.map((option, index) => {
                return (
                  <>
                  <tr class="spacer"></tr>
                  <tr>
                    <td><Image className="option-icon" src={option.icon} width={20} height={20} />{option.title}</td>
                    <td>{totalStaked[index]}</td>
                    <td>
                      {userStaked[index]}
                      <span className="subvalue">({(userStaked[index]*100/totalStaked[index]).toFixed(2)}% of option)</span>
                    </td>
                    <td>
                      <StakeForm max={maxAsset}/>
                    </td>
                  </tr>
                  <tr class="spacer"></tr>
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