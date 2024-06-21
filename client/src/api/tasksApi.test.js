import {
  getTasks,
  getTasksByUser,
  deleteTask,
  updateTask,
  createTask,
} from "./tasksApi";

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

const config = {
  API_BASE_URL: "http://localhost:4000",
};

describe("tasksApi", () => {
  describe("getTasks", () => {
    it("calls correct endpoint and returns tasks", async () => {
      const mockTasks = [
        { id: 1, name: "Task 1" },
        { id: 2, name: "Task 2" },
      ];

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockTasks),
        }),
      );

      const tasks = await getTasks();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/tasks`,
      );

      expect(tasks).toEqual(mockTasks);
    });

    it("throws an error when data has error property", async () => {
      const errorMessage = "Error fetching tasks";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: errorMessage }),
        }),
      );

      await expect(getTasks()).rejects.toThrow(errorMessage);
    });
  });

  describe("getTasksByUser", () => {
    it("calls correct endpoint with userId and returns non-deleted tasks", async () => {
      const userId = 123;
      const mockTasks = [
        { id: 1, name: "Task 1", deleted: false },
        { id: 2, name: "Task 2", deleted: true },
      ];

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockTasks),
        }),
      );

      const tasks = await getTasksByUser(userId);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/tasks/user/${userId}`,
      );

      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(1);
      expect(tasks[0].name).toBe("Task 1");
    });

    it("throws an error when data has error property", async () => {
      const userId = 456;
      const errorMessage = "Error fetching user tasks";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: errorMessage }),
        }),
      );

      await expect(getTasksByUser(userId)).rejects.toThrow(errorMessage);
    });
  });

  describe("deleteTask", () => {
    it("calls correct endpoint with task id", async () => {
      const taskId = 789;

      await deleteTask(taskId);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/tasks/delete/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        },
      );
    });

    it("throws an error when fetch fails", async () => {
      const taskId = 789;
      const errorMessage = "Failed to delete task";

      mockFetch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(deleteTask(taskId)).rejects.toThrow(errorMessage);
    });
  });

  describe("updateTask", () => {
    it("calls correct endpoint with task id and updated name", async () => {
      const taskId = 456;
      const updatedName = "Updated Task Name";

      await updateTask(taskId, updatedName);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/tasks/update/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: updatedName }),
        },
      );
    });

    it("throws an error when fetch fails", async () => {
      const taskId = 456;
      const updatedName = "Updated Task Name";
      const errorMessage = "Failed to update task";

      mockFetch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(updateTask(taskId, updatedName)).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("createTask", () => {
    it("calls correct endpoint with task name and user id, and returns created task", async () => {
      const taskName = "New Task";
      const userId = 789;
      const mockCreatedTask = { id: 123, name: taskName, userId: userId };

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockCreatedTask),
        }),
      );

      const createdTask = await createTask(taskName, userId);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/tasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: taskName, userId: userId }),
        },
      );

      expect(createdTask).toEqual(mockCreatedTask);
    });

    it("throws an error when data has error property", async () => {
      const taskName = "New Task";
      const userId = 789;
      const errorMessage = "Error creating task";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: errorMessage }),
        }),
      );

      await expect(createTask(taskName, userId)).rejects.toThrow(errorMessage);
    });
  });
});
