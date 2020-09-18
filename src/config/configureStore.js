// configureStore.js
 
import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import homeReducer from '../screens/home/ducks/homeReducer'
import AsyncStorage from '@react-native-community/async-storage';
const rootReducer = combineReducers({
  homeReducer: homeReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)