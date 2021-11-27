import React, { useState, useEffect } from 'react'

import Player from "../component/Player"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

import LawyerCard from '../component/LawyerCard';

import { useSelector } from "react-redux";

import { Link } from 'react-router-dom';

const Courtroom = () => {
  const [statePlayerLeft, setStatePlayerLeft] = useState("idle")
  const [statePlayerRight, setStatePlayerRight] = useState("idle")

  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [showEnd, setShowEnd] = useState(false)
  const [levelUp, setLevelUp] = useState(false)
  const [caseResult, setCaseResult] = useState({
    winner: null,
    looser: null
  })

  const fetchCaseCreate = ({ winner, looser }) => {
    const data = { winner_id: winner.id, looser_id: looser.id }
    fetch("/api/cases", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => setShowEnd(true))
  }

  const fetchSetLawyerExperience = ({ winner, looser }) => {
    const data = { experience: winner.experience + looser.speechcraft }
    fetch("/api/lawyers/" + winner.id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        response.level != winner.level && setLevelUp(true)
        setCaseResult({
          looser,
          winner: response,
        })
      })
  }

  const fetchLevelUpStatistic = (statistic) => {
    const data = { [statistic]: caseResult.winner[statistic] + 10 }
    console.log(data, caseResult.winner[statistic], statistic)
    fetch("/api/lawyers/" + caseResult.winner.id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setCaseResult({
          looser: caseResult.looser,
          winner: response,
        })
        setLevelUp(false)
      })
  }

  useEffect(() => {
    if (fetchPlayersState.left.credibility <= 0 || fetchPlayersState.right.credibility <= 0) {
      const winner = statePlayerLeft === "defeated" ? fetchPlayersState.right : fetchPlayersState.left
      const looser = statePlayerLeft === "defeated" ? fetchPlayersState.left : fetchPlayersState.right
      setCaseResult({ winner, looser })
      fetchSetLawyerExperience({ winner, looser })
      fetchCaseCreate({ winner, looser })
    }
  }, [fetchPlayersState])

  useEffect(() => {
    console.log(caseResult)
  }, [caseResult])

  return (
    <div className="d-flex justify-content-around">
      <div className="row">
        <div className="col-md-6">
          <Player playerName={"left"} state={statePlayerLeft} setState={setStatePlayerLeft} />
        </div>
        <div className="col-md-6">
          <Player playerName={"right"} state={statePlayerRight} setState={setStatePlayerRight} />
        </div>
      </div>
      <Modal show={showEnd}>
        <Modal.Header>
          <h1>Winner</h1>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <LawyerCard forceLawyer={caseResult.winner} freez={true} levelUp={levelUp} setLevelUp={setLevelUp} state="speak" />
        </Modal.Body>
        <Modal.Footer>
          {levelUp ? (
            <div className="w-100 text-center">
              <h4>
                Lawyer leveled up!
              </h4>
              <i>
                Choose one statistic to level up!
              </i>
              <div className="d-flex justify-content-around">
                <Button variant="success" onClick={() => fetchLevelUpStatistic("speechcraft")}>
                  + Speechcraft
                </Button>
                <Button variant="success" onClick={() => fetchLevelUpStatistic("credibility")}>
                  + Credibility
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/court/lawyers">
              <Button variant="success">
                New game
              </Button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Courtroom
