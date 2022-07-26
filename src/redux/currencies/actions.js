import { currenciesTypes } from "./types"

export const popupToggle = () => ({
    type: currenciesTypes.POPUP_TOGGLE,
})

export const closeToggle = () => ({
    type: currenciesTypes.CLOSE_TOGGLE
})

export const changeCurrency = (newCurrency) => ({
    type: currenciesTypes.CHANGE_CURRENCY,
    payload: newCurrency
})