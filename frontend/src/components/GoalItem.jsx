import React from 'react';
import { useDeleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
  const { mutate: deleteGoal, isLoading } = useDeleteGoal();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    
      <div className="text-gray-600 text-sm">{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      
      <h3 className="text-lg font-semibold text-gray-800">{goal.text}</h3>

      <button 
        onClick={() => deleteGoal(goal._id)} 
        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mt-2 disabled:bg-red-300" 
        disabled={isLoading}>
        X
      </button>
    </div>
  );
}

export default GoalItem;
