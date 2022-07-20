import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
// import createSagaMiddleware from "redux-saga";
// import rootSaga from './rootSagas';

import rootReducer from "./rootReducer";

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware, logger];
const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// sagaMiddleware.run(rootSaga);
// export const persistor = persistStore(store);