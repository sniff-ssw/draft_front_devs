import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

function Layout(props) {

  const [state, setState] = useState({showSideDrawer: false})

  const sideDrawerClosedHandler = () => {
    setState({ showSideDrawer: false });
  };

  const sideDrawerToggleHandler = () => {
    setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };


    return (
      <Aux>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={state.showSideDrawer}
          closed={sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
