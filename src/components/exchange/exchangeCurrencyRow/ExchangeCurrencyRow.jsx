import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { CurrenciesDropdown } from 'components/exchange/exchangeCurrencyRow/currenciesDropdown';
import { CurrencyAmount } from 'components/exchange/exchangeCurrencyRow/currencyAmount';
import { CurrencyBalance } from 'components/exchange/exchangeCurrencyRow/currencyBalance';
import { CurrencyType } from 'types/exchange';
import './styles.scss';

export default function ExchangeCurrencyRow(props) {
  const {
    inputType,
    currency,
    amount,
    balance,
    isBalanceBreached = false,
    onBalanceClick,
    onCurrencyChange,
    onAmountChange
  } = props;

  const mainClassName = classnames('currencyInputContainer', inputType);

  return (
    <div className={mainClassName}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <CurrenciesDropdown
            currency={currency}
            onCurrencyChange={onCurrencyChange}
          />
        </Grid>
        <Grid item xs={8}>
          <CurrencyAmount
            inputType={inputType}
            amount={amount}
            isFocused={currency.isFocused}
            onAmountChange={onAmountChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrencyBalance
            currency={currency}
            balance={balance}
            isBalanceBreached={isBalanceBreached}
            onBalanceClick={onBalanceClick}
          />
        </Grid>
      </Grid>  
    </div>
  );
}

ExchangeCurrencyRow.propTypes = {
  inputType: PropTypes.string,
  currency: CurrencyType.isRequired,
  amount: PropTypes.string.isRequired,
  balance: PropTypes.string,
  isBalanceBreached: PropTypes.bool,
  onBalanceClick: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired
};
