import { cartTypes } from "./types"

export const toggleOverlay = () => ({
    type: cartTypes.TOGGLE_OVERLAY,
})

export const AddToCart = item => ({
    type: cartTypes.ADD_TO_CART,
    payload: item
})

export const RemoveFromCart = item => ({
    type: cartTypes.REMOVE_FROM_CART,
    payload: item
})