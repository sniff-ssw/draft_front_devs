import axios from 'axios';

import * as actions from '../actions/index';

export function logoutThunk() {
  return (dispatch:any) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    dispatch(actions.logoutSucceed());
  }
}

export function checkAuthTimeoutThunk(action:any) {  
  return () => {
    setTimeout(() => {
      logoutThunk();
    }, action.expirationTime * 1000);
  }
}

// Auth
export function authUserThunk(email:string, password:string, isSignup:boolean) {
  return async (dispatch:any) => {

    dispatch(actions.authStart()); 
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const req = async () => {
      try {
        let url =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
        if (!isSignup) {
          url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDd24SCQ1nkN3Tk3XPiRgK7sC56puUuJ2U';
        }
        const res = await axios.post(url, authData);
        const expirationDate:any = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(actions.authSuccess(res.data.idToken, res.data.localId));
        checkAuthTimeoutThunk(res.data.expiresIn);
      } catch (err:any) {
        console.log(err.response.data.error);
        dispatch(actions.authFail(err.response.data.error));
      }
    };
    req();
  } 
}

// App
export function authCheckStateThunk() {
  return (dispatch:any) => {

  const token = localStorage.getItem('token');
  
  if (!token) {
    logoutThunk();
  } else {
    const expirationDate:any =  new Date(
      localStorage.getItem('expirationDate')  || ""
    );

    if (expirationDate <= new Date()) {
      logoutThunk();
    } else {
        const userId = localStorage.getItem('userId');
        dispatch(actions.authSuccess(token, userId));

      
          checkAuthTimeoutThunk(
            expirationDate.getTime() - new Date().getTime() / 1000
          
        );
      }
    }
  }
}
