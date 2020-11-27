import {
    GET_ALL_PRODUCTS,
    GET_PRODUCTS_IN_CART,
    UPDATE_CART,
    GET_PRODUCT_BY_ID,
    FILTER_PRODUCTS,
    REMOVE_FETCHED_STATE,
    SET_CART_COUNT,
    GET_USER_ADDRESSES,
    GET_USER_CARDS,
    CREATE_TRANSFER,
    RESET_CREATE_TRANSFER,
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

        case GET_USER_CARDS:
            return {
                ...state,
                userCards: action.payload,
                userCardsFetched: true,
            };

        case GET_USER_ADDRESSES:
            return {
                ...state,
                userAddresses: action.payload,
                userAddressesFetched: true,
            };

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productById: action.payload,
                productByIdFetched: true,
            };

        case FILTER_PRODUCTS:
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

        case CREATE_TRANSFER:
            return {
                ...state,
                lastTransfer: action.payload,
                transferCreated: true,
            };

        case RESET_CREATE_TRANSFER:
            return {
                ...state,
                lastTransfer: {},
                transferCreated: false,
            };

        default:
            return state;
    }
};
