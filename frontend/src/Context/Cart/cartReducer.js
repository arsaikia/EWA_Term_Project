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
    GET_MARKET_BASKET_ANALYSIS,
    GET_ALL_STORE_PRODUCTS,
    GET_ALL_NON_STORE_PRODUCTS,
    GET_ALL_TWEET_DEALS,
    GET_ALL_DISCOUNT_DEALS,
    GET_ALL_RATINGS_DEALS,
    REMOVE_PRODUCTS_STATE
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

        case GET_ALL_STORE_PRODUCTS:
            return {
                ...state,
                storeProducts: action.payload,
                storeProductsFetched: true,
            };

        case GET_ALL_DISCOUNT_DEALS:
            return {
                ...state,
                allProducts: action.payload,
                discountDealsFetched: true,
                storeProductsFetched: true,
                allProductsFetched: true,
            };

        case GET_ALL_RATINGS_DEALS:
            return {
                ...state,
                allProducts: action.payload,
                storeProductsFetched: true,
                allProductsFetched: true,
            };

        case GET_ALL_NON_STORE_PRODUCTS:
            return {
                ...state,
                storeNotProducts: action.payload,
                storeNotProductsFetched: true,
            };

            
        case REMOVE_FETCHED_STATE:
            return {
                ...state,
                allProducts: {},

                allProductsFetched: false,
                productsInCartFetched: false,
                mbaFetched: false,
                productByIdFetched: false,
            };

            
        case REMOVE_PRODUCTS_STATE:
            return {
                ...state,
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

        case GET_MARKET_BASKET_ANALYSIS:
            return {
                ...state,
                mba: action.payload,
                mbaFetched: true,
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

        case GET_ALL_TWEET_DEALS:
            return {
                ...state,
                tweetDeals: action.payload,
                tweetDealsFetched: true,
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
