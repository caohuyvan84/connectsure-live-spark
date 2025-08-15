import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginForm } from "./auth/LoginForm";
import { CustomerDashboard } from "./customer/Dashboard"; 
import { CustomerVideoCall } from "./customer/VideoCall";
import { AgentDashboard } from "./agent/AgentDashboard";
import { authService } from "@/services/authService";

type AppState = 'login' | 'dashboard' | 'video-call';
type UserType = 'customer' | 'agent' | null;

export const ConnectSureApp = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [userType, setUserType] = useState<UserType>(null);
  const location = useLocation();

  useEffect(() => {
    console.log('Current path:', location.pathname);
    
    // Determine user type from URL
    const path = location.pathname;
    const urlUserType = path.includes('/agent') ? 'agent' : 'customer';
    console.log('URL user type:', urlUserType);
    
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      console.log('Current authenticated user:', currentUser);
      if (currentUser) {
        setAppState('dashboard');
        setUserType(currentUser.role);
        return; // Exit early to avoid setting URL-based userType
      }
    }
    
    // Only set URL-based userType if not authenticated
    setUserType(urlUserType);
  }, [location]);

  const handleLogin = async (credentials: any) => {
    try {
      const user = await authService.login(credentials);
      console.log('Login successful, user role:', user.role);
      setUserType(user.role);
      setAppState('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setAppState('login');
    setUserType(null);
  };

  const handleNavigateToCall = () => {
    setAppState('video-call');
  };

  const handleEndCall = () => {
    setAppState('dashboard');
  };

  // Show login form
  if (appState === 'login' || !userType) {
    return (
      <LoginForm 
        onLogin={handleLogin} 
        initialUserType={userType || 'customer'} 
      />
    );
  }

  // Show video call interface
  if (appState === 'video-call') {
    if (userType === 'customer') {
      return <CustomerVideoCall onEndCall={handleEndCall} />;
    } else {
      // Agent video call is part of the dashboard
      return <AgentDashboard onLogout={handleLogout} />;
    }
  }

  // Show dashboard
  console.log('Rendering dashboard for userType:', userType);
  if (userType === 'customer') {
    return (
      <CustomerDashboard 
        onNavigateToCall={handleNavigateToCall}
        onLogout={handleLogout}
      />
    );
  } else if (userType === 'agent') {
    return <AgentDashboard onLogout={handleLogout} />;
  } else {
    // Fallback - should not happen
    console.warn('Unknown userType:', userType);
    return <div>Loading...</div>;
  }
};