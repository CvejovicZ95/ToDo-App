import { useState } from 'react';
import { toast } from 'react-toastify';
import { createTask } from '../api/tasksApi';

export const useCreateTaskByUser = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (taskName, userId) => {
    setLoading(true);
    try {
      const newTask = await createTask(taskName, userId);
      return newTask;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleCreateTask };
};
