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
  /** estado de autenticación del usuario */
  isAuth: boolean;
  /** indica si se ha cargado el estado de autenticación */
  isLoaded: boolean;
  /** función para cerrar sesión (solo elimina el token) */
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  logout: () => {},
  isLoaded: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // obtener token
      const token = await AsyncStorage.getItem("AUTH_TOKEN");
      if (!token) {
        setIsAuth(false);
        setIsLoaded(true);
        return;
      }

      // validar token
      try {
        const response = await validateToken(token);
        if (response.status === 200) {
          setIsAuth(true);
        }
      } catch (error) {
        setIsAuth(true);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("AUTH_TOKEN");
    setIsAuth(false);
  };

  const value = {
    isAuth,
    isLoaded,
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
