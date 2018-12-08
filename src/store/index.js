import {createStore, applyMiddleware,combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk'
import CustomerProducer from './customer/CustomerProducer';
import BookProducer from './book/BookProducer';
import GlobalProducer from './global/GlobalProducer';

const rootReducer = combineReducers({
  CustomerProducer,
  BookProducer,
  GlobalProducer
})

let store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default store;