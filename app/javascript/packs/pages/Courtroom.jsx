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
  const [statePlayerLeft, setStatePlayerLeft] = useState("idle")
  const [statePlayerRight, setStatePlayerRight] = useState("idle")

  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [showEnd, setShowEnd] = useState(false)
  const [caseResult, setCaseResult] = useState({
    winner: null,
    looser: null
  })

  const fetchCaseCreate = () => {
    const data = { winner_id: caseResult.winner.id, looser_id: caseResult.looser.id }
    fetch("/api/cases", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => setShowEnd(true))
  }

  useEffect(() => {
    if (fetchPlayersState.left.credibility <= 0 || fetchPlayersState.right.credibility <= 0) {
      setCaseResult({
        winner: statePlayerLeft === "defeated" ? fetchPlayersState.right : fetchPlayersState.left,
        looser: statePlayerLeft === "defeated" ? fetchPlayersState.left : fetchPlayersState.right
      })
    }
  }, [fetchPlayersState])

  useEffect(() => {
    caseResult.winner && caseResult.looser && fetchCaseCreate()
  }, [caseResult])

  return (
    <div className="d-flex justify-content-around">
      <Player playerName={"left"} state={statePlayerLeft} setState={setStatePlayerLeft} />
      <Player playerName={"right"} state={statePlayerRight} setState={setStatePlayerRight} />
      <Modal show={showEnd}>
        <Modal.Header>
          <h1>Winner</h1>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <LawyerCard fetchLawyer={caseResult.winner} freez={true} />
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
