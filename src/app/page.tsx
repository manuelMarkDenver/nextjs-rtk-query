'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  console.log('🚀 ~ file: page.tsx:14 ~ Counter ~ count:', count);
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  console.log('🚀 ~ file: page.tsx:17 ~ Counter ~ posts:', posts);

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(Number(incrementAmount)));
  };

  const { data, error, isLoading } = useGetPostsByIdQuery('2')
  console.log("🚀 ~ file: page.tsx:26 ~ Counter ~ data:", data)


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
};

export default Counter;
