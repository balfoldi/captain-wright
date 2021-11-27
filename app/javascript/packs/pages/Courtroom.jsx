import React, { useState, useEffect } from 'react'

import Player from "../component/Player"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

import LawyerCard from '../component/LawyerCard';

import { useDispatch, useSelector } from "react-redux";
import { nextTurn } from "../redux"

import { colors, displays } from "../modules/playersObjects"
import { Link } from 'react-router-dom';

const Courtroom = () => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [showEnd, setShowEnd] = useState(false)
  const [winner, setWinner] = useState({})

  useEffect(() => {
    if (fetchPlayersState.left.credibility <= 0 || fetchPlayersState.right.credibility <= 0) {
      setShowEnd(true)
      console.log("END")
      setWinner(fetchPlayersState.left.credibility <= 0 ? fetchPlayersState.right : fetchPlayersState.left)
    }
  }, [fetchPlayersState])

  return (
    <div className="d-flex justify-content-around">
      <Player playerName={"left"} />
      <Player playerName={"right"} />
      <Modal show={showEnd}>
        <Modal.Header>
          <h1>Winner</h1>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <LawyerCard fetchLawyer={winner} freez={true}/>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/court/lawyers">
            <Button variant="success">
              New game
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Courtroom
