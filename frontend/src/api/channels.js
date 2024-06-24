import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import setHeaders from '../helpers/setHeaders';
import { apiPaths } from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery(
    {
      baseUrl: apiPaths.channels(), prepareHeaders: setHeaders, tagTypes: ['Channels'],
    },
  ),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
} = channelsApi;
