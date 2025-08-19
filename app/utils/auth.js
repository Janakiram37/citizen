import { auth } from '@/app/firebase/config';
import { cookies } from 'next/headers';

export const setAuthCookie = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      // Set the auth token as an HTTP-only cookie
      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
    }
  } catch (error) {
    console.error('Error setting auth cookie:', error);
  }
};

export const clearAuthCookie = () => {
  cookies().delete('auth-token');
};
