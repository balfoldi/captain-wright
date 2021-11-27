import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from "react-redux";
import { updatePlayers, nextTurn } from "../redux"

import SpecialObjectCard from "../component/SpecialObjectCard"
import { colors, displays } from "../modules/playersObjects"

import specialObjects from "../modules/specialObjects"
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const SpecialObjectsChoice = () => {
  const dispatch = useDispatch()
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const [specialObjectsList, setSpecialObjectsList] = useState(specialObjects)
  const [canGoToCourtRoom, setCanGoToCourtRoom] = useState(false)

  const setPlayerSpecialObject = (specialObject) => {
    console.log(fetchPlayersState.turn)
    dispatch(updatePlayers({
      [fetchPlayersState.turn]: {
        ...fetchPlayersState[fetchPlayersState.turn],
        specialObjects: fetchPlayersState[fetchPlayersState.turn].specialObjects.concat(specialObject)
      }
    }))
    setSpecialObjectsList(specialObjectsList.filter(specialObjectFilter => specialObjectFilter.id !== specialObject.id))
    dispatch(nextTurn())
  }

  useEffect(() => {
    specialObjectsList.length <= 0 && setCanGoToCourtRoom(true)
  }, [specialObjectsList])

  useEffect(() => {
    console.log(specialObjectsList, specialObjectsList.length, specialObjectsList.length <= 0)
  }, [specialObjectsList])

  useEffect(() => {
    console.log(canGoToCourtRoom)
  }, [canGoToCourtRoom])

  return (
    <Container className="vh-100 pt-5">
      {!canGoToCourtRoom ? (
        <>
          <Card className="mb-5">
            <Card.Body>
              <h4 className="text-center"><strong className={`text-${colors[fetchPlayersState.turn]}`}>{displays[fetchPlayersState.turn]}</strong> choose one object</h4>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-around">
            {specialObjectsList.map(specialObject => (
              <div onClick={() => setPlayerSpecialObject(specialObject)}>
                <SpecialObjectCard key={specialObject.id} specialObject={specialObject} active={true} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="vh-100 d-flex flex-wrap justify-content-center">
          <Link to="/court/room">
            <Button variant="danger" className="align-self-center">
              GO TO COURT ROOM!
            </Button>
          </Link>
        </div>
      )}
    </Container>
  )
}

export default SpecialObjectsChoice
