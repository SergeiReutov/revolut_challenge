import * as R from 'ramda';
import { lessThanOrEqual, isNot } from 'utils/common';

const Formatter = new Intl.NumberFormat('en-US');

const currencyAmountRegEx = /^$|^(\d+)(\.\d{0,2})?$/;

const amountMaxLength = 8;

const takeDigits = R.replace(/\D/g, '');

const removeCommas = R.replace(/,/g, '');

const removeSign = R.replace(/(- )|(\+ )/g, '');

export const floorToDecimalDigits = R.curry(
  (digits, number) => Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits)
);

export const ceilToDecimalDigits = R.curry(
  (digits, number) => Math.ceil(number * Math.pow(10, digits)) / Math.pow(10, digits)
);

const hasValidNumberOfDigits = R.pipe(
  takeDigits,
  R.length,
  lessThanOrEqual(amountMaxLength)
);

const isNotZero = R.pipe(
  Number,
  isNot(R.equals(0))
);

export const isValidInputedAmount = R.allPass([
  R.test(currencyAmountRegEx),
  hasValidNumberOfDigits
]);

export const isValidCalculatedAmount = R.allPass([
  hasValidNumberOfDigits,
  isNotZero
]);

const formatIntegerPart = R.pipe(
  R.match(currencyAmountRegEx),
  R.prop(1),
  R.ifElse(
    R.isNil,
    R.always(''),
    Formatter.format
  )
);

const formatDecimalPart = R.pipe(
  R.match(currencyAmountRegEx),
  R.prop(2),
  R.defaultTo('')
);

export const formatCurrencyAmount = R.converge(
  R.concat,
  [formatIntegerPart, formatDecimalPart]
);

export const formatCalculatedAmount = R.pipe(
  R.ifElse(
    isValidCalculatedAmount,
    formatCurrencyAmount,
    R.always('')
  )
);

export const formatBaseToNumerishString = R.pipe(
  ceilToDecimalDigits(2),
  R.toString
);

export const formatQuoteToNumerishString = R.pipe(
  floorToDecimalDigits(2),
  R.toString
);

export const formatExchangeRate = R.pipe(
  floorToDecimalDigits(4),
  R.toString
);

export const extractAmount = R.pipe(
  removeCommas,
  removeSign
);

export const withSign = (sign, amount) => R.when(
  isNotZero,
  R.concat(`${sign} `)
)(amount);
