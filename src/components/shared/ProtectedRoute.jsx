import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { supabase } from '@/Supabase/supabaseClient';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const [user, loading] = useSupabaseAuth();
  const location = useLocation();

  useEffect(() => {

  }, [])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ReactLoading type="bubbles" height="60px" width="60px" color="#8b5cf6" />
      </div>
    );
  }

  // If route requires authentication and user is not logged in
  if (requireAuth && !user) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route is for non-authenticated users and user is logged in
  if (!requireAuth && user) {
    // Redirect to control center
    return <Navigate to="/control-center" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
