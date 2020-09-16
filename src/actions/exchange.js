import { EXCHANGE } from './ActionTypes';

export const setBaseCurrency = baseCurrency => ({
  type: EXCHANGE.CURRENCIES.BASE.SET_NEW_CURRENCY,
  baseCurrency
});

export const setBaseCurrencyAmount = amount => ({
  type: EXCHANGE.CURRENCIES.BASE.SET_AMOUNT,
  amount
});

export const setBaseCurrencyFocused = () => ({
  type: EXCHANGE.CURRENCIES.BASE.SET_FOCUSED
});

export const setQuoteCurrency = quoteCurrency => ({
  type: EXCHANGE.CURRENCIES.QUOTE.SET_NEW_CURRENCY,
  quoteCurrency
});

export const setQuoteCurrencyAmount = amount => ({
  type: EXCHANGE.CURRENCIES.QUOTE.SET_AMOUNT,
  amount
});

export const setQuoteCurrencyFocused = () => ({
  type: EXCHANGE.CURRENCIES.QUOTE.SET_FOCUSED
});

export const switchCurrencies = baseCurrency => ({
  type: EXCHANGE.CURRENCIES.SWITCH,
  baseCurrency
});

export const fetchRatesStart = baseCurrency => ({
  type: EXCHANGE.RATES.FETCH.START,
  baseCurrency
});

export const fetchRatesStop = () => ({
  type: EXCHANGE.RATES.FETCH.STOP
});

export const fetchRatesSuccess = rates => ({
  type: EXCHANGE.RATES.FETCH.SUCCESS,
  rates
});

export const fetchRatesError = error => ({
  type: EXCHANGE.RATES.FETCH.ERROR,
  error
});

export const tradeCurrencies = ({ baseCurrency, baseCurrencyAmount, quoteCurrency, quoteCurrencyAmount }) => ({
  type: EXCHANGE.TRADE.REQUEST,
  baseCurrency,
  baseCurrencyAmount,
  quoteCurrency,
  quoteCurrencyAmount
});

export const tradeCurrenciesSuccess = ({ baseCurrency, baseCurrencyAmount, quoteCurrency, quoteCurrencyAmount }) => ({
  type: EXCHANGE.TRADE.SUCCESS,
  baseCurrency,
  baseCurrencyAmount,
  quoteCurrency,
  quoteCurrencyAmount
});

export const tradeCurrenciesError = error => ({
  type: EXCHANGE.TRADE.ERROR,
  error
});

export const clearError = () => ({
  type: EXCHANGE.ERROR.CLEAR
});

export const clearState = () => ({
  type: EXCHANGE.CLEAR_STATE
});
