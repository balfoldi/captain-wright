import React from 'react'
import Card from "react-bootstrap/Card"

import Objection from "../images/objection.png"
import Pheonix from "../images/Phoenix_Hands_on_Desk_1.gif"
import Mia from "../images/Mia.jpg"

const Presentation = () => {
  return (
    <>
      <h1 className="my-2">Takes the roles of defense attorneys and investigates cases and defends your clients in court!</h1>
      <div className="row container my-2">
        <div className="p-1 col-md-4">
          <Card className="h-100">
            <Card.Img variant="top" src={Objection} />
            <Card.Body className="d-flex flex-column-reverse">
              Object like a boss and show to the crowd who is the best lawyer of the court!
            </Card.Body>
          </Card>
        </div>
        <div className="p-1 col-md-4">
          <Card className="h-100">
            <Card.Img variant="top" src={Pheonix} />
            <Card.Body className="d-flex flex-column-reverse">
              Create the best lawyer ever created in the history of humanity!
            </Card.Body>
          </Card>
        </div>
        <div className="p-1 col-md-4">
          <Card className="h-100">
            <Card.Img variant="top" src={Mia} />
            <Card.Body className="d-flex flex-column-reverse">
              Feel all situations change as defense attorneys go more and more deep!
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Presentation
