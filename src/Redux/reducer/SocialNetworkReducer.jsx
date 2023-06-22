import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  socialNetworks: [],
  socialNetwork: null,
  modalVisible: false,
}

// 2. create reducer
export const SocialNetworkReducer = createSlice({
  name: "socialNetwork",
  initialState,
  reducers: {
    setSocialNetworks: (state, { payload }) => {
      return {
        ...state,
        socialNetworks: payload,
      }
    },
    setSocialNetwork: (state, { payload }) => {
      return {
        ...state,
        socialNetwork: payload,
      }
    },
    setSocialNetworkModalVisible: (state, { payload }) => {
      return {
        ...state,
        modalVisible: payload,
      }
    },
  },
})

// 1. create list action for each case
export const {
  setSocialNetworks,
  setSocialNetwork,
  setSocialNetworkModalVisible,
} = SocialNetworkReducer.actions

// last export reducer
export default SocialNetworkReducer.reducer
