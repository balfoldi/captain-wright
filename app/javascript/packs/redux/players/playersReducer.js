import {
  CREATE_PLAYERS,
  UPDATE_PLAYERS,
  DELETE_PLAYERS,
  NEXT_TURN,
} from './playersTypes'

const playersInitialState = {
  left: {
    "id": 1,
    "full_name": "Felldir Cruel-Sea",
    "speechcraft": 30,
    "credibility": 10,
    "avatar": "mia",
    "experience": 90,
    "level": 2,
    "specialObjects": [],
  },
  right: {
    "id": 2,
    "full_name": "ddddfffd",
    "speechcraft": 50,
    "credibility": 10,
    "avatar": "pheonix",
    "experience": 90,
    "level": 2,
    "specialObjects": [],
  },
  turn: "left"
};

const playersReducer = (state = playersInitialState, action) => {
  switch (action.type) {
    case CREATE_PLAYERS:
      return {
        ...state,
        left: {...(action.left || state.left), specialObjects: []},
        right: {...(action.right || state.right), specialObjects: []},
      };
    case UPDATE_PLAYERS:
      return {
        ...state,
        left: action.left || state.left,
        right: action.right || state.right,
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
