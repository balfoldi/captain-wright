import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  CREATE_PLAYERS,
  DAMAGE_PLAYERS,
  DELETE_PLAYERS,
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
export const deletePlayers = () => {
  return {
    type: DELETE_PLAYERS
  };
};
