import { cartTypes } from "./types";
import {addToCartUtil, removeFromCart, changeSizeOrColorFunc} from "./utils";

const initialState = {
    overlayToggler: false,
    cart: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                overlayToggler: !state.overlayToggler
            }
        case cartTypes.CLOSE_OVERLAY: 
            return {
                ...state,
                overlayToggler: false
            }
        case cartTypes.ADD_TO_CART:
            return {
                ...state,
                cart: addToCartUtil(state.cart, action.payload)
            }
        case cartTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: removeFromCart(state.cart, action.payload)
            }
        case cartTypes.CHANGE_SIZE_OR_COLOR: 
            return {
                ...state,
                cart: changeSizeOrColorFunc(state.cart, action.payload.item, action.payload.whatToChange, action.payload.changeTo)
            }
        default: 
        return state;
    }
}