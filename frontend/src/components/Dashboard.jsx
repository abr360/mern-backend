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
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor:'rgb(207 250 254)'
      }}>
        <div style={{ 
          border: '4px solid #f3f3f3', 
          borderTop: '4px solid #3498db', 
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 2s linear infinite' 
        }}>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Sort goals in descending order based on their ID
  const sortedGoals = goals?.sort((a, b) => b._id.localeCompare(a._id));

  return (
    <>
      <div className=' bg-cyan-100 h-full'>
        <section className=" p-4">
          <h2 className="text-2xl font-bold text-center">Welcome, {user?.name}</h2>
          <h3 className="text-lg text-center text-gray-600">Here are your goals</h3>
          <GoalForm/>

          {sortedGoals && sortedGoals.length > 0 ? (
            <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 *:mx-10 gap-4 p-4">
              {sortedGoals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3 className="text-lg text-center text-gray-600">You have not set any goals</h3>
          )}
        </section>
      </div>
    </>
  );
}

export default Dashboard;
