import axios from 'axios';
import * as actions from '../actions/index';

import { store }  from '../../index';

export function logoutThunk() { 
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');       
      store.dispatch(actions.logoutSucceed()); 
}

export function checkAuthTimeoutThunk(action: any) {
    setTimeout(() => {
        logoutThunk();        
      }, action.expirationTime * 1000);    
}

export function authUserThunk(email: string, password: string, isSignup: boolean) {
  return async function (dispatch: any) {      
      dispatch(actions.authStart()); //is the same as dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
      if (!isSignup) {
        url =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
      }
      try {
        const res = await axios.post(url, authData);
        const expirationDate: any = new Date(
          new Date().getTime() + await res.data.expiresIn * 1000
        );
        localStorage.setItem('token', await res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', await res.data.localId);
        await dispatch(actions.authSuccess(res.data.idToken, res.data.localId));        
        checkAuthTimeoutThunk(actions.checkAuthTimeout(await res.data.expiresIn));
      } catch (err: any) {
        await dispatch(actions.authFail(err.response.data.error));
      }
  }  
}

export function authCheckStateThunk() {
  return function(dispatch: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      logoutThunk();
    } else {
      const expirationDate = new Date(
        localStorage.getItem('expirationDate') || ""                     // !
      );
      if (expirationDate <= new Date()) {
        logoutThunk();
      } else {
        const userId:any = localStorage.getItem('userId');
        dispatch(actions.authSuccess(token, userId));

        dispatch(
          actions.checkAuthTimeout(
            expirationDate.getTime() - new Date().getTime() / 1000
          )                                                               
        );        
      }
    }
  }  
}
