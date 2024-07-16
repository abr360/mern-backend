import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGoal, getGoals, deleteGoal } from './goalService';
import { useSelector } from 'react-redux';

export const useCreateGoal = () => {
    const user = useSelector((state) => state.auth.user);
    const token = user ? user.token : null;
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (goalData) => createGoal(goalData, token),
      onSuccess: () => {
        queryClient.invalidateQueries(['goals']);
      },
    });
};

  export const useGetGoals = () => {
    const user = useSelector((state) => state.auth.user);
    const token = user ? user.token : null;
  
    return useQuery({
      queryKey: ['goals'],
      queryFn: () => getGoals(token),
      enabled: !!token, // This will only enable the query if the token is not null
    });
  };

  export const useDeleteGoal = () => {
    const user = useSelector((state) => state.auth.user);
    const token = user ? user.token : null; // Ensure token is only accessed if user is not null
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id) => deleteGoal(id, token),
      onSuccess: () => {
        queryClient.invalidateQueries(['goals']);
      },
    });
};