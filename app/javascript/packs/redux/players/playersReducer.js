import {
  CREATE_PLAYERS,
  DAMAGE_PLAYERS,
  DELETE_PLAYERS,
  NEXT_TURN,
} from './playersTypes'

const playersInitialState = {
  left: {},
  right: {},
  turn: "left"
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
    case NEXT_TURN:
      return {
        ...state,
        turn: state.turn == "left" ? "right" : "left"
      };
    case DELETE_PLAYERS:
      return {
        ...state,
        left: {},
        right: {},
      };
    default:
      return state;
  }
}

export default playersReducer;
