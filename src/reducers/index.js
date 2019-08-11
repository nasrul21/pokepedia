import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { pokemonReducer, pokemonPersistConfig } from './pokemonReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
  whitelist: ['pokemon'],
  timeout: null,
};

export const rootReducer = combineReducers({
  pokemon: persistReducer(pokemonPersistConfig, pokemonReducer),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
