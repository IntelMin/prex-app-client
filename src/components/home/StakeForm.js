import React, {useState, useEffect} from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const MarketDataDisplay = (props) => {

  const {max} = props;
  const [opened, setOpened] = useState(false);
  const [amount, setAmount] = useState("0");

  const onHereClick = () => {
    setOpened(true);
  }

  const onMaxClick = () => {
    setAmount(max.toFixed(4));
  }

  const onStakeClick = () => {
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
          <Button className="max-button" onClick={onMaxClick}>Max: {max.toFixed(4)} DAI</Button>
        </InputGroup.Append>
        <Button className="stake-button" onClick={onStakeClick}>Stake</Button>
        <Button className="cancel-button" onClick={onCancelClick}>Cancel</Button>
      </InputGroup>
    :
      <Button title="Stake here" className="here-button" onClick={onHereClick}>Stake here</Button>
  )
}

export default MarketDataDisplay;