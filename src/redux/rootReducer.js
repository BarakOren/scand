import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import {cartReducer} from "./cart/cartReducer";
import {currenciesReducer} from "./currencies/currenciesReducer";

const persistConfig = {
    key: "root",
    storage: storage
}

const rootReducer = combineReducers({
        cart: cartReducer,
        currencies: currenciesReducer
})

export default persistReducer(persistConfig, rootReducer);