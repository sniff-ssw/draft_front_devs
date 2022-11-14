import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    PURCHASE_BURGER,
    FETCH_ORDERS
  } from './types';
  
  export const purchaseBurgerSuccess = (id: any, orderData: any) => {
    return {
      type: PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData
    };
  };
  
  export const purchaseBurgerFail = (error: any) => {
    return {
      type: PURCHASE_BURGER_FAIL,
      error
    };
  };
  
  export const purchaseBurgerStart = () => {
    return {
      type: PURCHASE_BURGER_START
    };
  };
  
  export const purchaseBurger = (orderData: any, token: any) => {
    return {
      type: PURCHASE_BURGER,
      orderData,
      token
    };
  };
  
  export const purchaseInit = () => {
    return {
      type: PURCHASE_INIT
    };
  };

  interface Ingredients {
    bacon: number,
    cheese: number,
    meat: number,
    salad: number
  }
  interface OrderData {
    country: string,
    deliveryMethod: string,
    email: string,
    name: string,
    street: string,
    zipCode: string | number
  }
  interface Orders {
    id: string,
    ingredients: Ingredients,
    orderData: OrderData,
    price: number,
    userId: string
  }
  export const fetchOrdersSuccess = (orders: Array<Orders>) => {
    return {
      type: FETCH_ORDERS_SUCCESS,
      orders
    };
  };
  
  export const fetchOrdersFail = (error: any) => {
    return {
      type: FETCH_ORDERS_FAIL,
      error
    };
  };
  
  export const fetchOrdersStart = () => {
    return {
      type: FETCH_ORDERS_START
    };
  };
  
  export const fetchOrders = (token: any, userId: any) => {
    return {
      type: FETCH_ORDERS,
      token,
      userId
    };
  };
  