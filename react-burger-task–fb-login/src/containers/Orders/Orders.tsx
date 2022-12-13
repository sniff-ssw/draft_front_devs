import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import { useDispatch } from 'react-redux';
import { fetchOrdersThunk, purchaseBurgerThunk } from '../../store/thunk/orderThunk'

function Orders(props: any) {
  // state = {
  //   orders: [],
  //   error: false,
  //   loading: true
  // };

  // const dispatch=useDispatch();

  useEffect(() => { 
    // dispatch<any>(fetchOrdersSaga(props.token, props.userId));
    props.onFetchOrders(props.token, props.userId);        
    
    // const req = async () => {
    //   try {
    //     const res = await axios.get('/orders.json');
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({
    //       orders: fetchedOrders,
    //       loading: false
    //     });
    //   } catch (e) {
    //     this.setState({
    //       error: true,
    //       loading: false
    //     });
    //   }
    // };
    // req();
  }, []);
  
    let orders = <Spinner />;
    if (!props.loading) {
      orders = props.orders.map((order: any) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return <div>{orders}</div>;  
}

const mapStateToProps = (state: any) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchOrders: (token: any, userId: any) =>
      dispatch(fetchOrdersThunk(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
