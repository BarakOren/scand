import { cartTypes } from "../actions/types";


const initialState = {
    overlayToggler: false,
    shopingBag: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartTypes.TOGGLE_OVERLAY:
            return {
                ...state,
                overlayToggler: !state.overlayToggler
            }
        case cartTypes.ADD_PRODUCT_TO_CART:
            return {
                // 
            }
        default: 
        return state;
    }
}