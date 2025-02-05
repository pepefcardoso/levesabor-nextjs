import { useAuthStore } from "../store/authStore";


export const AuthService = {
  async login(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token } = await response.json();
      useAuthStore.getState().login(token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      useAuthStore.getState().logout();
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },
};