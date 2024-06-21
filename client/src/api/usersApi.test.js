import { loginUser, logoutUser, registerUser, getAllUsers } from "./usersApi";

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

describe("authApi", () => {
  describe("loginUser", () => {
    it("calls correct endpoint and returns user data on successful login", async () => {
      const username = "testuser";
      const password = "testpassword";
      const mockUserData = { username: "testuser", fullName: "Test User" };

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUserData),
        }),
      );

      const userData = await loginUser(username, password);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      expect(userData).toEqual(mockUserData);
    });

    it('throws an error when login fails with "Wrong username or password"', async () => {
      const username = "testuser";
      const password = "wrongpassword";
      const errorMessage = "Incorrect username or password";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: "Wrong username or password" }),
        }),
      );

      await expect(loginUser(username, password)).rejects.toThrow(errorMessage);
    });

    it("throws an error when fetch fails", async () => {
      const username = "testuser";
      const password = "testpassword";
      const errorMessage = "Failed to fetch";

      mockFetch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(loginUser(username, password)).rejects.toThrow(errorMessage);
    });
  });

  describe("logoutUser", () => {
    it("calls correct endpoint for logout", async () => {
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
        }),
      );

      await logoutUser();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
    });

    it("throws an error when fetch fails", async () => {
      const errorMessage = "Failed to logout";

      mockFetch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(logoutUser()).rejects.toThrow(errorMessage);
    });
  });

  describe("registerUser", () => {
    it("calls correct endpoint with user data and returns registered user", async () => {
      const userData = {
        username: "newuser",
        password: "password123",
        fullName: "New User",
      };
      const mockRegisteredUser = { username: "newuser", fullName: "New User" };

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockRegisteredUser),
        }),
      );

      const registeredUser = await registerUser(userData);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        },
      );

      expect(registeredUser).toEqual(mockRegisteredUser);
    });

    it("throws an error when registration fails", async () => {
      const userData = {
        username: "newuser",
        password: "password123",
        fullName: "New User",
      };
      const errorMessage = "Failed to register user";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: errorMessage }),
        }),
      );

      await expect(registerUser(userData)).rejects.toThrow(errorMessage);
    });
  });

  describe("getAllUsers", () => {
    it("calls correct endpoint and returns list of users", async () => {
      const mockUsers = [
        { username: "user1", fullName: "User One" },
        { username: "user2", fullName: "User Two" },
      ];

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUsers),
        }),
      );

      const users = await getAllUsers();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `${config.API_BASE_URL}/api/auth/users`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      expect(users).toEqual(mockUsers);
    });

    it("throws an error when fetch fails", async () => {
      const errorMessage = "Failed to fetch users";

      mockFetch.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(getAllUsers()).rejects.toThrow(errorMessage);
    });

    it("throws an error when data has error property", async () => {
      const errorMessage = "Error fetching users";

      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ error: errorMessage }),
        }),
      );

      await expect(getAllUsers()).rejects.toThrow(errorMessage);
    });
  });
});
