import { useState, useEffect } from 'react';

type State = any;
const asyncComponent = (importComponent: any) => {
  return function(props: any) {
    
    const [state, setState] = useState<State>({component: null});
    
    useEffect(() => {
      importComponent().then((cmp: any) => {
        setState({ component: cmp.default });
      });
    });
    
      const C = state.component;

      return C ? <C {...props} /> : null;
    
  };
};

export default asyncComponent;
