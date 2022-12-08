import React, { useEffect, useState } from 'react';

const asyncComponent = (importComponent:any) => {
  return function(props:any) {

    const [state, setState] = useState({component: null})

    useEffect(() => {
      importComponent().then((cmp:any) => {
        setState({ component: cmp.default });
      });
    }, [])

    const C:any = state.component;

    return C ? <C {...props} /> : null;
    
  };
};

export default asyncComponent;
