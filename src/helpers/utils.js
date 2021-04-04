
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

export var timeOffset = 0;
export const setTimeOffset = (offset) => {
  //timeOffset = offset;
}

export const toDateStr = (timestamp) => {
  const miliTimestamp = Number(timestamp)*1000;
  const date = new Date(miliTimestamp);
  return date.toUTCString(); 
}

export const toDateStrMili = (timestamp) => {
  const date = new Date(Number(timestamp));
  return date.toUTCString(); 
}

export const toFixedTimestampMili = (timestamp) => {
  const fixed = (Number(timestamp) + timeOffset) * 1000
  return fixed;
}

export var pairs = [];
export const setMarketPairs = (prs) => {
  pairs = prs;
}

export const makeNum = (val, digit = 18, precision = 0) => {
  return BigNumber(val).shiftedBy(-Number(digit)).toNumber().toFixed(precision);
}

export const produceMarketName = (market) => {
  const pairIndex = Number(market._marketPair);
  if (pairIndex >= pairs.length) {
    console.log(`Invalid market pair: ${pairIndex} of ${pairs.length}`);
    return "Invalid market";
  }
  return pairs[pairIndex].name + " #Round " + market._roundId;
}

export const produceMarketListingData = (market, onView) => {
  const pairIndex = Number(market._marketPair);
  if (pairIndex >= pairs.length) {
    console.log(`Invalid market pair: ${pairIndex} of ${pairs.length}`);
    return {name: "Invalid market"};
  }
  const pair = pairs[pairIndex];
  const data = {};
  data.name = produceMarketName(market);
  data.start_time = toDateStr(market._startTime);
  data.end_time = toDateStr(market._endTime);
  data.start_price = '$' + makeNum(market._startPrice, pair.decimal);
  data.end_price = '$' + makeNum(market._endPrice, pair.decimal);
  data.participants = Number(market._totalUsers);
  data.total_staked = makeNum(market._totalStaked, 18, 4);
  data.onView = onView;
  return data;
}