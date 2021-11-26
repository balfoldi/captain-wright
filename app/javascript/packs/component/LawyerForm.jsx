import React, { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import ProgressBar from 'react-bootstrap/ProgressBar'

import mia from '../../images/avatars/mia/miaIdle.gif'
import pheonix from '../../images/avatars/pheonix/pheonixIdle.gif'

import "../../stylesheets/square"

const LawyerForm = ({ lawyer = {} }) => {
  const { avatar, full_name, speechcraft, credibility } = lawyer
  const stats = ["speechcraft", "credibility"]
  const gifs = {
    pheonix,
    mia
  }

  const [input, setInput] = useState({
    avatar: avatar || "pheonix",
    full_name,
    speechcraft: speechcraft || 50,
    credibility: credibility || 60,
  })

  useEffect(() => {
    console.log(input)
  }, [input])

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const increment = (attribute, event) => {
    const statToBalance = stats.find(stat => stat != attribute)
    event.preventDefault()
    setInput({
      ...input,
      [attribute]: input[attribute] + 10,
      [statToBalance]: input[statToBalance] - 10
    })
  }

  const decrement = (attribute, event) => {
    const statToBalance = stats.find(stat => stat != attribute)
    event.preventDefault()
    setInput({
      ...input,
      [attribute]: input[attribute] - 10,
      [statToBalance]: input[statToBalance] + 10
    })
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <div className="d-flex justify-content-center">
          <img src={gifs[input.avatar]} />
        </div>
        <Form.Select aria-label="Default select example" onChange={handleInputChange} name="avatar">
          <option value="pheonix">Pheonix</option>
          <option value="mia">Mia</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Full name</Form.Label>
        <Form.Control type="name" placeholder="Pheonix Wright" onChange={handleInputChange} name="full_name" />
        <Form.Text className="text-muted">
          Must be unique
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Speechcraft</Form.Label>
        <div className="d-flex">
          <Button variant="secondary mr-1" type="submit" onClick={(event) => { decrement("speechcraft", event) }} disabled={input.speechcraft <= 10}>
            -
          </Button>
          <ProgressBar className="w-100 align-self-center" variant="warning" animated now={input.speechcraft} />
          <Button variant="success ml-1" type="submit" onClick={(event) => { increment("speechcraft", event) }} disabled={input.speechcraft >= 100}>
            +
          </Button>
        </div>
        <Form.Text className="text-muted">
          Determine the damages to credibility.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Credibility</Form.Label>
        <div className="d-flex">
          <Button variant="secondary mr-1" type="submit" onClick={(event) => { decrement("credibility", event) }} disabled={input.credibility <= 10}>
            -
          </Button>
          <ProgressBar className="w-100 align-self-center" variant="danger" animated now={input.credibility} />
          <Button variant="success ml-1" type="submit" onClick={(event) => { increment("credibility", event) }} disabled={input.credibility >= 100}>
            +
          </Button>
        </div>
        <Form.Text className="text-muted">
          Case is lost when reach 0.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LawyerForm
