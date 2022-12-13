import { INIT_INGREDIENTS } from '../actions/types';

import axios from '../../axios-orders';
import * as actions from '../actions';


export function initIngredients() {    
    return async function (dispatch: any) {
        // dispatch({type: INIT_INGREDIENTS});       
      try {  
            const res = await axios.get('/ingredients.json');
            dispatch( actions.setIngredients(await res.data) );
            // another syntax:
            // return axios.get('/ingredients.json')
            // .then(res => dispatch( actions.setIngredients(res.data) ))
        } catch (e) {
            dispatch( actions.fetchIngredientsFailed() );
        }        
    }
}
