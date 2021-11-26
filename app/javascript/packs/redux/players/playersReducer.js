import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYERS,
  DAMAGE_PLAYERS,
  DELETE_PLAYERS,
} from './playersTypes'

const playersInitialState = {
  left: null,
  right: null,
};

const playersReducer = (state = playersInitialState, action) => {
  switch (action.type) {
    case CREATE_PLAYERS:
      return {
        ...state,
        left: action.left || state.left,
        right: action.right || state.right,
      };
    case DAMAGE_PLAYERS:
      return {
        ...state,
        left: {
          ...state.left,
          credibility: state.credibility - action.left,
        },
        right: {
          ...state.right,
          credibility: state.credibility - action.right,
        },
      };
    case DELETE_PLAYERS:
      return {
        ...state,
        left: null,
        right: null,
      };
    default:
      return state;
  }
}

export default playersReducer;
