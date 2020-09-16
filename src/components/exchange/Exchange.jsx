import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBaseCurrency,
  setBaseCurrencyAmount,
  setBaseCurrencyFocused,
  setQuoteCurrency,
  setQuoteCurrencyAmount,
  setQuoteCurrencyFocused,
  switchCurrencies,
  tradeCurrencies,
  clearError,
  clearState
} from 'actions/exchange';
import { ErrorMessage, Loader } from 'components/common';
import { ExchangeHeader } from 'components/exchange/exchangeHeader';
import { ExchangeRate } from 'components/exchange/exchangeRate';
import { ExchangeButton } from 'components/exchange/exchangeButton';
import { ExchangeCurrencyRow } from 'components/exchange/exchangeCurrencyRow';
import {
  getInitialBaseCurrency,
  getInitialQuoteCurrency,
  getBaseCurrency,
  getQuoteCurrency,
  getBaseCurrencyBalance,
  getQuoteCurrencyBalance,
  getCurrentRate,
  getIsLoading,
  getIsUpdating,
  getError
} from 'selectors/exchange';
import { isNotEmpty } from 'utils/common';
import { formatBaseToNumerishString, formatQuoteToNumerishString } from 'utils/format';
import { CURRENCY_AMOUNT_INPUT_TYPES } from 'utils/constants/exchange';
import './styles.scss';

export default function Exchange() {
  const dispatch = useDispatch();
  const initialBaseCurrency = useSelector(getInitialBaseCurrency);
  const initialQuoteCurrency = useSelector(getInitialQuoteCurrency);

  const baseCurrency = useSelector(getBaseCurrency) ?? initialBaseCurrency;
  const quoteCurrency = useSelector(getQuoteCurrency) ?? initialQuoteCurrency;
  const baseCurrencyBalance = useSelector(getBaseCurrencyBalance) ?? '';
  const quoteCurrencyBalance = useSelector(getQuoteCurrencyBalance) ?? '';
  const currentRate = useSelector(getCurrentRate);
  const isLoading = useSelector(getIsLoading);
  const isUpdating = useSelector(getIsUpdating);
  const error = useSelector(getError);

  const isBalanceBreached = Number(baseCurrency.amount) > Number(baseCurrencyBalance);

  const isExchangeAvailable = Number(baseCurrency.amount) > 0
    && Number(quoteCurrency.amount) > 0
    && !isBalanceBreached;

  useEffect(() => {
    dispatch(setBaseCurrency(initialBaseCurrency));
    dispatch(setQuoteCurrency(initialQuoteCurrency));
  }, []);

  useEffect(() => {
    return () => dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (baseCurrency.isFocused) {
      dispatch(setQuoteCurrencyAmount(formatQuoteToNumerishString(baseCurrency.amount * currentRate)));
    } else {
      dispatch(setBaseCurrencyAmount(formatBaseToNumerishString(quoteCurrency.amount / currentRate)));
    }
  }, [currentRate]);

  const handleErrorClear = () => dispatch(clearError());

  const handleSwitchCurrencies = () => dispatch(switchCurrencies(quoteCurrency));

  const handleBaseCurrencyChange = currency => {
    if (currency.value === quoteCurrency.value) {
      return handleSwitchCurrencies();
    }
    dispatch(setBaseCurrency(currency));
    dispatch(setBaseCurrencyFocused());
  };

  const handleQuoteCurrencyChange = currency => {
    if (currency.value === baseCurrency.value) {
      return handleSwitchCurrencies();
    }
    dispatch(setQuoteCurrency(currency));
    dispatch(setQuoteCurrencyFocused());
  };

  const handleBaseBalanceClick = () => handleBaseCurrencyAmountChange(baseCurrencyBalance);

  const handleQuoteBalanceClick = () => handleQuoteCurrencyAmountChange(quoteCurrencyBalance);

  const handleBaseCurrencyAmountChange = amount => {
    dispatch(setBaseCurrencyAmount(amount));
    dispatch(setQuoteCurrencyAmount(formatQuoteToNumerishString(amount * currentRate)));
    dispatch(setBaseCurrencyFocused());
  };

  const handleQuoteCurrencyAmountChange = amount => {
    dispatch(setQuoteCurrencyAmount(amount));
    dispatch(setBaseCurrencyAmount(formatBaseToNumerishString(amount / currentRate)));
    dispatch(setQuoteCurrencyFocused());
  };

  const handleExchangeButtonClick = () => {
    dispatch(tradeCurrencies({
      baseCurrency,
      baseCurrencyAmount: Number(baseCurrency.amount),
      quoteCurrency,
      quoteCurrencyAmount: Number(quoteCurrency.amount)
    }));
  };

  // -------------------------------

  // const renderCurrencyExchangeWidget = () => (
  //   <CurrencyExchangeWidget
  //     isLoading={isLoading}
  //     baseCurrency={baseCurrency}
  //     baseCurrencyBalance={baseCurrencyBalance}
  //     quoteCurrency={quoteCurrency}
  //     quoteCurrencyBalance={quoteCurrencyBalance}
  //     currentRate={currentRate}
  //     onBaseCurrencyChange={handleBaseCurrencyChange}
  //     onBaseCurrencyAmountChange={handleBaseCurrencyAmountChange}
  //     onBaseCurrencyIsFocusedChange={handleBaseCurrencyIsFocusedChange}
  //     onQuoteCurrencyChange={handleQuoteCurrencyChange}
  //     onQuoteCurrencyAmountChange={handleQuoteCurrencyAmountChange}
  //     onQuoteCurrencyIsFocusedChange={handleQuoteCurrencyIsFocusedChange}
  //     onSwitchCurrencies={handleSwitchCurrencies}
  //     onTradeCurrencies={handleTradeCurrencies}
  //   />
  // );

  const renderBaseCurrencyRow = () => isNotEmpty(baseCurrency) && (
    <ExchangeCurrencyRow
      inputType={CURRENCY_AMOUNT_INPUT_TYPES.BASE}
      currency={baseCurrency}
      amount={baseCurrency.amount}
      balance={baseCurrencyBalance}
      isBalanceBreached={isBalanceBreached}
      onBalanceClick={handleBaseBalanceClick}
      onCurrencyChange={handleBaseCurrencyChange}
      onAmountChange={handleBaseCurrencyAmountChange}
    />
  );

  const renderQuoteCurrencyRow = () => isNotEmpty(quoteCurrency) && (
    <ExchangeCurrencyRow
      inputType={CURRENCY_AMOUNT_INPUT_TYPES.QUOTE}
      currency={quoteCurrency}
      amount={quoteCurrency.amount}
      balance={quoteCurrencyBalance}
      onBalanceClick={handleQuoteBalanceClick}
      onCurrencyChange={handleQuoteCurrencyChange}
      onAmountChange={handleQuoteCurrencyAmountChange}
    />
  );

  const renderExchangeRate = () => (
    <ExchangeRate
      baseCurrency={baseCurrency}
      quoteCurrency={quoteCurrency}
      currentRate={currentRate}
      onSwitchCurrencies={handleSwitchCurrencies}
    />
  );

  const renderContent = () => (
    <section className="currencyExchangeWidget">
      <ExchangeHeader />
      {renderBaseCurrencyRow()}
      {renderExchangeRate()}
      {renderQuoteCurrencyRow()}
      <ExchangeButton
        isDisabled={!isExchangeAvailable}
        onExchangeButtonClick={handleExchangeButtonClick}
      />
      {(isLoading || isUpdating) && <Loader />}
    </section>
  );

  return (
    <main className="exchangeContainer">
      {renderContent()}
      {error !== null && (
        <ErrorMessage
          error={error}
          onClose={handleErrorClear}
        />
      )}
    </main>
  );
}
