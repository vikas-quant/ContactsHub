// configureStore.js
 
import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import homeReducer from 'ContactsHub/src/screens/home/ducks/homeReducer'
import loginReducer from 'ContactsHub/src/screens/login/ducks/LoginScreen.reducer'
import AsyncStorage from '@react-native-community/async-storage';
const rootReducer = combineReducers({
  homeReducer: homeReducer,
  loginReducer: loginReducer 
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)