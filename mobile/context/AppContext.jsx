import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = "https://bookworm-zcs3.onrender.com";

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [books,setBooks] = useState(null)

  // ✅ Load token & user from AsyncStorage on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        // If token exists but no user, try fetching latest user data
        if (storedToken && !storedUser) {
          await fetchUser(storedToken);
        }
      } catch (err) {
        console.log("Error loading auth data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // ✅ Save token & user to AsyncStorage whenever they change
  useEffect(() => {
    const persistAuthData = async () => {
      try {
        if (token && user) {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
        } else if (!token || !user) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
        }
      } catch (err) {
        console.log("Error saving auth data:", err);
      }
    };

    // Don’t run while initial loading
    if (!isLoading) persistAuthData();
  }, [token, user, isLoading]);

  // ✅ Fetch user details (auto usable after login)
  const fetchUser = async (existingToken = token) => {
    if (!existingToken) return;

    try {
      const response = await fetch(`${backendUrl}/api/users/data`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${existingToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("User fetch failed");

      const data = await response.json();
      setUser(data.user);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.log("Fetch user failed:", err);
      await logout();
    }
  };

  // ✅ Logout function (clears everything)
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };
const handleFetchData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/books/all`, {
    
    });
    setBooks(data.books)
  } catch (error) {
    console.log("❌ Fetch failed:", error.response?.data || error.message);
  }
};



  useEffect(()=>{
    handleFetchData()
  },[])

  const value = {
    backendUrl,
    token,
    setToken,
    user,
    setUser,
    isLoading,
    fetchUser,
    logout,
    books,setBooks
  };

  // Simple fallback during restore
  if (isLoading) return null;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
