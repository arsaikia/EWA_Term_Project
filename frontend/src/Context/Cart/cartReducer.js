import { GET_ALL_PRODUCTS, GET_PRODUCTS_IN_CART, UPDATE_CART } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                allProductsFetched: true,
            };

        case GET_PRODUCTS_IN_CART:
            return {
                ...state,
                productsInCart: action.payload,
                productsInCartFetched: true,
            };

        case UPDATE_CART:
            return {
                ...state,
                productsInCart: [...state.productsInCart, action.payload],
                productsInCartFetched: true,
            };

        default:
            return state;
    }
};
