import { all } from 'redux-saga/effects';
import { exchangeSagas } from './exchange';

export default function* rootSaga() {
  yield all([
    ...exchangeSagas
  ]);
}
