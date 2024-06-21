import { useState } from "react";
import { updateTask } from "../api/tasksApi";

export const useUpdateTask = () => {
  const [updating, setUpdating] = useState(false);

  const handleUpdateTask = async (id, updatedName) => {
    try {
      setUpdating(true);
      await updateTask(id, updatedName);
      setUpdating(false);
      return { _id: id, name: updatedName };
    } catch (error) {
      console.error("Error updating task:", error);
      setUpdating(false);
      throw new Error("Error updating task");
    }
  };

  return { updating, handleUpdateTask };
};
