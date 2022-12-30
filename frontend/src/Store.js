import { createContext, useReducer } from 'react';

export const Store = createContext(); //context creation

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

const reducer = (state, action) => {
  var cartItems;
  switch (action.type) {
    case 'ADD_TO_CART':
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
      cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'USER_LOG_IN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
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
