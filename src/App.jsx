import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./apis/AuthContextApi";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Profile from "./profile/Profile";
import Spinner from "./pages/Spinner";
import ProfileDefault from "./profile/ProfileDefault";
import UploadPhoto from "./profile/UploadPhoto";
import ResetPassword from "./components/auth/ResetPassword";
import PhoneAuth from "./components/auth/PhoneAuth";
import AddProfileData from "./profile/AddProfileData";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* <Spinner /> */}
        <ToastContainer theme="dark" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileDefault />
                </ProtectedRoute>
              }
            />
            <Route
              path="upload-profile-photo"
              element={
                <ProtectedRoute>
                  <UploadPhoto />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-profile-data"
              element={
                <ProtectedRoute>
                  <AddProfileData />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
                //{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                {" "}
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-Password"
            element={
              <PublicRoute>
                {" "}
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/phone-auth"
            element={
              <PublicRoute>
                {" "}
                <PhoneAuth />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
