import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import { Button, InputGroup, FormControl, Image } from 'react-bootstrap';
import functions from '../../blockchain/functions';
import * as utils from '../../helpers/utils';
import spiner from '../../assets/images/spinner.gif';

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
    if (isNaN(amount) || isNaN(parseFloat(amount)) || Number(amount) <= 0 || Number(amount) > realMax) {
      alert("Input a valid number.");
      return;
    }
    const amountUint = utils.uint(Number(amount));
    const original_user = BigNumber(predictionData.userStaked[option]);
    const original_total = BigNumber(predictionData.totalStaked[option]);
    props.setBusy(option);
    functions.placePrediction(amountUint, option)
      .then(res => {
        props.setBusy(-1);
        let realAmount = amountUint.multipliedBy(BigNumber(0.999));
        let newValue_user = original_user.plus(realAmount);
        let newValue_total = original_total.plus(realAmount);
        props.updateStaked(option, newValue_user.toString(), newValue_total.toString());
      })
      .catch(err => {
        props.setBusy(-1);
        alert('Error occured while staking. Maybe, prediction time is expired or you have not enough asset.');
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
      props.busy>=0?
      <div>
        <Image src={spiner} width={25} height={25} style={{marginRight: 10}}/>
        Staking...
      </div>
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