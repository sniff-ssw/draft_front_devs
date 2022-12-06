import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return function(props) {

    const [state, setState] = useState({error: null});

    useEffect(()=>{
      const reqInterceptor = axios.interceptors.request.use(req => {
        setState({ error: null });
        return req;
      });
      const resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          setState({ error: error });
        }
      );

      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    });


    const errorConfirmedHandler = () => {
      setState({ error: null });
    };


      return (
        <Aux>
          <Modal
            show={state.error}
            modalClosed={errorConfirmedHandler}
          >
            {state.error ? state.error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
    
  };
};

export default withErrorHandler;
