import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

export function a() {
  console.log("ddfgnfknaknklfdnl");
}

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
  
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware( reduxThunk ))
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
