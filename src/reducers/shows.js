import {
  SHOW_LOAD,
  SHOW_LOAD_SUCCESS,
  SHOW_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
};

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

export default function shows(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOAD:
      return {
        ...state,
        loading: true
      };
    case SHOW_LOAD_SUCCESS:
      const shuffledShows = action.result ? shuffle(action.result.payload) : undefined;

      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        shows: shuffledShows,
        error: null
      };
    case SHOW_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.shows && globalState.shows.loaded;
}
