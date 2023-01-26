import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../app/Provider";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

export const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useContext(AppContext); //Global state
  const navigate = useNavigate();

  const token2 = document.cookie.replace("token=", "");
  async function x() {
    const response = await fetch(
      "http://127.0.0.1:5005/api/users/verifytoken",
      {
        method: "POST",
        headers: {
          authorization: token2,
          // authorization: "token2",
        },
      }
    );

    if (response.status === 403) {
      // return <Navigate to="/" replace />;
      // console.log("token no autorizado");
      localStorage.removeItem("isAuth");
      Swal.fire("Error 403!", "The user must log in", "error");

      console.log(response.status + ": The user must log in");
    }
  }
  x();

  if (localStorage.getItem("isAuth") !== "token=" + token2) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
