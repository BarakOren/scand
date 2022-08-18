import { cartTypes } from "./types"

export const toggleOverlay = () => ({
    type: cartTypes.TOGGLE_OVERLAY,
})

export const closeOverlay = () => ({
    type: cartTypes.CLOSE_OVERLAY
})

export const AddToCart = item => ({
    type: cartTypes.ADD_TO_CART,
    payload: item
})

export const addFromCart = item => ({
    type: cartTypes.ADD_FROM_CART,
    payload: item
})

export const addToCartFromCategoryPage = item => ({
    type: cartTypes.ADD_TO_CART_FROM_CATEGORY_PAGE,
    payload: item
})

export const RemoveFromCart = item => ({
    type: cartTypes.REMOVE_FROM_CART,
    payload: item
})

export const changeSizeOrColor = (item, whatToChange, changeTo) => ({
    type: cartTypes.CHANGE_SIZE_OR_COLOR,
    payload: {item, whatToChange, changeTo}
})

export const selectAttributeFromItemPage = (item, whatToChange, changeTo) => ({
    type: cartTypes.SELECT_ATTRIBUTE_FROM_ITEM_PAGE,
    payload: {item, whatToChange, changeTo}
})