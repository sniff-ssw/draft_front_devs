//ingredients
export const ADD_INGREDIENT: string = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: string = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS: string = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED: string = 'FETCH_INGREDIENTS_FAILED';
//BurgerBuilder sagas
export const INIT_INGREDIENTS: string = 'INIT_INGREDIENTS';

//purchase
export const PURCHASE_BURGER: string = 'PURCHASE_BURGER';
export const PURCHASE_BURGER_START: string = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_SUCCESS: string = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL: string = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_INIT: string = 'PURCHASE_INIT';

//fetch orders
export const FETCH_ORDERS: string = 'FETCH_ORDERS';
export const FETCH_ORDERS_START: string = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS: string = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL: string = 'FETCH_ORDERS_FAIL';

//Auth
export const AUTH_START: string = 'AUTH_START';
export const AUTH_SUCCESS: string = 'AUTH_SUCCESS';
export const AUTH_FAIL: string = 'AUTH_FAIL';
export const AUTH_LOGOUT: string = 'AUTH_LOGOUT';
//Auth sagas
export const AUTH_USER: string = 'AUTH_USER';
export const AUTH_CHECK_TIMEOUT: string = 'AUTH_CHECK_TIMEOUT';
export const AUTH_INITIATE_LOGOUT: string = 'AUTH_INITIATE_LOGOUT';
export const AUTH_CHECK_STATE: string = 'AUTH_CHECK_STATE';

//Redirect
export const SET_AUTH_REDIRECT_PATH: string = 'SET_AUTH_REDIRECT_PATH';
