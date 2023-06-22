import { createSlice } from "@reduxjs/toolkit"

const userData = localStorage.getItem("user")
const initialState = {
  status: "completed",
  message: null,
  user: userData === "undefined" ? null : JSON.parse(userData),
  token: localStorage.getItem("auth_token"),
}

// 2. create reducer
export const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload))
      return {
        ...state,
        user: payload,
      }
    },
    setToken: (state, { payload }) => {
      localStorage.setItem("auth_token", payload)
      return {
        ...state,
        token: payload,
      }
    },
  },
})

// 1. create list action for each case
export const { setUser, setToken } = AuthReducer.actions

// last export reducer
export default AuthReducer.reducer
