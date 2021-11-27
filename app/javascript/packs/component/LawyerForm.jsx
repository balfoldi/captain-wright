import React, { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"

import mia from '../../images/avatars/mia/miaIdle.gif'
import pheonix from '../../images/avatars/pheonix/pheonixIdle.gif'

import { useAlert } from 'react-alert'

const LawyerForm = ({ lawyer = {}, setLawyer, show, setShow, lawyers }) => {
  const alert = useAlert()
  const [showDelete, setShowDelete] = useState(false)
  const [errors, setErrors] = useState(null)
  const { avatar, full_name, speechcraft, credibility } = lawyer
  const stats = ["speechcraft", "credibility"]
  const gifs = {
    pheonix,
    mia
  }

  useEffect(() => {
    showDelete && setShow(false)
  }, [showDelete])

  const [input, setInput] = useState({
    avatar: avatar || "pheonix",
    full_name: full_name || "titi",
    speechcraft: speechcraft || 50,
    credibility: credibility || 60,
  })

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

  const fetchDelete = () => {
    fetch("/api/lawyers/" + lawyer.id, { method: "DELETE" })
      .then(() => {
        setLawyer({})
        setShowDelete(false)
        alert.show(`Lawyer ${input.full_name} deletion success`, { type: "success" })
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    lawyer.id ? fetchUpdate() : fetchCreate()
  }

  const fetchCreate = () => {
    console.log("CREATE", JSON.stringify(input))
    fetch("/api/lawyers", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          return (handleError(response))
        } else {
          lawyers.unshift(response)
          setShow(false)
          alert.show(`Lawyer ${input.full_name} creation success`, { type: "success" })
        }
      })
  }

  const fetchUpdate = () => {
    fetch("/api/lawyers/" + lawyer.id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lawyer: input }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errors) {
          return (handleError(response))
        } else {
          setLawyer(response)
          setShow(false)
          alert.show(`Lawyer ${input.full_name} update success`, { type: "success" })
        }
      })
  }

  const handleError = (response) => {
    setErrors(response.errors)
  }

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{lawyer.id ? "Update" : "Create"} a lawyer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-center">
                <img src={gifs[input.avatar]} />
              </div>
              <Form.Label>Avatar</Form.Label>
              <Form.Select aria-label="Default select example" onChange={handleInputChange} name="avatar" value={input.avatar}>
                <option value="pheonix">Pheonix</option>
                <option value="mia">Mia</option>
                <option value="miles">Miles</option>
                <option value="franziska">Franziska</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="name" placeholder="Pheonix Wright" onChange={handleInputChange} name="full_name" value={input.full_name} />
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
                <Button variant="primary ml-1" type="submit" onClick={(event) => { increment("speechcraft", event) }} disabled={input.speechcraft >= 100}>
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
                <Button variant="primary ml-1" type="submit" onClick={(event) => { increment("credibility", event) }} disabled={input.credibility >= 100}>
                  +
                </Button>
              </div>
              <Form.Text className="text-muted">
                Case is lost when reach 0.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-around">
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            {lawyer.id && <Button variant="warning" onClick={() => setShowDelete(true)}>
              Delete
            </Button>}
            <Button variant="success" type="submit">
              Submit
            </Button>
            {errors && <Alert variant="danger" onClose={() => setErrors(null)} dismissible>
              {errors.map(error => <Alert.Heading>{error}</Alert.Heading>)}
            </Alert>
            }
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete}>
        <Modal.Header>
          <i>Are you sure to delete this lawyer?</i>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={fetchDelete}>
            Yes
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LawyerForm
