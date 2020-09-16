import * as R from 'ramda';
import { EXCHANGE } from 'actions/ActionTypes';
import { CURRENCIES } from 'utils/constants/exchange';
import { floorToDecimalDigits } from 'utils/format';

export const initialState = {
  accounts: {
    [CURRENCIES.EUR.value]: {
      currency: CURRENCIES.EUR.value,
      amount: 1024,
      isDefault: false
    },
    [CURRENCIES.USD.value]: {
      currency: CURRENCIES.USD.value,
      amount: 2631.21,
      isDefault: true
    },
    [CURRENCIES.GBP.value]: {
      currency: CURRENCIES.GBP.value,
      amount: 15.2,
      isDefault: false
    },
    [CURRENCIES.PLN.value]: {
      currency: CURRENCIES.PLN.value,
      amount: 24020.94,
      isDefault: false
    }
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case EXCHANGE.TRADE.SUCCESS:
      return R.pipe(
        R.over(
          R.lensPath(['accounts', action.baseCurrency.value, 'amount']),
          R.pipe(
            R.subtract(R.__, action.baseCurrencyAmount),
            floorToDecimalDigits(2)
          )
        ),
        R.over(
          R.lensPath(['accounts', action.quoteCurrency.value, 'amount']),
          R.pipe(
            R.add(R.__, action.quoteCurrencyAmount),
            floorToDecimalDigits(2)
          )
        )
      )(state);
    default:
      return state;
  }
}
