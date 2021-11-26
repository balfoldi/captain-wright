import React, { useState, useEffect } from 'react'

import LawyerCard from "../component/LawyerCard"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import LawyerForm from '../component/LawyerForm'

const LawyersIndex = () => {
  const [lawyers, setLawyers] = useState([])

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      <h1 className="text-center">Lawyers</h1>
      <Button className="fixed-bottom btn btn-success m-2" onClick={handleShow}>
        +
      </Button>
      <div className="d-flex flex-wrap justify-content-around">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <LawyerForm />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LawyersIndex
