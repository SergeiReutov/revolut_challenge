import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { formatCurrencyAmount } from 'utils/format';
import { CurrencyType } from 'types/exchange';
import './styles.scss';

export default function CurrencyBalance(props) {
  const {
    currency,
    balance,
    isBalanceBreached,
    onBalanceClick
  } = props;

  const balanceClassName = classnames('currencyBalance', {
    isBreached: isBalanceBreached
  });

  return balance !== '' && (
    <div className={balanceClassName} onClick={onBalanceClick}>
      {`Balance: ${currency.symbol}${formatCurrencyAmount(balance)}`}
    </div>
  );
}

CurrencyBalance.propTypes = {
  currency: CurrencyType.isRequired,
  balance: PropTypes.string,
  isBalanceBreached: PropTypes.bool,
  onBalanceClick: PropTypes.func.isRequired
};
