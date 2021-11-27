import React, { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import ProgressBar from "react-bootstrap/ProgressBar"

import LawyerForm from './LawyerForm'

import { Pheonix, Mia } from "./Avatars"

import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { createPlayers } from "../redux"

import { colors, displays } from "../modules/playersObjects"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const LawyerCard = ({ fetchLawyer, forceLawyer, freez, state = "idle", playerName = "left" }) => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [lawyer, setLawyer] = useState(fetchLawyer)
  const [selected, setSelected] = useState(false)
  const [active, setActive] = useState(false)
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  const { id, avatar, full_name, speechcraft, credibility, experience, level, victory_ratio } = fetchLawyer ? lawyer : forceLawyer

  useEffect(() => {
    ["left", "right"].find(player_name => {
      if (fetchPlayersState[player_name].id === id) {
        setSelected(player_name)
        return true
      } else {
        setSelected(false)
      }
    })
  }, [fetchPlayersState])

  useEffect(() => {
    setActive(selected === fetchPlayersState.turn)
  }, [selected, fetchPlayersState])

  useEffect(() => {
    active && !freez && createPlayers({ [fetchPlayersState.turn]: lawyer })
  }, [lawyer])

  const setPlayerCreate = () => {
    dispatch(createPlayers({ [fetchPlayersState.turn]: lawyer }))
  }

  const renderAvatar = {
    mia: () => <Mia playerName={playerName} state={state} />,
    pheonix: () => <Pheonix playerName={playerName} state={state} />
  }

  return (
    <>
      {id && (
        <>
          <motion.div
            whileHover={!freez && { scale: 1.05 }}
            whileTap={!freez && { scale: 0.95 }}
          >
            <Card className={`m-2 shadow border-${selected ? colors[selected] : "secondary"}`} style={{ width: "16rem" }} onClick={!freez ? setPlayerCreate : () => {}}>
              {selected && <Card className={`text-light bg-${selected && colors[selected]} round position-absolute`} disabled={true}><h1>{displays[selected]}</h1></Card>}
              {renderAvatar[avatar]()}
              <Card.Body>
                <Card.Title>{full_name}</Card.Title>
                <p>level: {level} </p>
                <ProgressBar className="w-100 align-self-center" variant="primary" animated now={experience} />
                <p>Experience</p>
                <ProgressBar className="w-100 align-self-center" variant="info" animated now={victory_ratio} />
                <p>Victory ratio</p>
                <ProgressBar className="w-100 align-self-center" variant="warning" animated now={speechcraft} />
                <p>Speechcraft</p>
                <ProgressBar className="w-100 align-self-center" variant="danger" animated now={credibility} />
                <p>Credibility</p>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-around">
                <Button onClick={() => setShowEdit(true)} className="w-100" disabled={!active || freez} hidden={!active || freez}><FontAwesomeIcon icon={faEdit} size="3x" /></Button>
              </Card.Footer>
            </Card>
          </motion.div>
        </>
      )}
      <LawyerForm lawyer={lawyer} setLawyer={setLawyer} show={showEdit} setShow={setShowEdit} />
    </>
  )
}

export default LawyerCard
