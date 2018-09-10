import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import result from './src/Result/module';

const reducer = combineReducers({
  result
});

export default createStore(reducer, compose(applyMiddleware(thunk)));