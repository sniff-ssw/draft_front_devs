import {
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
} from '../actions/types';

import { takeEvery, all } from 'redux-saga/effects';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
  // yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  // yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(AUTH_USER, authUserSaga);
  // yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
}
