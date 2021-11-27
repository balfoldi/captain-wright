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

import { Pheonix, Mia, Miles, Franziska } from "./Avatars"
import ObjectionSprite from "../../images/ObjectionSprite.png"
import SpecialObjectCard from './SpecialObjectCard';
import { motion } from 'framer-motion';

const Player = ({ playerName, state, setState }) => {
  const dispatch = useDispatch();
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [active, setActive] = useState(false)
  const [animating, setAnimating] = useState("initial");
  const objectionAnimation = {
    initial: {},
    fade_in: { x: [-20, 0], opacity: [0, 1] },
    fade_out: { x: [0, 20], opacity: [1, 0] },
  };

  useEffect(() => {
    setActive(fetchPlayersState.turn === playerName && fetchPlayersState[playerName].credibility > 0)
    fetchPlayersState[playerName].credibility <= 0 && handleDefeat()
  }, [fetchPlayersState])

  const renderAvatar = {
    mia: () => <Mia playerName={playerName} state={state} />,
    pheonix: () => <Pheonix playerName={playerName} state={state} />,
    franziska: () => <Franziska playerName={playerName} state={state} />,
    miles: () => <Miles playerName={playerName} state={state} />,
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
        credibility: Math.min(100, fetchPlayersState[playerName].credibility + 50)
      }
    }))
    dispatch(nextTurn())
  }

  const handleObjection = () => {
    setState("object")
    setAnimating("fade_in");
    setTimeout(() => {
      setAnimating("fade_out");
    }, 500);
    dispatch(updatePlayers({
      [playerName]: {
        ...fetchPlayersState[playerName],
        speechcraft: Math.min(100, fetchPlayersState[playerName].speechcraft + 50)
      }
    }))
    dispatch(nextTurn())
  }

  const handleSpecialObject = (specialObject) => {
    setState("idle")
    const useASpecialObject = (specialObjectFilter) => (
      specialObjectFilter.id !== specialObject.id ? specialObjectFilter : { ...specialObjectFilter, used: true }
    )
    dispatch(updatePlayers({
      [playerName]: {
        ...fetchPlayersState[playerName],
        specialObjects: fetchPlayersState[playerName].specialObjects.map(useASpecialObject),
      },
      [opponentName]: {
        ...fetchPlayersState[opponentName],
        ...specialObject.setStats
      }
    }))
    dispatch(nextTurn())
  }

  const handleDefeat = () => {
    setState("defeated")
    setActive(false)
  }

  const sprits = [
    renderAvatar[avatar](),
    <motion.div
      animate={animating}
      variants={objectionAnimation}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card.Img className="img-fluid" src={ObjectionSprite} style={{ height: "10em", width: "15em" }} />
    </motion.div>,
  ]

  return (
    <div className="vh-100">
      <div className="d-flex justify-content-around">
        {playerName === "left" ? sprits : sprits.reverse()}
      </div>
      <h1 className="text-light text-center w-100">{full_name}</h1>
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
            Tell the truth{" "}
            <FontAwesomeIcon className="text-warning" icon={faAngry} size="lg" />
          </Button>
          <Button onClick={handleDefend} variant="outline-secondary" className="w-100 text-dark mb-1" disabled={!active}>
            Lie{" "}
            <FontAwesomeIcon className="text-secondary" icon={faMehRollingEyes} size="lg" />
          </Button>
          <Button onClick={handleObjection} variant="outline-danger" className="w-100 text-dark mb-1" disabled={!active}>
            Objection!{" "}
            <FontAwesomeIcon className="text-danger" icon={faLaughSquint} size="lg" />
          </Button>
        </Card.Body>
        <Card.Footer >
          <i>Special objects</i>
          <div className="d-flex justify-content-around mt-1">
            {fetchPlayersState[playerName].specialObjects.map(specialObject => (
              <div key={specialObject.id} className="d-flex flex-wrap mt-1" onClick={() => active && !specialObject.used && handleSpecialObject(specialObject)}>
                <SpecialObjectCard specialObject={specialObject} active={active} />
              </div>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default Player
