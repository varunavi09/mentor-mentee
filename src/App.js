import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

// Shared Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Common Pages
import RoleSelection from './components/RoleSelection';
import Home from './components/Home';
import Login from './components/Login';
import VideoCall from './components/VideoCall';

// Mentor Components
import MentorDashboard from './components/mentor/Dashboard';
import MentorAvailability from './components/mentor/Availability';
import MentorBookings from './components/mentor/Bookings';
import MentorProfile from './components/mentor/Profile';

// Mentee Components
import MenteeDashboard from './components/mentee/Dashboard';
import MentorsList from './components/mentee/MentorsList';
import MentorDetail from './components/mentee/MentorDetail';
import MenteeBookings from './components/mentee/Bookings';
import MenteeProfile from './components/mentee/Profile';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const AppLayout = () => (
    <div className="App flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route index element={<RoleSelection />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login setUser={setUser} />} />

        {/* Mentor Routes */}
        <Route
          path="mentor/dashboard"
          element={
            <ProtectedRoute user={user} allowedRole="mentor">
              <MentorDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/availability"
          element={
            <ProtectedRoute user={user} allowedRole="mentor">
              <MentorAvailability user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/bookings"
          element={
            <ProtectedRoute user={user} allowedRole="mentor">
              <MentorBookings user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentor/profile"
          element={
            <ProtectedRoute user={user} allowedRole="mentor">
              <MentorProfile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        {/* Mentee Routes */}
        <Route
          path="mentee/dashboard"
          element={
            <ProtectedRoute user={user} allowedRole="mentee">
              <MenteeDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentee/mentors"
          element={
            <ProtectedRoute user={user} allowedRole="mentee">
              <MentorsList user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentee/mentor/:mentorId"
          element={
            <ProtectedRoute user={user} allowedRole="mentee">
              <MentorDetail user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentee/bookings"
          element={
            <ProtectedRoute user={user} allowedRole="mentee">
              <MenteeBookings user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="mentee/profile"
          element={
            <ProtectedRoute user={user} allowedRole="mentee">
              <MenteeProfile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        {/* Video Call Route (Both Roles) */}
        <Route
          path="video-call/:bookingId"
          element={
            <ProtectedRoute user={user}>
              <VideoCall user={user} />
            </ProtectedRoute>
          }
        />

        {/* Legacy Route Redirects */}
        <Route path="mentor-dashboard" element={<Navigate to="/mentor/dashboard" replace />} />
        <Route path="mentee-dashboard" element={<Navigate to="/mentee/dashboard" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  );
}

export default App;
