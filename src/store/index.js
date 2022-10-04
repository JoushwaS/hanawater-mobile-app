import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reduxThunk from "redux-thunk";

// redux-persist config
const persistConfig = {
  key: "root:hanawater",
  storage: AsyncStorage,
};

// initialize persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define redux middlewares
const middlewares = [reduxThunk, logger];

// store for Provider component
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

// persist store for PersistGate component
const persistor = persistStore(store);

export { store, persistor };
