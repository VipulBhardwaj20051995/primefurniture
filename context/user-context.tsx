"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

// Configure Amplify outside of the component to avoid re-renders
const configureAmplify = () => {
  if (typeof window === "undefined") return;
  
  try {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: "us-east-1_lNizU5HX4",
          userPoolClientId: "1grrsj5ck4p91if1ksto3dn0hp",
          loginWith: {
            email: true
          }
        }
      }
    });
  } catch (error) {
    console.error("Auth config error:", error);
  }
};

// Initialize Amplify
configureAmplify();

// Create context
interface UserContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  updateUser: (data: any) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  isAuthenticated: false,
  user: null,
  updateUser: () => {},
  loading: true
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (data: any) => {
    if (data && data.email) {
      // Store in localStorage for persistence across page reloads
      localStorage.setItem("userName", data.name || "");
      localStorage.setItem("userEmail", data.email || "");
      setUser({
        name: data.name || "",
        email: data.email
      });
    }
  };

  // Load user on initial render
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check if user is authenticated with Amplify
        const currentUser = await getCurrentUser();
        
        // Get stored user info from localStorage
        const storedName = localStorage.getItem("userName") || "";
        const storedEmail = localStorage.getItem("userEmail") || currentUser.username;
        
        if (currentUser) {
          setUser({
            name: storedName,
            email: storedEmail
          });
        }
      } catch (error) {
        // Not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        updateUser,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);