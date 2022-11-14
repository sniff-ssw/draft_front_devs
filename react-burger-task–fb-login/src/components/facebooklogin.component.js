import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";

// import { connect } from 'react-redux';
// import * as actions from '../store/actions/index';

function FacebookLoginComponent(props) {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const [state, setState] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
});

  const responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      // submitHandler();
    } else {
      setLogin(false);
    }
  };

  const logout = () => {
    setLogin(false);
    setData({});
    setPicture("");
  };
  
  return (
    <div className="container">
      {!login && (
        <FacebookLogin
          appId="661529714713339"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}

      {login && (
        <div className="card">
          <div className="card-body">
            <img className="rounded" src={picture} alt="Profile" />
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Email ID: {data.email}</p>
            <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );

  
}

export default FacebookLoginComponent;


// const submitHandler = (event) => {      
  //     props.onAuth(
  //       data.email,
  //       data.name,
  //       login
  //     );
  // };

// const mapStateToProps = (state) => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     isAuthenticated: state.auth.token !== null,
//     buildingBurger: state.burgerBuilder.building,
//     authRedirectPath: state.auth.authRedirectPath
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAuth: (email, password, isSignup) =>
//       dispatch(actions.auth(email, password, isSignup)),
//     onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(FacebookLoginComponent);

