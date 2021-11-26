import {
  CREATE_PLAYERS,
  UPDATE_PLAYERS,
  DELETE_PLAYERS,
  NEXT_TURN,
} from './playersTypes'

export const createPlayers = ({left, right}) => {
  return {
    type: CREATE_PLAYERS,
    left,
    right,
  };
};
export const updatePlayers = (players) => {
  return {
    type: UPDATE_PLAYERS,
    players,
  };
};
export const nextTurn = () => {
  return {
    type: NEXT_TURN
  };
};
export const deletePlayers = () => {
  return {
    type: DELETE_PLAYERS
  };
};
