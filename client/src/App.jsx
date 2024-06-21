import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./context/authContext";
import { Layout } from "./components/layout/Layout";
import { LoginRegister } from "./components/loginRegister/LoginRegister";
import { UsersList } from "./components/usersList/UsersList";
import { UsersTasks } from './components/usersTasks/UsersTasks';

export function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? (
          authUser.role === 'admin' ? (
            <Navigate to="/users" />
          ) : (
            <Layout />
          )
        ) : (
          <Navigate to="/login" />
        )}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <LoginRegister />}
      />
      <Route
        path="/users"
        element={authUser && authUser.role === 'admin' ? (
          <UsersList />
        ) : (
          <Navigate to="/login" />
        )}
      />
      <Route
          path="/user-tasks/:userId"
          element={authUser && authUser.role === 'admin' ? (
            <UsersTasks />
          ) : (
            <Navigate to="/login" />
          )}
        />
    </Routes>
  );
}
