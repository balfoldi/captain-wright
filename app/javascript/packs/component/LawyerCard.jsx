import React from 'react'
import Card from 'react-bootstrap/Card'
import mia from '../../images/avatars/mia/miaIdle.gif'
import pheonix from '../../images/avatars/pheonix/pheonixIdle.gif'


const LawyerCard = ({ lawyer }) => {
  const gifs = {
    pheonix,
    mia
  }

  const { avatar, full_name, speechcraft, credibility } = lawyer
  return (
    <Card className="m-2 shadow" style={{ width: "16rem" }}>
      <Card.Img src={gifs[avatar]}/>
      <Card.Body>
        <Card.Title>{full_name}</Card.Title>
        <ul>
          <li>Speechcraft: {speechcraft}</li>
          <li>Credibility: {credibility}</li>
        </ul>
      </Card.Body>
    </Card>
  )
}

export default LawyerCard
