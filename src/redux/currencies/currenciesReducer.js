import { currenciesTypes } from "./types";

const initialState = {
    popupToggle: false,
    currency: 'USD',
    prices: {
        USD: ''
    }
}

export const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case currenciesTypes.POPUP_TOGGLE:
            return {
                ...state,
                popupToggle: !state.popupToggle
            }
        case currenciesTypes.CLOSE_TOGGLE: 
            return {
                ...state, 
                popupToggle: false
            }
        case currenciesTypes.CHANGE_CURRENCY: 
            return {
                ...state,
                currency: action.payload
            }
        default: 
        return state;
    }
}