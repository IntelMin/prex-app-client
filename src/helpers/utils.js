
import { BigNumber } from 'bignumber.js'

const multiplier = Math.pow(10, 4);
const cut = (val) => {
  return Math.floor(Number(val)*multiplier)/multiplier;
}
const uint = (val) => {
  let value = BigNumber(val);
  let oneEther = new BigNumber(1);
  let uint_value = value.multipliedBy(oneEther.shiftedBy(18));
  return uint_value;
}

const utils = {
  cut,
  uint
}

export default utils;