import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { familyReducer } from "../features/family/store/familyReducer";
import { all, fork } from "redux-saga/effects";
import { familiesSaga } from "../features/family/store/familySaga";
import createSagaMiddleware from "redux-saga";
import { membersSaga } from "../features/member/store/memberSaga";
import { memberReducer } from "../features/member/store/memberReducer";

const rootReducer = combineReducers({
  families: familyReducer,
  members: memberReducer,
});

function* rootSaga() {
  yield all([fork(familiesSaga), fork(membersSaga)]);
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
