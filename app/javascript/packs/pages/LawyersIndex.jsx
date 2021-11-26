import React, { useState, useEffect } from 'react'

import LawyerCard from "../component/LawyerCard"
import Button from "react-bootstrap/Button"
import LawyerForm from '../component/LawyerForm'

import { useDispatch, useSelector } from "react-redux";
import { nextTurn } from "../redux"

import { colors, displays } from "../modules/playersObjects"

import { Link } from 'react-router-dom';

const LawyersIndex = () => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [lawyers, setLawyers] = useState([])
  const [showNew, setShowNew] = useState(false);
  const dispatch = useDispatch();

  const fetchLawyers = () => {
    fetch("/api/lawyers")
      .then((response) => response.json())
      .then((response) => setLawyers(response))
  };

  useEffect(() => {
    fetchLawyers()
  }, [])

  return (
    <>
      <div className="text-center">
        <h1>Lawyers</h1>
        <i className="display-4"><strong className={`text-${colors[fetchPlayersState.turn]}`}>{displays[fetchPlayersState.turn]}</strong> choose your lawyer!</i>
      </div>
      <div className="fixed-bottom">
        <Button variant="primary" onClick={() => setShowNew(true)}>
          +
        </Button>
        {fetchPlayersState[fetchPlayersState.turn].id && (
          <Button variant="success" onClick={() => dispatch(nextTurn())}>
            Next player!
          </Button>
        )}
        {fetchPlayersState.left.id && fetchPlayersState.right.id && (
          <Link to="/court/room">
          <Button className="btn btn-danger m-2">
            Go to the courtroom
          </Button>
          </Link>
        )}
      </div>
      <div className="d-flex flex-wrap justify-content-around">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} fetchLawyer={lawyer} setLawyers={setLawyers} />
        ))}
      </div>
      <LawyerForm show={showNew} setShow={setShowNew} lawyers={lawyers}/>
    </>
  )
}

export default LawyersIndex
