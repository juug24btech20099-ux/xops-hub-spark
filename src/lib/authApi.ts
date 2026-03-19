export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SessionResponse = {
  user: AuthUser;
};

export class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
  }
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const withApiBaseUrl = (path: string) => `${apiBaseUrl}${path}`;

const parseResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const requestJson = async <T>(
  url: string,
  options: {
    method: "GET" | "POST";
    payload?: unknown;
    token?: string;
  }
): Promise<T> => {
  const headers: Record<string, string> = {};

  if (options.payload !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: options.method,
      headers,
      body: options.payload !== undefined ? JSON.stringify(options.payload) : undefined,
    });
  } catch {
    throw new AuthApiError(
      "Cannot reach the auth server. Start the API and try again.",
      0
    );
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : "Request failed. Please try again.";

    throw new AuthApiError(message, response.status);
  }

  return data as T;
};

export const signupUser = (payload: SignupPayload) =>
  requestJson<AuthResponse>(withApiBaseUrl("/api/auth/signup"), { method: "POST", payload });

export const loginUser = (payload: LoginPayload) =>
  requestJson<AuthResponse>(withApiBaseUrl("/api/auth/login"), { method: "POST", payload });

export const fetchCurrentUser = (token: string) =>
  requestJson<SessionResponse>(withApiBaseUrl("/api/auth/me"), { method: "GET", token });

export const isAuthApiError = (error: unknown): error is AuthApiError =>
  error instanceof AuthApiError;
