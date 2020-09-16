import { USER } from './ActionTypes';

export const updateAccount = (currency, amount) => ({
  type: USER.ACCOUNTS.UPDATE.REQUEST,
  currency,
  amount
});
