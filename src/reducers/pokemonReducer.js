import AsyncStorage from '@react-native-community/async-storage';
import {
  requestPokemon,
  recievePokemon,
  clearPokemon,
  errorPokemon,
} from 'actions/pokemonAction';
import { last } from 'lodash';
import { handleActions } from 'redux-actions';
import { normalize, schema } from 'normalizr';

const INITIAL_STATE = {
  results: [],
  loading: false,
  next: null,
  previous: null,
  isError: false,
};

const pokemonReducer = handleActions(
  {
    [requestPokemon]: state => ({
      ...state,
      loading: true,
      isError: false,
    }),

    [recievePokemon]: (state, action) => {
      const { results, next, previous } = action.payload;
      const schemaResults = new schema("results", {});
      const normalizedResults = normalize(results, {results: [schemaResults]});
      const pokemonResults = results.map((item) => {
        const url = item.url.slice(0, item.url.length - 1);
        const id = last(url.split('/'));
        return { ...item, id: parseInt(id, 10) };
      });
      return {
        ...state,
        loading: false,
        results: [
          ...state.results,
          ...pokemonResults,
        ],
        next,
        previous,
        isError: false,
      };
    },

    [errorPokemon]: state => ({
      ...state,
      isError: true,
      loading: false,
    }),

    [clearPokemon]: () => (INITIAL_STATE),
  },
  INITIAL_STATE,
);

const pokemonPersistConfig = {
  key: 'pokemon',
  storage: AsyncStorage,
  blacklist: ['loading', 'isError'],
  timeout: null,
};

export {
  pokemonReducer,
  pokemonPersistConfig,
};
