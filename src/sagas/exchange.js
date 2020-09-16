import * as R from 'ramda';
import { EXCHANGE } from 'actions/ActionTypes';
import { take, takeEvery, call, put, fork, cancel, delay, select } from 'redux-saga/effects';
import { GET_EXTERNAL } from 'utils/api';
import {
  fetchRatesStart,
  fetchRatesStop,
  fetchRatesSuccess,
  fetchRatesError,
  tradeCurrenciesSuccess,
  tradeCurrenciesError
} from 'actions/exchange';
import { getQuoteCurrencyValue } from 'selectors/exchange';

export function* fetchExchangeRateSaga(baseCurrency) {
  try {
    yield put(fetchRatesStart());
    while (true) {
      const response = yield call(
        GET_EXTERNAL,
        `https://api.exchangeratesapi.io/latest?base=${baseCurrency.value}`
      );
      // adding random small amount to the current rate to imitate live updates
      const quoteCurrencyValue = yield select(getQuoteCurrencyValue);
      const responseWithUpdatedRates = R.over(
        R.lensPath(['rates', quoteCurrencyValue]),
        R.add(Math.random() / 1000),
        response
      );
      yield put(fetchRatesSuccess(responseWithUpdatedRates.rates));
      
      yield delay(10 * 1000);
    }
  } catch (e) {
    yield put(fetchRatesError(e.message));
  }
}

export function* handleRatesFetch({ baseCurrency }) {
  yield put(fetchRatesStop());
  const fetchExchangeRate = yield fork(fetchExchangeRateSaga, baseCurrency);
  yield take(EXCHANGE.RATES.FETCH.STOP);
  yield cancel(fetchExchangeRate);
}

export function* handleTradeCurrencies({ baseCurrency, baseCurrencyAmount, quoteCurrency, quoteCurrencyAmount }) {
  try {
    // fake API call
    yield delay(1000);
    yield put(tradeCurrenciesSuccess({ baseCurrency, baseCurrencyAmount, quoteCurrency, quoteCurrencyAmount }));
  } catch (e) {
    yield put(tradeCurrenciesError(e.message));
  }
}

export const exchangeSagas = [
  takeEvery(
    [EXCHANGE.CURRENCIES.BASE.SET_NEW_CURRENCY, EXCHANGE.CURRENCIES.SWITCH],
    handleRatesFetch
  ),
  takeEvery(EXCHANGE.TRADE.REQUEST, handleTradeCurrencies)
];
