import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import LawyerForm from './LawyerForm'

import { Pheonix, Mia } from "./Avatars"

import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { createPlayers } from "../redux"

import { colors, displays } from "../modules/playersObjects"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const LawyerCard = ({ fetchLawyer, freez, state = "idle", playerName = "left" }) => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [lawyer, setLawyer] = useState(fetchLawyer)
  const [selected, setSelected] = useState(false)
  const [active, setActive] = useState(false)
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    ["left", "right"].find(player_name => {
      if (fetchPlayersState[player_name].id === lawyer.id) {
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
    active && createPlayers({ [fetchPlayersState.turn]: lawyer })
  }, [lawyer])

  const setPlayerCreate = () => {
    dispatch(createPlayers({ [fetchPlayersState.turn]: lawyer }))
  }

  const renderAvatar = {
    mia: () => <Mia playerName={playerName} state={state} />,
    pheonix: () => <Pheonix playerName={playerName} state={state} />
  }

  const { avatar, full_name, speechcraft, credibility } = lawyer
  return (
    <>
      {lawyer.id && (
        <>
          <motion.div
            whileHover={!freez && { scale: 1.05 }}
            whileTap={!freez && { scale: 0.95 }}
          >
            <Card className={`m-2 shadow border-${selected ? colors[selected] : "secondary"}`} style={{ width: "16rem" }} onClick={!freez && setPlayerCreate}>
              {selected && <Card className={`text-light bg-${selected && colors[selected]} round position-absolute`} disabled={true}><h1>{displays[selected]}</h1></Card>}
              {renderAvatar[avatar]()}
              <Card.Body>
                <Card.Title>{full_name}</Card.Title>
                <ul>
                  <li>Speechcraft: {speechcraft}</li>
                  <li>Credibility: {credibility}</li>
                </ul>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-around">
                <Button onClick={() => setShowEdit(true)} className="w-100" disabled={!active} hidden={!active}><FontAwesomeIcon icon={faEdit} size="3x" /></Button>
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
