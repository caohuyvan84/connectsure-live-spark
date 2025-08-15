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
    // Determine user type from URL
    const path = location.pathname;
    if (path.includes('/agent')) {
      setUserType('agent');
    } else {
      setUserType('customer'); 
    }

    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setAppState('dashboard');
        setUserType(currentUser.role);
      }
    }
  }, [location]);

  const handleLogin = (role: 'customer' | 'agent') => {
    setUserType(role);
    setAppState('dashboard');
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
        userType={userType || 'customer'} 
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
  if (userType === 'customer') {
    return (
      <CustomerDashboard 
        onNavigateToCall={handleNavigateToCall}
        onLogout={handleLogout}
      />
    );
  } else {
    return <AgentDashboard onLogout={handleLogout} />;
  }
};