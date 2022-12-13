import axios from '../../axios-orders';
import * as actions from '../actions';

export function purchaseBurgerThunk(orderData: any, token: any) {
    return async function (dispatch: any) {
        dispatch(actions.purchaseBurgerStart());    
        try {
            const response = await axios.post(
                '/orders.json?auth=' + token,
                orderData
            );
            dispatch(
                actions.purchaseBurgerSuccess(await response.data.name, orderData)
            );
        } catch (error) {
            dispatch(actions.purchaseBurgerFail(await error));
        }
    }    
}

export function fetchOrdersThunk(token: any, userId: any) {
    return async function (dispatch: any) {  
        const queryParams =
            '?auth=' +
            token +
            '&orderBy="userId"&equalTo="' +
            userId +
            '"';
        dispatch(actions.fetchOrdersStart());

        try {
            const res = await axios.get('/orders.json' + queryParams);
            const fetchedOrders = [];
            for (let key in await res.data) {
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
