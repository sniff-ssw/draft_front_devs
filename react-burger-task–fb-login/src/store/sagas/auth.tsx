import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action: any) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  // yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  // yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action: any) {
  yield delay(action.expirationTime * 10000);
  yield put(actions.logout());

  // setTimeout(() => {
  //   dispatch(logout());
  // }, expirationTime * 1000);
}

export function* authUserSaga(action: any): Generator<any, any, any> {
  // "put" in redux-saga is the same as "dispatch"
  yield put(actions.authStart()); //is the same as dispatch(authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  if (!action.isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err: any) {
    yield put(actions.authFail(err.response.data.error));
  }
}

type ReduxSaga = Generator<any, any, any>;
export function* authCheckStateSaga(action: any): ReduxSaga {
  // "put" in redux-saga is the same as "dispatch"
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate') || ""  // !
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));

      yield put(
        actions.checkAuthTimeout(
          expirationDate.getTime() - new Date().getTime() / 1000
        )
      );
    }
  }
}
