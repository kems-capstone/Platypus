import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import {Router} from 'react-router-dom';
// import history from './history';
import store from './store';
import App from './app';

// import '.\/socket';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('app')
);
