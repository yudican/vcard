import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const socialNetworkApi = createApi({
  reducerPath: "social_network_api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", getState().auth.token)
      return headers
    },
  }),
  endpoints: (builder) => ({
    // Sosial Links
    getSocialNetworks: builder.query({
      query: () => ({ url: "/master/social-network" }),
    }),
    getAllSocialNetworks: builder.mutation({
      query: () => ({ url: "/master/social-network" }),
    }),
    addSocialNetwork: builder.mutation({
      query: (body) => ({
        url: "/master/social-network",
        method: "POST",
        body,
      }),
    }),
    updateSocialNetwork: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/master/social-network/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteSocialNetwork: builder.mutation({
      query: (id) => ({
        url: `/master/social-network/${id}`,
        method: "POST",
        body: { _method: "DELETE" },
      }),
    }),
  }),
})

export const {
  useGetSocialNetworksQuery,
  useGetAllSocialNetworksMutation,
  useAddSocialNetworkMutation,
  useUpdateSocialNetworkMutation,
  useDeleteSocialNetworkMutation,
} = socialNetworkApi
