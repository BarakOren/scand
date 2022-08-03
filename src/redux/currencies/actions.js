import { currenciesTypes } from "./types"

export const popupToggle = () => ({
    type: currenciesTypes.POPUP_TOGGLE,
})

export const setCurrencies = (data) => ({
    type: currenciesTypes.SET_CURRENCIES,
    payload: data
})

export const closeToggle = () => ({
    type: currenciesTypes.CLOSE_TOGGLE
})

export const changeCurrency = (newCurrency) => ({
    type: currenciesTypes.CHANGE_CURRENCY,
    payload: newCurrency
})