import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const contactLinkApi = createApi({
  reducerPath: "contact_link_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", getState().auth.token)
      return headers
    },
  }),
  endpoints: (builder) => ({
    // Sosial Links
    getContactLinks: builder.query({
      query: () => ({ url: "/master/contact-info" }),
    }),
    getAllContactLinks: builder.mutation({
      query: () => ({ url: "/master/contact-info" }),
    }),
    addContactLink: builder.mutation({
      query: (body) => ({ url: "/master/contact-info", method: "POST", body }),
    }),
    updateContactLink: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/master/contact-info/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteContactLink: builder.mutation({
      query: (id) => ({
        url: `/master/contact-info/${id}`,
        method: "POST",
        body: { _method: "DELETE" },
      }),
    }),
  }),
})

export const {
  useGetContactLinksQuery,
  useGetAllContactLinksMutation,
  useAddContactLinkMutation,
  useUpdateContactLinkMutation,
  useDeleteContactLinkMutation,
} = contactLinkApi
