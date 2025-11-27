import { validateToken } from "@/api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuth: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    async () => {
      // obtener token
      const token = await AsyncStorage.getItem("AUTH_TOKEN");
      if (!token) {
        setIsAuth(false);
        return;
      }

      // validar token
      validateToken(token)
        .then((response) => {
          if (response.status == 200) {
            setIsAuth(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsAuth(false);
        });
    };
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("AUTH_TOKEN");
    setIsAuth(false);
  };

  const value = {
    isAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
};

export const useAuthStatus = () => {
  const { isAuth } = useAuth();
  return isAuth;
};
