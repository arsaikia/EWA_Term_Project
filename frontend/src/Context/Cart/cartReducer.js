import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_IN_CART,
    UPDATE_CART,
    GET_PRODUCT_BY_ID,
    REMOVE_FETCHED_STATE,
    SET_CART_COUNT,
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                originalProducts: action.payload,
                allProducts: action.payload,
                allProductsFetched: true,
            };

        case REMOVE_FETCHED_STATE:
            return {
                ...state,

                allProductsFetched: false,
                productsInCartFetched: false,
                productByIdFetched: false,
            };

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productById: action.payload,
                productByIdFetched: true,
            };

        case GET_PRODUCTS_IN_CART:
            return {
                ...state,
                productsInCart: action.payload,
                productsInCartFetched: true,
            };

        case SET_CART_COUNT:
            return {
                ...state,
                cartCount: action.payload,
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
