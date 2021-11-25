//modules
import React, { useEffect } from 'react'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { Routes, Route } from 'react-router-dom';

import LawyersIndex from "./pages/LawyersIndex"
import Courtroom from "./pages/Courtroom"

const App = () => {
  // let location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [location])

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Routes>
        <Route path="/court/lawyers" element={<LawyersIndex />} />
        <Route path="/court/room" element={<Courtroom />} />
      </Routes>
    </AlertProvider>
  );
};

export default App
