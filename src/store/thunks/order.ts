import axios from '../../axios-orders';
import * as actions from '../actions';

export function purchaseBurgerThunk(orderData:any, token:any) {
  
  return async (dispatch:any) => {

    dispatch(actions.purchaseBurgerStart());

    try {
      const response:any = await axios.post(
        '/orders.json?auth=' + token,
        orderData
      );
      dispatch(
        actions.purchaseBurgerSuccess(response.data.name, orderData)
      );
    } catch (error) {
      dispatch(actions.purchaseBurgerFail(error));
    }
  }

}

export function fetchOrdersThunk(token:any, userId:any) {

  return async (dispatch:any) => {
    const queryParams =
      '?auth=' +
      token +
      '&orderBy="userId"&equalTo="' +
      userId +
      '"';
    dispatch(actions.fetchOrdersStart());

    try {
      const res:any = await axios.get('/orders.json' + queryParams);
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (e) {
      dispatch(actions.fetchOrdersFail(e));
    }
  }
}

