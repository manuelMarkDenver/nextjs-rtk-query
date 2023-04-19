'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from '@/features/counters/counterSlice';
import { useGetPostsByIdQuery } from '@/features/posts/postsSlice';

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [posts, setPosts] = useState<never[]>([]);
  console.log('🚀 ~ file: page.tsx:18 ~ Counter ~ posts:', posts);
  const [postId, setPostId] = useState('');
  const dispatch = useDispatch();
  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount)));
  };

  const { data, error, isLoading } = useGetPostsByIdQuery(postId);
  console.log('🚀 ~ file: page.tsx:24 ~ Counter ~ data:', data);
  // const handleFetchPostById = (id: any) => {
  //   console.log(data);
  // };

  useEffect(() => {
    if (postId !== undefined || postId !== null) {
      //@ts-ignore
      setPosts(data);
    }
  }, [postId]);

  useEffect(() => {
    //@ts-ignore
    setPosts(data);
  }, [data]);

  if (error)
    return (
      <>
        <p className='text-red-500 mb-4'>
          Failed to fetch data. Post ${postId} not found.
        </p>

        <button onClick={() => location.reload()}>Back</button>
      </>
    );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <br />
        <span>{count}</span>
        <br />
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <br />
        <div>
          <input
            type='text'
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            className='border border-solid border-black mr-4 text-center'
          />
          <button
            onClick={handleIncrementByAmount}
            className='bg-black text-white py-2 px-4 rounded-md'
          >
            Increment By Amount
          </button>

          <div className='my-4'>
            <input
              type='text'
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              className='border border-solid border-black mr-4 text-center'
              placeholder='enter an id here to search for a post/s'
            />
          </div>
        </div>
        {posts !== undefined ? (
          <p>{JSON.stringify(posts)}</p>
        ) : (
          <p>No post/s</p>
        )}
      </div>
    </>
  );
};

export default Counter;
