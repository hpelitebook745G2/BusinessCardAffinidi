import {persistor, store} from '@config/ReduxStore';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Parent} from './config/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Parent />
      </PersistGate>
    </Provider>
  );
};

export default App;
