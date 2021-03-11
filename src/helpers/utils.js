
import { BigNumber } from 'bignumber.js'

const multiplier = Math.pow(10, 4);

export const cut = (val) => {
  return Math.floor(Number(val)*multiplier)/multiplier;
}

export const num = (val) => {
  let value = BigNumber(val);
  let oneEther = new BigNumber(1);
  let num_value = value.dividedBy(oneEther.shiftedBy(18));
  return Number(num_value);
}

export const uint = (val) => {
  let value = BigNumber(val);
  let oneEther = new BigNumber(1);
  let uint_value = value.multipliedBy(oneEther.shiftedBy(18));
  return uint_value;
}

export const toEthPrice = (val) => {
  return BigNumber(val).shiftedBy(8);
}

export const fromEthPrice = (val) => {
  return BigNumber(val).shiftedBy(-8).toNumber().toFixed(0);
}
