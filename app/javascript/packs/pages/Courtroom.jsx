import React from 'react'

import Player from "../component/Player"

import { useDispatch, useSelector } from "react-redux";
import { nextTurn } from "../redux"

import { colors, displays } from "../modules/playersObjects"

const Courtroom = () => {
  return (
    <div className="d-flex justify-content-around">
      <Player playerName={"left"}/>
      <Player playerName={"right"}/>
    </div>
  )
}

export default Courtroom
