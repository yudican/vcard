import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  contactLinks: [],
  contactLink: null,
  modalVisible: false,
}

// 2. create reducer
export const ContactLinkReducer = createSlice({
  name: "contactLink",
  initialState,
  reducers: {
    setContactLinks: (state, { payload }) => {
      return {
        ...state,
        contactLinks: payload,
      }
    },
    setContactLink: (state, { payload }) => {
      return {
        ...state,
        contactLink: payload,
      }
    },
    setContactModalVisible: (state, { payload }) => {
      return {
        ...state,
        modalVisible: payload,
      }
    },
  },
})

// 1. create list action for each case
export const { setContactLinks, setContactLink, setContactModalVisible } =
  ContactLinkReducer.actions

// last export reducer
export default ContactLinkReducer.reducer
