import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Posts = {
  posts: Post[];
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getPostsById: builder.query<Post | Posts, string>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useGetPostsByIdQuery } = postsApi;
