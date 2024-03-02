import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Login from "./Login";
import Home from "./Home"
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase-config";

function App() {
  const navigate = useNavigate()
  const user = localStorage.getItem("codepenuid");


  useEffect(() => {
    if (user === null) navigate("/login", { replace: true });
    else {
      navigate("/", { replace: true });

    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    if (user === null) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firebaseDB = getFirestore();

export default App;