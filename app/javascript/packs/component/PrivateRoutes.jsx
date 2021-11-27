
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);
  const storeIsPopulated = fetchPlayersState.left.id && fetchPlayersState.right.id;

  return storeIsPopulated ? children : <Navigate to="/court/lawyers" />;
};

export default PrivateRoute;
