import React, { useState, useEffect } from 'react'

import LawyerCard from "../component/LawyerCard"
import LawyerForm from '../component/LawyerForm'
import CaseCard from '../component/CaseCard'
import Collapse from "react-bootstrap/Collapse"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
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
            <i className="display-4 text-center"><strong className={`text-${colors[fetchPlayersState.turn]}`}>{displays[fetchPlayersState.turn]}</strong> choose your lawyer!</i>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
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
                <Button
                  onClick={() => setOpenCasesHistory(!openCasesHistory)}
                  aria-controls="example-collapse-text"
                  aria-expanded={openCasesHistory}
                >
                  View cases history
                </Button>
              </Nav>
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
      <div className="d-flex flex-wrap justify-content-around">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} fetchLawyer={lawyer} />
        ))}
      </div>
      <LawyerForm show={showNew} setShow={setShowNew} lawyers={lawyers} />
    </>
  )
}

export default LawyersIndex
