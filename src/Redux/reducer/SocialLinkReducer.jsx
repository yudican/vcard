import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  socialLinks: [],
  socialLink: null,
  modalVisible: false,
}

// 2. create reducer
export const SocialLinkReducer = createSlice({
  name: "socialLink",
  initialState,
  reducers: {
    setSocialLinks: (state, { payload }) => {
      return {
        ...state,
        socialLinks: payload,
      }
    },
    setSocialLink: (state, { payload }) => {
      return {
        ...state,
        socialLink: payload,
      }
    },
    setModalVisible: (state, { payload }) => {
      return {
        ...state,
        modalVisible: payload,
      }
    },
  },
})

// 1. create list action for each case
export const { setSocialLinks, setSocialLink, setModalVisible } =
  SocialLinkReducer.actions

// last export reducer
export default SocialLinkReducer.reducer
