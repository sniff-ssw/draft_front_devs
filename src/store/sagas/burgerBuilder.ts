import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action:any):Generator<any> {
  try {
    const res:any = yield axios.get('/ingredients.json');
    yield put(actions.setIngredients(res.data));
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
