import React from 'react';
import PropTypes from 'prop-types';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { formatExchangeRate } from 'utils/format';
import { CurrencyType } from 'types/exchange';
import './styles.scss';

export default function ExchangeRate(props) {
  const {
    baseCurrency,
    quoteCurrency,
    currentRate,
    onSwitchCurrencies
  } = props;

  const renderSwitchCurrenciesButton = () => (
    <span className="switchCurrenciesButton">
      <SwapVertIcon
        onClick={onSwitchCurrencies}
      />
    </span>
  );

  const renderExchangeRate = () => (
    <span className="exchangeRate">
      <TrendingUpIcon />
      {`${baseCurrency.symbol}1 = ${quoteCurrency.symbol}${formatExchangeRate(currentRate)}`}
    </span>
  );

  return (
    <div className="exchangeRateContainer">
      <div className="exchangeRateRow top">
        {renderSwitchCurrenciesButton()}
        {currentRate && renderExchangeRate()}
      </div>
      <div className="exchangeRateRow bottom" />
    </div>
  );
}

ExchangeRate.propTypes = {
  baseCurrency: CurrencyType.isRequired,
  quoteCurrency: CurrencyType.isRequired,
  currentRate: PropTypes.number,
  onSwitchCurrencies: PropTypes.func.isRequired
};
