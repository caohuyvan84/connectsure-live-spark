// Mock Authentication Service for ConnectSure
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'agent';
}

export interface LoginCredentials {
  username: string; // phone or email
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private currentUser: User | null = null;

  // Mock login - replace with real API
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (credentials.username === "admin" && credentials.password === "admin") {
      this.currentUser = {
        id: "agent_001",
        name: "Lê Thị Minh",
        email: "agent@connectsure.vn",
        role: "agent"
      };
    } else {
      this.currentUser = {
        id: "customer_001",
        name: "Nguyễn Văn An",
        email: credentials.username,
        phone: "0123456789",
        role: "customer"
      };
    }
    
    return this.currentUser;
  }

  async logout(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Mock password reset
  async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Password reset sent to: ${email}`);
  }
}

export const authService = new AuthService();