
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ condition, component: ChildComponent, ...otherProps }) => {
  const fetchPlayersState = useSelector((state) => state.playersCreate);

  return (
    <Route
      {...otherProps}
      render={(props) =>
        fetchPlayersState.left.id && fetchPlayersState.right.id ? (
          <ChildComponent {...props} />
        ) : (
          <Redirect to="/court/lawyers" />
        )
      }
    />
  );
};

export default PrivateRoute;
