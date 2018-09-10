import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigator from './src/Navigator';

export default App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);