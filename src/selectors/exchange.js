import * as R from 'ramda';
import {
  getDefaultAccountCurrency,
  getSecondMostUsedCurrency,
  getAccountBalanceByCurrency
} from 'selectors/user';
import { CURRENCIES } from 'utils/constants/exchange';

export const getStatePart = R.prop('exchange');

export const getIsLoading = R.pipe(
  getStatePart,
  R.prop('isLoading')
);

export const getIsUpdating = R.pipe(
  getStatePart,
  R.prop('isUpdating')
);

export const getError = R.pipe(
  getStatePart,
  R.prop('error')
);

export const getBaseCurrency = R.pipe(
  getStatePart,
  R.prop('baseCurrency')
);

export const getBaseCurrencyValue = R.pipe(
  getBaseCurrency,
  R.prop('value')
);

export const getQuoteCurrency = R.pipe(
  getStatePart,
  R.prop('quoteCurrency')
);

export const getQuoteCurrencyValue = R.pipe(
  getQuoteCurrency,
  R.prop('value')
);

export const getRates = R.pipe(
  getStatePart,
  R.prop('rates')
);

export const getCurrentRate = R.converge(
  R.prop,
  [getQuoteCurrencyValue, getRates]
);

export const getInitialBaseCurrency = R.pipe(
  getDefaultAccountCurrency,
  R.prop(R.__, CURRENCIES),
  R.assoc('amount', ''),
  R.assoc('isFocused', true)
);

export const getInitialQuoteCurrency = R.pipe(
  getSecondMostUsedCurrency,
  R.prop(R.__, CURRENCIES),
  R.assoc('amount', ''),
  R.assoc('isFocused', false)
);

export const getBaseCurrencyBalance = R.pipe(
  R.converge(
    getAccountBalanceByCurrency,
    [getBaseCurrencyValue, R.identity]
  ),
  R.toString
);

export const getQuoteCurrencyBalance = R.pipe(
  R.converge(
    getAccountBalanceByCurrency,
    [getQuoteCurrencyValue, R.identity]
  ),
  R.toString
);
