import React, { useState, useEffect } from 'react'

import LawyerCard from "../component/LawyerCard"
import Button from "react-bootstrap/Button"
import LawyerForm from '../component/LawyerForm'

const LawyersIndex = () => {
  const [lawyers, setLawyers] = useState([])

  const [showNew, setShowNew] = useState(false);

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
      <Button className="fixed-bottom btn btn-success m-2" onClick={() => setShowNew(true)}>
        +
      </Button>
      <div className="d-flex flex-wrap justify-content-around">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
      <LawyerForm showNew={showNew} setShowNew={setShowNew} />
    </>
  )
}

export default LawyersIndex
