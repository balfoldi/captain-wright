import React, { useState, useEffect } from 'react'

import LawyerCard from "../component/LawyerCard"
import LawyerForm from '../component/LawyerForm'
import CaseCard from '../component/CaseCard'
import Collapse from "react-bootstrap/Collapse"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"

import Button from "react-bootstrap/Button"

import { useDispatch, useSelector } from "react-redux";
import { nextTurn, deletePlayers } from "../redux"

import { colors, displays } from "../modules/playersObjects"

import { Link } from 'react-router-dom';

const LawyersIndex = () => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [lawyers, setLawyers] = useState([])
  const [cases, setCases] = useState([])
  const [showNew, setShowNew] = useState(false);
  const [openCasesHistory, setOpenCasesHistory] = useState(false)
  const dispatch = useDispatch();

  const fetchLawyers = () => {
    fetch("/api/lawyers")
      .then((response) => response.json())
      .then((response) => setLawyers(response))
  };

  const fetchCases = () => {
    fetch("/api/cases")
      .then((response) => response.json())
      .then((response) => setCases(response))
  };

  useEffect(() => {
    dispatch(deletePlayers())
    fetchLawyers()
    fetchCases()
  }, [])

  return (
    <>
      <h1 className="text-center">Lawyers</h1>
      <div className="fixed-top">
        <Navbar bg="light" expand="lg">
          <Container>
            <i className="mr-5"><strong className={`text-${colors[fetchPlayersState.turn]}`}>{displays[fetchPlayersState.turn]}</strong> choose your lawyer!</i>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="d-flex justify-content-around w-100">
                <Button variant="primary" onClick={() => setShowNew(true)}>
                  Add a lawyer
                </Button>
                <Button
                  onClick={() => setOpenCasesHistory(!openCasesHistory)}
                  aria-controls="example-collapse-text"
                  aria-expanded={openCasesHistory}
                >
                  View cases history
                </Button>
                <Button variant="success" onClick={() => dispatch(nextTurn())} disabled={!fetchPlayersState[fetchPlayersState.turn].id}>
                  Next player
                </Button>
                {fetchPlayersState.left.id && fetchPlayersState.right.id ? (
                  <Link to="/court/special-objects-choice">
                    <Button variant="danger">
                      Go to court!
                    </Button>
                  </Link>
                ) : (
                  <Button variant="secondary" disabled>
                    Player {displays[fetchPlayersState.turn]} choose your lawyer !
                  </Button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Collapse in={openCasesHistory} dimension="width">
          <div id="example-collapse-text" className="overflow-auto vh-100 w-50 pb-5 bg-light ">
            <Container>
              <div className="d-flex flex-column justify-content-center">
                {cases.map(caseResult => (
                  <CaseCard key={caseResult.id} caseResult={caseResult} lawyers={lawyers} />
                ))}
              </div>
            </Container>
          </div>
        </Collapse>
      </div>
      <div className="d-flex flex-wrap justify-content-around mt-5 pt-2">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} fetchLawyer={lawyer} />
        ))}
      </div>
      <LawyerForm show={showNew} setShow={setShowNew} lawyers={lawyers} />
    </>
  )
}

export default LawyersIndex
