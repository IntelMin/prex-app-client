import React, {useState, useEffect} from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import functions from '../../blockchain/functions';
import * as utils from '../../helpers/utils';

const MarketDataDisplay = (props) => {

  const {max, option} = props;
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
    functions.placePrediction(amountUint, option)
      .then(res => {
        console.log("done", res);
      })
      .catch(err => {
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

export default MarketDataDisplay;