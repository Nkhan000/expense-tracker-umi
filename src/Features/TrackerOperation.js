import {
  //   applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to local storage for web
import trackerSlice from "./TrackerSlice";
// import persistReducer from "redux-persist/es/persistReducer";

// combining reducers so that all of them comes under one place
const rootReducer = combineReducers({
  trackers: trackerSlice,
});

const persisConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types or paths if needed
        ignoredActions: ["persist/PERSIST"], // Exclude redux-persist actions
        ignoredPaths: ["some.nested.nonSerializableField"], // Ignore certain parts of state
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
