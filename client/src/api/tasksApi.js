import config from "../config.json";
const apiUrl = config.API_BASE_URL;

export const getTasks = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/tasks`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getTasksByUser = async (userId) => {
  try {
    const res = await fetch(`${apiUrl}/api/tasks/user/${userId}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.filter((task) => !task.deleted);
  } catch (error) {
    console.error("Error in getTasksByUser:", error.message);
    throw new Error(error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    await fetch(`${apiUrl}/api/tasks/delete/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTask = async (id, updatedName) => {
  try {
    await fetch(`${apiUrl}/api/tasks/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedName,
      }),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTask = async (taskName, userId) => {
  try {
    const res = await fetch(`${apiUrl}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: taskName, userId: userId }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
