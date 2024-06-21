import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getTasksByUser, deleteTask } from '../api/tasksApi';

export const useGetTasksByUser = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasksByUser = useCallback(async () => {
    if (!userId) {
      return;
    }
    setLoading(true);
    try {
      const data = await getTasksByUser(userId);
      const activeTasks = data.filter(task => !task.deleted);
      setTasks(activeTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasksByUser();
  }, [userId, fetchTasksByUser]);

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const refetchTasks = useCallback(() => {
    fetchTasksByUser();
  }, [fetchTasksByUser]);

  return { loading, tasks, handleDeleteTask, refetchTasks };
};

export default useGetTasksByUser;
