import { all } from "redux-saga/effects";
// import mainCitySaga from "./mainCity/mainCity.saga";

export default function* rootSaga(){
  yield all([
    // mainCitySaga()
  ])
}