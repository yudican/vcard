import React from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
export const PrivateRoute = ({ children, auth = true }) => {
  const { token } = useSelector((state) => state.auth)
  let location = useLocation()
  if (auth) {
    if (!token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  } else {
    if (token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />
    }
  }

  return children
}
