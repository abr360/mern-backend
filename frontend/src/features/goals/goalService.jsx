const API_URL = 'http://localhost:8000/api/goals';

export const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ text: goalData }),
    ...config,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create goal');
  }

  return response.json();
};

export const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(API_URL, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch goals');
  }

  return response.json();
};

export const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    ...config,
  });


  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete goal');
  }

  return response.json();
};
