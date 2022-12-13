import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import { useDispatch } from 'react-redux';
import { initIngredients } from '../../store/thunk/burgerBuilderThunk'


function BurgerBuilder(props: any) {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }

  const dispatch=useDispatch();
  const [state, setState] = useState({purchasing: false});

  useEffect(() => {
    // dispatch<any>(initIngredients()); console.log( dispatch<any>(initIngredients()) );
    // props.onGetRequest(); console.log(props.onGetRequest());
    props.onInitIngredients();
  }, []);


  const updatePurchaseState = (ingredients: any) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //this.setState({ purchasable: sum > 0 });
    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  //
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setState({ purchasing: true });
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setState({ purchasing: false });
  };

  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push(`price=${this.props.price}`);
    //const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${queryString}` //'?' + queryString
    // });
    props.onInitPurchase();
    props.history.push({
      pathname: '/checkout'
    });
  };

  
    const disabledInfo = {...props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? (
      <p>Ingredients couldn't be loaded</p>
    ) : (
      <Spinner />
    );

    if (props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
            price={props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={props.ings}
          price={props.price}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      );
    }
    
    return (
      <Aux>
        <Modal
          show={state.purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>        
        {burger}
      </Aux>
    );
  
}

const mapStateToProps = (state: any) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIngredientAdded: (ingName: any) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: any) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: any) => dispatch(actions.setAuthRedirectPath(path)),
    // onGetRequest: () => dispatch('getRequest()'),  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
