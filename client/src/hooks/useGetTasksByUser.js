import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getTasksByUser,
  deleteTask,
  updateTask,
} from '../api/tasksApi';

export const useGetTasksByUser = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasksByUser = async () => {
      if (!userId) {
        return;
      }
      setLoading(true);
      try {
        const data = await getTasksByUser(userId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksByUser();
  }, [userId]);

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

  const handleUpdateTask = async (id, updatedName) => {
    try {
      await updateTask(id, updatedName);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, name: updatedName } : task
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loading, tasks, handleDeleteTask, handleUpdateTask };
};

export default useGetTasksByUser;