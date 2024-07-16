import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetGoals } from '../features/goals/goalSlice';
import GoalItem from './GoalItem';
import GoalForm from './GoalForm';
function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { data: goals, isLoading, isError, error } = useGetGoals();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className="content max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center">Welcome, {user?.name}</h2>
        <h3 className="text-lg text-center text-gray-600">Here are your goals</h3>
        <GoalForm />
  
        {goals && goals.length > 0 ? (
          <div className="goals grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3 className="text-lg text-center text-gray-600">You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;