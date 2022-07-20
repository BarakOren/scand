import { currenciesTypes } from "./types";

const initialState = {
    popupToggle: false,
}

export const currenciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case currenciesTypes.POPUP_TOGGLE:
            return {
                ...state,
                popupToggle: !state.popupToggle
            }
        default: 
        return state;
    }
}