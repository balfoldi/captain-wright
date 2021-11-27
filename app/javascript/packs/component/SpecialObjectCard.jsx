import React from 'react'

import Card from 'react-bootstrap/Card'

import { motion } from 'framer-motion'

const SpecialObjectCard = ({ specialObject, active }) => {
  const { name, image, setStats, used } = specialObject
  return (
    <motion.div
      whileHover={active && !used && { scale: 1.05 }}
      whileTap={active && !used && { y: 100 }}
    >
      <Card className={`${used ? "bg-secondary" : ""}`} style={{ width: "15rem" }} className>
        <Card.Img className={`${used ? "opacity-0" : ""}`} variant="top" src={image} style={{ height: "15rem" }} />
        <Card.Body>
          <Card.Title>
            {name}
          </Card.Title>
          <hr />
          <h3>Effects</h3>
          {Object.keys(setStats).map((key, idx) => (
            <p key={idx}>Set opponent <strong>{key}</strong> to {setStats[key]}%</p>
          ))}
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default SpecialObjectCard
