import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { persistedReducer } from 'reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

const persistor = persistStore(store);

export { store, persistor };
