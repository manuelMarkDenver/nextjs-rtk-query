import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type PostType = {
  post: any;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPostsById: builder.query<PostType, string>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetPostsByIdQuery } = postsApi;
