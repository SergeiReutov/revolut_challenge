import * as R from 'ramda';

export const voidFn = () => {};

export const debugTrace = x => {
  console.log(x);
  return x;
};

export const isNot = fn => R.pipe(fn, R.not);

export const isNotEmpty = isNot(R.isEmpty);

export const lessThan = R.flip(R.lt);

export const lessThanOrEqual = R.flip(R.lte);

export const greaterThan = R.flip(R.gt);

export const greaterThanOrEqual = R.flip(R.gte);
