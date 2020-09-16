import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCY_AMOUNT_INPUT_TYPES } from 'utils/constants/exchange';
import TextField from '@material-ui/core/TextField';
import {
  withSign,
  extractAmount,
  isValidInputedAmount,
  formatCurrencyAmount,
  formatCalculatedAmount
} from 'utils/format';
import './styles.scss';

export default function CurrencyAmount(props) {
  const {
    inputType,
    amount,
    isFocused,
    onAmountChange
  } = props;

  const sign = inputType === CURRENCY_AMOUNT_INPUT_TYPES.BASE
    ? '-'
    : '+';

  const formatFn = isFocused
    ? formatCurrencyAmount
    : formatCalculatedAmount;

  const handleAmountChange = e => {
    const newAmount = extractAmount(e.target.value);
    if (isValidInputedAmount(newAmount)) {
      onAmountChange(newAmount);
    }
  };

  return (
    <TextField
      className="currencyAmount"
      InputProps={{
        disableUnderline: true
      }}
      placeholder={'0'}
      value={withSign(sign, formatFn(amount))}
      onChange={handleAmountChange}
    />
  );
}

CurrencyAmount.propTypes = {
  inputType: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  onAmountChange: PropTypes.func.isRequired
};
