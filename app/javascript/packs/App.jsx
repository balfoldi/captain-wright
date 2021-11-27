//modules
import React from 'react'
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { Routes, Route } from 'react-router-dom';

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//pages
import LawyersIndex from "./pages/LawyersIndex"
import Courtroom from "./pages/Courtroom"
import SpecialObjectsChoice from "./pages/SpecialObjectsChoice"

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
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Routes>
          <Route path="/court/lawyers" element={<LawyersIndex />} />
          <Route path="/court/special-objects-choice" element={<SpecialObjectsChoice />} />
          <Route path="/court/room" element={<Courtroom />} />
        </Routes>
      </AlertProvider>
    </Provider>
  );
};

export default App
