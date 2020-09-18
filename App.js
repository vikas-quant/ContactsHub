import React from 'react';

import { Provider } from 'react-redux';
import MainStack from './src/config/routes';
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './src/config/configureStore';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  )
}
export default App;
