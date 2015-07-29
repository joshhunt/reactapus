import {
  SHOW_LOAD,
  SHOW_LOAD_SUCCESS,
  SHOW_LOAD_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [SHOW_LOAD, SHOW_LOAD_SUCCESS, SHOW_LOAD_FAIL],
    promise: (client) => client.get('http://tv-api-cat.api.9jumpin.com.au/shows?take=20')
  };
}
