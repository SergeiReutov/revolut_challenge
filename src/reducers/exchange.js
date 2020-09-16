import * as R from 'ramda';
import { EXCHANGE } from 'actions/ActionTypes';

export const initialState = {
  baseCurrency: {},
  quoteCurrency: {},
  rates: {},
  isLoading: true,
  isUpdating: false,
  error: null
};

export default function exchange(state = initialState, action) {
  switch (action.type) {
    case EXCHANGE.CURRENCIES.BASE.SET_NEW_CURRENCY:
      return R.over(
        R.lensPath(['baseCurrency']),
        R.mergeWithKey(
          (key, left, right) => key === 'amount' ? right : left,
          action.baseCurrency
        )
      )(state);
    case EXCHANGE.CURRENCIES.BASE.SET_AMOUNT:
      return R.assocPath(['baseCurrency', 'amount'], action.amount, state);
    case EXCHANGE.CURRENCIES.BASE.SET_FOCUSED:
      return R.pipe(
        R.assocPath(['baseCurrency', 'isFocused'], true),
        R.assocPath(['quoteCurrency', 'isFocused'], false)
      )(state);
    case EXCHANGE.CURRENCIES.QUOTE.SET_NEW_CURRENCY:
      return R.over(
        R.lensPath(['quoteCurrency']),
        R.mergeWithKey(
          (key, left, right) => key === 'amount' ? right : left,
          action.quoteCurrency
        )
      )(state);
    case EXCHANGE.CURRENCIES.QUOTE.SET_AMOUNT:
      return R.assocPath(['quoteCurrency', 'amount'], action.amount, state);
    case EXCHANGE.CURRENCIES.QUOTE.SET_FOCUSED:
      return R.pipe(
        R.assocPath(['baseCurrency', 'isFocused'], false),
        R.assocPath(['quoteCurrency', 'isFocused'], true)
      )(state);
    case EXCHANGE.CURRENCIES.SWITCH:
      return R.pipe(
        R.assocPath(['baseCurrency'], state.quoteCurrency),
        R.assocPath(['quoteCurrency'], state.baseCurrency)
      )(state);
    case EXCHANGE.RATES.FETCH.START:
      return {
        ...state,
        isLoading: true
      };
    case EXCHANGE.RATES.FETCH.SUCCESS:
      return {
        ...state,
        rates: action.rates,
        isLoading: false
      };
    case EXCHANGE.RATES.FETCH.ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case EXCHANGE.TRADE.REQUEST:
      return {
        ...state,
        isUpdating: true
      };
    case EXCHANGE.TRADE.SUCCESS:
      return R.pipe(
        R.assocPath(['baseCurrency', 'amount'], ''),
        R.assocPath(['quoteCurrency', 'amount'], ''),
        R.assocPath(['isUpdating'], false)
      )(state);
    case EXCHANGE.TRADE.ERROR:
      return {
        ...state,
        error: action.error,
        isUpdating: false
      };
    case EXCHANGE.ERROR.CLEAR:
      return {
        ...state,
        error: initialState.error
      };
    case EXCHANGE.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
