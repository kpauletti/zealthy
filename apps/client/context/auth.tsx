import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";
import { router } from "expo-router";

interface User {
  id: string;
  email: string;
  role: string;
  token: string;
}

interface Context {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<Context>({} as Context);

const getUser = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //set user from async storage
  React.useEffect(() => {
    getUser().then(user => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  //set axios auth interceptor, will log user out if token is invalid
  React.useEffect(() => {
    api.interceptors.response.use(
      function doNothingIfSuccess(response) {
        return response;
      },
      function routeToHomeIfUnauthorized(error) {
        if (error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    )
  }, [])


  const isAdmin = React.useMemo(() => user?.role === "admin", [user]);

  const login = (email: string, password: string) => {
    if (email && password) {
      api
        .post("/login", { email, password })
        .then(res => {
          if (res.data.token) {
            AsyncStorage.setItem("user", JSON.stringify(res.data));
            setUser(res.data);
          } else {
            alert("Invalid email or password");
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err, null, 2));
          alert("Invalid email or password");
        });
    } else {
      alert("Please enter a valid email and password");
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
