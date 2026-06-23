import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
  // Main Application Shell
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  // Auth Shell
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
  // Fallback Catch-All Redirect
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
