import { API_FETCH_POKEMON } from 'config';
import { createActions } from 'redux-actions';
import { PURGE } from 'redux-persist';

export const REQUEST_POKEMON = 'REQUEST_POKEMON';
export const RECIEVE_POKEMON = 'RECIEVE_POKEMON';
export const CLEAR_POKEMON = 'CLEAR_POKEMON';
export const ERROR_POKEMON = 'ERROR_POKEMON';

export const {
  requestPokemon,
  recievePokemon,
  clearPokemon,
  errorPokemon,
} = createActions(
  REQUEST_POKEMON,
  RECIEVE_POKEMON,
  CLEAR_POKEMON,
  ERROR_POKEMON,
);

// export const recievePokemon = RECIEVE_POKEMON;

export const fetchPokemon = () => (
  (dispatch, getState) => {
    dispatch(requestPokemon());
    const { next } = getState().pokemon;
    const url = next || API_FETCH_POKEMON;
    console.log("URL: ", url);

    return fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    }) //`${API_FETCH_POKEMON}sdfsdf`)
      .then(
        response => {
          return response.json();
        },
      ).then((json) => {
        dispatch(recievePokemon(json));
        console.log("RESPONSE: ", json);
      }).catch((error) => {
        console.log('FETCH POKEMON: ', error); // eslint-disable-line no-console
        dispatch(errorPokemon());
      });
  }
);

export const resetPokemon = () => (
  (dispatch) => {
    dispatch({
      type: PURGE,
      key: 'pokemon',
      result: () => null,
    });
  }
)