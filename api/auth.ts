import { API_URL } from "@/constants/api";
import axios from "axios";

const BASE_URL = `${API_URL}/auth`;

interface CredentialResponse {
  name: string;
  token: string;
}

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function login(credentials: LoginRequest) {
  return await axios.post<CredentialResponse>(`${BASE_URL}/login`, {
    ...credentials,
  });
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function register(credentials: RegisterRequest) {
  return await axios.post<CredentialResponse>(`${BASE_URL}/register`, {
    ...credentials,
  });
}

interface VerifyResponse {
  message: string;
}

export async function validateToken(token: string) {
  return await axios.get<VerifyResponse>(`${BASE_URL}/validate-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
