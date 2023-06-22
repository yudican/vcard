import React from "react"
import "antd/dist/antd.css"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { PrivateRoute } from "./HOC/PrivateRoute"
import Layout from "./Layout"
import PageNotFound from "./Pages/404"
import LoginView from "./Pages/Login"
import ProfileView from "./Pages/ProfileView"
import UpdateProfileView from "./Pages/UpdateProfileView"
import UpdatePassword from "./Pages/UpdatePassword"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfileView />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route path="/:name" element={<ProfileView />} />
      </Routes>
    </Layout>
  )
}

export default App
