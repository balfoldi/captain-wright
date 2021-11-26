import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'

import mia from '../../images/avatars/mia/miaIdle.gif'
import pheonix from '../../images/avatars/pheonix/pheonixIdle.gif'

import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { createPlayers } from "../redux"


const LawyerCard = ({ lawyer }) => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [selected, setSelected] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    ["left", "right"].find(player_name => {
      if(fetchPlayersState[player_name].id === lawyer.id){
        setSelected(player_name)
        return true
      }else{
        setSelected(false)
      }
    })
  }, [fetchPlayersState])

  useEffect(() => {
    console.log(selected)
  }, [selected])

  const gifs = {
    pheonix,
    mia
  }

  const colors = {
    left: "success",
    right: "primary",
  }

  const display = {
    left: "P1",
    right: "P2",
  }

  const setPlayerCreate = () => {
    dispatch(createPlayers({ [fetchPlayersState.turn]: lawyer }))
  }

  const { avatar, full_name, speechcraft, credibility } = lawyer
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className={`m-2 shadow border-${selected ? colors[selected] : "secondary"}`} style={{ width: "16rem" }} onClick={setPlayerCreate}>
        {selected && <Card className={`text-light bg-${selected && colors[selected]} round position-absolute`} disabled={true}><h1>{display[selected]}</h1></Card>}
        <Card.Img src={gifs[avatar]} />
        <Card.Body>
          <Card.Title>{full_name}</Card.Title>
          <ul>
            <li>Speechcraft: {speechcraft}</li>
            <li>Credibility: {credibility}</li>
          </ul>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default LawyerCard
