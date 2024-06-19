import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./context/authContext";

import { Layout } from "./components/layout/Layout";
import { LoginRegister } from "./components/loginRegister/LoginRegister";

function ProtectedRoute({ children }) {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to="/login" />;
}

export function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
      <Route
        path="login"
        element={authUser ? <Navigate to="/" /> : <LoginRegister />}
      />
    </Routes>
  );
}

