type ApiErrorResponse = { error?: string };

type LoginResponse = {
  token: string;
  tokenType: "Bearer";
  user: { email: string };
};

type RequestOtpResponse = {
  success: true;
  expiresIn: number;
};

type MeResponse = {
  email: string | null;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.BACKEND_URL;

async function apiFetch<T>(path: string, init: RequestInit, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const data = (await res.json().catch(() => ({}))) as T | ApiErrorResponse;

  if (!res.ok) {
    const err = data as ApiErrorResponse;
    throw new Error(err.error || `Request failed (${res.status})`);
  }

  return data as T;
}

export function apiLogin(email: string, password: string) {
  return apiFetch<LoginResponse>(
    "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );
}

export function fetchMe(token: string) {
  return apiFetch<MeResponse>(
    "/api/auth/me",
    {
      method: "GET",
    },
    token
  );
}

export function requestOtp(email: string) {
  return apiFetch<RequestOtpResponse>(
    "/api/auth/request-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );
}

export function verifyOtp(email: string, code: string) {
  return apiFetch<LoginResponse>(
    "/api/auth/verify-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    },
  );
}

