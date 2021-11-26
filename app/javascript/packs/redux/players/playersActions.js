import {
  CREATE_PLAYERS,
  DAMAGE_PLAYERS,
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
export const damagePlayers = ({left, right}) => {
  return {
    type: DAMAGE_PLAYERS,
    left,
    right,
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
