import { bool, shape, string } from 'prop-types';

export const CurrencyType = shape({
  name: string.isRequired,
  value: string.isRequired,
  symbol: string.isRequired,
  icon: string.isRequired,
  amount: string.isRequired,
  isFocused: bool.isRequired
});
