import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGoal } from '../features/goals/goalSlice';

function GoalForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { mutate: createGoal, isLoading } = useCreateGoal();
  const onSubmit = (data) => {
    createGoal(data.text);
    reset(); 
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="text" className="mb-2 font-semibold">Goal</label>
          <input
            {...register('text', { required: true })}
            type="text"
            id="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.text && <p className="text-red-500">Goal is required</p>}
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