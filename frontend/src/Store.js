import { createContext, useReducer } from 'react';

export const Store = createContext(); //context creation

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  var cartItems;
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log('case : add_to_cart');
      const newProd = action.payload;
      const existedItem = state.cart.cartItems.find((prod) => {
        return prod._id === newProd._id;
      });

      cartItems = existedItem
        ? state.cart.cartItems.map((item) =>
            item._id === existedItem._id ? newProd : item
          )
        : [...state.cart.cartItems, newProd];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'REMOVE_FROM_CART':
      console.log('removefromcart');
      cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      console.log('case : default');
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const provision = { state: state, dispatch: dispatch };
  console.log(state);
  return <Store.Provider value={provision}>{props.children}</Store.Provider>;
}
