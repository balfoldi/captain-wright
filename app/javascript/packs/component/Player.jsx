import React, { useState, useEffect } from 'react'

import ProgressBar from "react-bootstrap/ProgressBar"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { faMehRollingEyes } from "@fortawesome/free-solid-svg-icons";
import { faLaughSquint } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  damagePlayers,
  nextTurn
} from "../redux"

import { Pheonix, Mia } from "./Avatars"

const Player = ({ playerName }) => {
  const dispatch = useDispatch();
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [state, setState] = useState("idle")
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(fetchPlayersState.turn === playerName)
  }, [fetchPlayersState])

  const renderAvatar = {
    mia: () => <Mia playerName={playerName} state={state} />,
    pheonix: () => <Pheonix playerName={playerName} state={state} />
  }

  const getOpponentName = () => ["left", "right"].find(name => name !== playerName)


  const { avatar, full_name, speechcraft, credibility } = fetchPlayersState[playerName]

  const handleArgue = () => {
    dispatch(damagePlayers({ [getOpponentName()]: speechcraft }))
    console.log(getOpponentName())
    console.log(damagePlayers({ [getOpponentName()]: speechcraft }))
    dispatch(nextTurn())
  }

  return (
    <div>
      <h1>{full_name}</h1>
      {renderAvatar[avatar]()}
      <Card>
        <Card.Body className="">
          <p>Speechcraft</p>
          <ProgressBar className="w-100 align-self-center" variant="warning" animated now={Math.max(0,speechcraft)} />
          <p>Credibility</p>
          <ProgressBar className="w-100 align-self-center" variant="danger" animated now={Math.max(0,credibility)} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Button onClick={handleArgue} variant="outline-warning" className="w-100 text-dark mb-1" disabled={active}>
            Argue{" "}
            <FontAwesomeIcon className="text-warning" icon={faAngry} size="lg" />
          </Button>
          <Button variant="outline-secondary" className="w-100 text-dark mb-1" disabled={active}>
            Defend{" "}
            <FontAwesomeIcon className="text-secondary" icon={faMehRollingEyes} size="lg" />
          </Button>
          <Button variant="outline-danger" className="w-100 text-dark mb-1" disabled={active}>
            Object!{" "}
            <FontAwesomeIcon className="text-danger" icon={faLaughSquint} size="lg" />
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Player
