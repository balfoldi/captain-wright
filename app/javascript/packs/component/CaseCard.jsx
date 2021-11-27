import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import LawyerForm from './LawyerForm'

import mia from '../../images/avatars/mia/miaIdle.gif'
import pheonix from '../../images/avatars/pheonix/pheonixIdle.gif'

import { motion } from "framer-motion"

import { useDispatch, useSelector } from "react-redux";
import { createPlayers } from "../redux"

import { colors, displays } from "../modules/playersObjects"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faPoo } from "@fortawesome/free-solid-svg-icons";


import LawyerCard from './LawyerCard'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const CaseCard = ({ caseResult, lawyers }) => {
  const winner = lawyers.find(lawyer => lawyer.id === caseResult.winner_id)
  const looser = lawyers.find(lawyer => lawyer.id === caseResult.looser_id)


  return (
    <>
      {winner && looser && (
        <Card className="m-3">
          <CardHeader className="text-center">
            Case #{caseResult.id}
          </CardHeader>
          <div className="row">
            <div className="col-6">
              <div className="d-flex justify-content-around" >
                <FontAwesomeIcon className="text-warning" icon={faCrown} size="3x" />
                <h3>Winner</h3>
                <FontAwesomeIcon className="text-warning" icon={faCrown} size="3x" />
              </div>
              <div className="d-flex justify-content-center">
                <LawyerCard fetchLawyer={winner} playerName="left" freez />
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-around" >
                <FontAwesomeIcon className="text-secondary" icon={faPoo} size="3x" />
                <h3>Looser</h3>
                <FontAwesomeIcon className="text-secondary" icon={faPoo} size="3x" />
              </div>
              <div className="d-flex justify-content-center">
                <LawyerCard fetchLawyer={looser} playerName="right" freez />
              </div>
            </div>
          </div>
        </Card>
      )
      }
    </>
  )
}

export default CaseCard
