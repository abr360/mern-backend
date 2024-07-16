import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setLoading, setUser, setError } from '../auth/authSlice';

const API_URL = 'https://appsail-50021396988.development.catalystappsail.in/api/users';

export const useRegisterMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result));
      dispatch(setUser(result));
      return result;
    },
  });
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      const result = await response.json();
      localStorage.setItem('user', JSON.stringify(result));
      dispatch(setUser(result));
      return result;
    },
  });
};
