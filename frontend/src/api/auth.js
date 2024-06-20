/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import setHeaders from '../helpers/setHeaders';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'api/v1', prepareHeaders: setHeaders, tagTypes: ['Auth'],
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        method: 'POST',
        url: '/login',
        body: user,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;
