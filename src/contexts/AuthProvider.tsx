import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../supabase';
import type { User } from '@supabase/supabase-js';

// 1. Define the shape of our Auth data
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// 2. Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to get the session from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          setUser(session.user);
          setLoading(false); // If session exists, stop loading immediately
        } else {
          // 🚪 HOLD THE DOOR: 
          // If no session is found immediately (common during Google Redirect),
          // we wait 1 second before giving up. This prevents the "kick back to home".
          setTimeout(() => {
            setLoading(false);
          }, 1000); 
        }
      } catch (error) {
        console.error("Auth Initialization Failed:", error);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for real-time auth changes (Sign-in, Sign-out, Token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // If a user just signed in or a session was recovered, stop loading now
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook to use auth in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};