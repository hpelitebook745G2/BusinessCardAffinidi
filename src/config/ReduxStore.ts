import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from '@reducers';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['contacts'],
  debug: true, //to get useful logging
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];
middleware.push(
  createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    logErrors: true,
    diff: true,
  }),
);
const enhancers = [...middleware];

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: enhancers,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
