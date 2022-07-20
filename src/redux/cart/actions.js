import { cartTypes } from "./types"

export const toggleOverlay = payload => ({
    type: cartTypes.ADD_PRODUCT_TO_CART,
    payload
})