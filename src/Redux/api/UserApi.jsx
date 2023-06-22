import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "user_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", getState().auth.token)
      return headers
    },
  }),
  endpoints: (builder) => ({
    // Sosial Links
    getUser: builder.mutation({
      query: (username) => ({ url: "/user/profile/" + username }),
    }),
    getContact: builder.mutation({
      query: (user_id) => ({ url: "/user/get-contact/" + user_id }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/master/user/update-card`,
        method: "POST",
        body,
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: `/master/user/update-password`,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useGetUserMutation,
  useUpdateUserMutation,
  useGetContactMutation,
  useUpdatePasswordMutation,
} = userApi
