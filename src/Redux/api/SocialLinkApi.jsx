import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const socialLinkApi = createApi({
  reducerPath: "social_link_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", getState().auth.token)
      return headers
    },
  }),
  endpoints: (builder) => ({
    // Sosial Links
    getLinks: builder.query({
      query: () => ({ url: "/master/social-link" }),
    }),
    getAllLinks: builder.mutation({
      query: () => ({ url: "/master/social-link" }),
    }),
    addLink: builder.mutation({
      query: (body) => ({ url: "/master/social-link", method: "POST", body }),
    }),
    updateLink: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/master/social-link/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteLink: builder.mutation({
      query: (id) => ({
        url: `/master/social-link/${id}`,
        method: "POST",
        body: { _method: "DELETE" },
      }),
    }),
  }),
})

export const {
  useGetLinksQuery,
  useGetAllLinksMutation,
  useAddLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
} = socialLinkApi
