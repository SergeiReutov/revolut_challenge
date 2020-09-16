import React from 'react';
import PropTypes from 'prop-types';
import { CURRENCIES } from 'utils/constants/exchange';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CurrencyType } from 'types/exchange';
import './styles.scss';

export default function CurrenciesDropdown(props) {
  const {
    currency,
    onCurrencyChange
  } = props;

  const handleCurrencyChange = e => onCurrencyChange(CURRENCIES[e.target.value]);

  const renderCurrencyIcon = currencyOption => (
    <img
      className="currencyIcon"
      src={process.env.PUBLIC_URL + currencyOption.icon}
      alt={currencyOption.value}
    />
  );

  const renderCurrencyName = currencyOption => (
    <div className="currencyNameContainer">
      <span className="currencyCode">{currencyOption.value}</span>
      <span className="currencyName">{currencyOption.name}</span>
    </div>
  );

  const renderCurrencyOption = currencyOption => (
    <MenuItem
      className="currencyOptionItem"
      key={currencyOption.value}
      value={currencyOption.value}
    >
      {renderCurrencyIcon(currencyOption)}
      {renderCurrencyName(currencyOption)}
    </MenuItem>
  );

  const renderOptions = () => Object.values(CURRENCIES).map(renderCurrencyOption);

  const renderSelectedCurrency = currencyOption => (
    <span>{currencyOption}</span>
  );

  return (
    <Select
      className="currenciesDropdown"
      disableUnderline
      IconComponent={ExpandMoreIcon}
      renderValue={renderSelectedCurrency}
      value={currency.value}
      onChange={handleCurrencyChange}
      MenuProps={{
        className: 'currenciesDropdownMenu'
      }}
    >
      {renderOptions()}
    </Select>
  );
}

CurrenciesDropdown.propTypes = {
  currency: CurrencyType.isRequired,
  onCurrencyChange: PropTypes.func.isRequired
};
