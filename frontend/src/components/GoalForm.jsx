import React, { useState } from 'react';
import { useCreateGoal } from '../features/goals/goalSlice';

function GoalForm() {
  const [text, setText] = useState('');
  const { mutate: createGoal, isLoading } = useCreateGoal();

  const onSubmit = (e) => {
    e.preventDefault();
    createGoal(text);
    setText('');
  };

  return (
    <section className="max-w-md mx-auto p-4">
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="text" className="mb-2 font-semibold">Goal</label>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button 
          className={`w-full px-4 py-2 text-white font-bold rounded-md ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} transition-colors`}
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Goal'}
        </button>
      </div>
    </form>
  </section>
  );
}

export default GoalForm;
