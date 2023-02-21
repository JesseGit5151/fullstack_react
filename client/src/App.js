import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route 
          path="/posts"
          element={
            <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
          } 
          />
      </Routes>
    </div>
  );
}

export default App;
