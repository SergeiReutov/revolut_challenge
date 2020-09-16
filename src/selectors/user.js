import * as R from 'ramda';

export const getStatePart = R.prop('user');

export const getAccounts = R.pipe(
  getStatePart,
  R.prop('accounts')
);

export const getAccountsList = R.pipe(
  getAccounts,
  R.values
);

export const getDefaultAccount = R.pipe(
  getAccountsList,
  R.find(R.prop('isDefault'))
);

export const getDefaultAccountCurrency = R.pipe(
  getDefaultAccount,
  R.prop('currency')
);

// well, there should be more complicated logic than just picking non-default currency
export const getSecondMostUsedCurrency = R.pipe(
  getAccountsList,
  R.find(R.propEq('isDefault', false)),
  R.prop('currency')
);

export const getAccountByCurrency = currency => R.pipe(
  getAccounts,
  R.prop(currency)
);

export const getAccountBalanceByCurrency = R.curry((currency, state) => R.pipe(
  getAccountByCurrency(currency),
  R.prop('amount')
)(state));
