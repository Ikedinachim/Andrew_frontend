// src/features/Counter.js

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counterSlice';

export default function Counter() {
  // Read the current count from Redux store
  const count = useSelector((state) => state.counter.value);
  // Get the dispatch function
  const dispatch = useDispatch();

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Count: {count}</h1>
      <div className="space-x-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          +5
        </button>
      </div>
    </div>
  );
}
