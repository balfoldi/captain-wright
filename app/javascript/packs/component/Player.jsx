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
  updatePlayers,
  nextTurn
} from "../redux"

import { Pheonix, Mia } from "./Avatars"

const Player = ({ playerName }) => {
  const dispatch = useDispatch();
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [state, setState] = useState("idle")
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(fetchPlayersState.turn === playerName && fetchPlayersState[playerName].credibility > 0)
    fetchPlayersState[playerName].credibility <= 0 && handleDefeat()
  }, [fetchPlayersState])

  const renderAvatar = {
    mia: () => <Mia playerName={playerName} state={state} />,
    pheonix: () => <Pheonix playerName={playerName} state={state} />
  }

  const opponentName = ["left", "right"].find(name => name !== playerName)


  const { avatar, full_name, speechcraft, credibility } = fetchPlayersState[playerName]

  const handleArgue = () => {
    setState("speak")
    dispatch(updatePlayers({
      [opponentName]: {
        ...fetchPlayersState[opponentName],
        credibility: fetchPlayersState[opponentName].credibility - speechcraft
      }
    }))
    dispatch(nextTurn())
  }

  const handleDefend = () => {
    setState("defend")
    dispatch(updatePlayers({
      [playerName]: {
        ...fetchPlayersState[playerName],
        credibility: Math.min(100,fetchPlayersState[playerName].credibility + 50)
      }
    }))
    dispatch(nextTurn())
  }

  const handleObjection = () => {
    setState("object")
    dispatch(updatePlayers({
      [playerName]: {
        ...fetchPlayersState[playerName],
        speechcraft: Math.min(100,fetchPlayersState[playerName].speechcraft + 20)
      }
    }))
    dispatch(nextTurn())
  }

  const handleDefeat = () => {
    setState("defeated")
    setActive(false)
  }

  return (
    <div>
      <h1>{full_name}</h1>
      {renderAvatar[avatar]()}
      <Card>
        <Card.Body className="">
          <p>Speechcraft</p>
          <ProgressBar className="w-100 align-self-center" variant="warning" animated now={Math.max(0, speechcraft)} />
          <p>Credibility</p>
          <ProgressBar className="w-100 align-self-center" variant="danger" animated now={Math.max(0, credibility)} />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Button onClick={handleArgue} variant="outline-warning" className="w-100 text-dark mb-1" disabled={!active}>
            Argue{" "}
            <FontAwesomeIcon className="text-warning" icon={faAngry} size="lg" />
          </Button>
          <Button onClick={handleDefend} variant="outline-secondary" className="w-100 text-dark mb-1" disabled={!active}>
            Defend{" "}
            <FontAwesomeIcon className="text-secondary" icon={faMehRollingEyes} size="lg" />
          </Button>
          <Button onClick={handleObjection} variant="outline-danger" className="w-100 text-dark mb-1" disabled={!active}>
            Objection!{" "}
            <FontAwesomeIcon className="text-danger" icon={faLaughSquint} size="lg" />
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Player
