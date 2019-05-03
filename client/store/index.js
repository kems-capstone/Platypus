import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
// import products from './products';
// import cart from './cart';
// import newsletter from './newsletter';
// import {saveState, loadState} from '../../localStorage';
// import throttle from 'lodash/throttle';

const reducer = combineReducers({user});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

// const persistedState = loadState();

export const store = createStore(reducer, middleware);

// store.subscribe(
//   throttle(() => {
//     saveState({
//       cart: store.getState().cart
//     })
//   }, 1000)
// )

export default store;
// export * from './user'
