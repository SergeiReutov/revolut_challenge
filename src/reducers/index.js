import { combineReducers } from 'redux';

import { default as exchange } from './exchange';
import { default as user } from './user';

export default combineReducers({
  exchange,
  user
});
