import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';

function Logout(props:any) {

  useEffect(()=>{
    props.onLogout();
  })
  return <Redirect to="/" />;
  
}

const mapDisPatchToProps = (dispatch:any) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDisPatchToProps)(Logout);
