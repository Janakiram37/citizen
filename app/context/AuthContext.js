'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set user state
        setUser({
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          email: user.email
        });

        // Get and store the auth token
        try {
          const token = await user.getIdToken();
          // Store token in cookie using fetch API
          await fetch('/api/auth/cookie', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
        } catch (error) {
          console.error('Error setting auth token:', error);
        }
      } else {
        setUser(null);
        // Clear the auth token cookie
        await fetch('/api/auth/cookie', { method: 'DELETE' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

// import { useAuth } from '@/app/context/AuthContext'

// // Inside your component
// const { user, loading } = useAuth()
