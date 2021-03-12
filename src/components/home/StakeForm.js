import BigNumber from 'bignumber.js';
import React, {useState, useEffect} from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import functions from '../../blockchain/functions';
import * as utils from '../../helpers/utils';

const StakeForm = (props) => {

  const {max, option, predictionData} = props;
  const [opened, setOpened] = useState(false);
  const [amount, setAmount] = useState("0");

  const realMax = utils.cut(max);

  const onHereClick = () => {
    setOpened(true);
  }

  const onMaxClick = () => {
    setAmount(realMax);
  }

  const onStakeClick = () => {
    if (isNaN(amount) || isNaN(parseFloat(amount))) {
      alert("Input a valid number.");
      return;
    }
    const amountUint = utils.uint(Number(amount));
    const original = BigNumber(predictionData.userStaked[option]);
    props.setBusy(true);
    functions.placePrediction(amountUint, option)
      .then(res => {
        props.setBusy(false);
        let realAmount = amountUint.multipliedBy(BigNumber(0.999));
        let newValue = original.plus(realAmount);
        props.updateStaked(option, newValue.toString());
      })
      .catch(err => {
        props.setBusy(false);
        alert('Error occured while staking. Maybe prediction time is expired or you have not enough asset.');
        console.log("error", err);
      })
  }

  const onCancelClick = () => {
    setOpened(false);
  }

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  }

  return (
    opened?
      props.busy?
      <span>Staking...</span>
      :
      <InputGroup>
        <FormControl
          placeholder="Stake Amount"
          className="stake-input"
          value={amount}
          onChange={onAmountChange}
        />
        <InputGroup.Append>
          <Button className="max-button" onClick={onMaxClick}>Max: {realMax} DAI</Button>
        </InputGroup.Append>
        <Button className="stake-button" onClick={onStakeClick}>Stake</Button>
        <Button className="cancel-button" onClick={onCancelClick}>Cancel</Button>
      </InputGroup>
    :
      <Button title="Stake here" className="here-button" onClick={onHereClick}>Stake here</Button>
  )
}

export default StakeForm;