import React from 'react';
import { useDeleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
  const { mutate: deleteGoal, isLoading } = useDeleteGoal();

  return (
    <div className="bg-cyan-800 text-white shadow-md rounded-lg p-4 mb-4">
    <div className="flex justify-between items-start">
      <div>
        <div className=" text-white text-sm">{new Date(goal.createdAt).toLocaleString('en-US')}</div>
        <h3 className="text-lg font-semibold text-white">{goal.text}</h3>
      </div>
      <button 
        onClick={() => deleteGoal(goal._id)} 
        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 disabled:bg-red-300" 
        disabled={isLoading}>
        X
      </button>
    </div>
  </div>
  );
}

export default GoalItem;
