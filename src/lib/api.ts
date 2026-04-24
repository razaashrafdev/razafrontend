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

/** Strip wrapping quotes and trailing slash (common .env mistake). */
function normalizeApiBase(raw: string | undefined): string {
  if (raw == null || raw === "") return "";
  let s = String(raw).trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  return s.replace(/\/$/, "");
}

/**
 * In dev, always use same-origin `/api` so Vite proxies to the backend (avoids CORS and bad env URLs).
 * Proxy target comes from vite.config (defaults to http://127.0.0.1:5000).
 * In production, set VITE_API_BASE_URL at build time to your API origin (no trailing slash).
 */
function resolveApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    return "";
  }
  return normalizeApiBase(import.meta.env.VITE_API_BASE_URL || import.meta.env.BACKEND_URL);
}

const API_BASE_URL = resolveApiBaseUrl();

async function apiFetch<T>(path: string, init: RequestInit, token?: string): Promise<T> {
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url = `${API_BASE_URL}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers,
    });
  } catch {
    throw new Error(
      "Cannot reach the server. For local development, run the API on port 5000 and restart Vite after changing vite.config."
    );
  }

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

// ── Projects ──────────────────────────────────────────────────────────────────

type ProjectPayload = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  showOnHome?: boolean;
};

type ProjectData = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  showOnHome?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ProjectResponse = { success: boolean; data: ProjectData };
type ProjectsListResponse = { success: boolean; data: ProjectData[] };

export function fetchProjects() {
  return apiFetch<ProjectsListResponse>("/api/projects/list", { method: "GET" });
}

export function createProject(payload: ProjectPayload, token: string) {
  return apiFetch<ProjectResponse>(
    "/api/projects/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    token
  );
}

export function updateProject(id: string, payload: Partial<ProjectPayload>, token: string) {
  return apiFetch<ProjectResponse>(
    `/api/projects/edit/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    token
  );
}

export function deleteProject(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `/api/projects/remove/${id}`,
    { method: "DELETE" },
    token
  );
}

// ── Services ──────────────────────────────────────────────────────────────────

type ServicePayload = {
  title: string;
  description: string;
  icon: string;
};

type ServiceData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
};

type ServiceResponse = { success: boolean; data: ServiceData };
type ServicesListResponse = { success: boolean; data: ServiceData[] };

export function fetchServices() {
  return apiFetch<ServicesListResponse>("/api/services/list", { method: "GET" });
}

export function createService(payload: ServicePayload, token: string) {
  return apiFetch<ServiceResponse>(
    "/api/services/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    token
  );
}

export function updateService(id: string, payload: Partial<ServicePayload>, token: string) {
  return apiFetch<ServiceResponse>(
    `/api/services/edit/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    token
  );
}

export function deleteService(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(
    `/api/services/remove/${id}`,
    { method: "DELETE" },
    token
  );
}

// ── Experiences ───────────────────────────────────────────────────────────────

type ExperiencePayload = { role: string; company: string; period: string; description: string; tech: string[] };
type ExperienceData = ExperiencePayload & { id: string; createdAt?: string; updatedAt?: string };
type ExperienceResponse = { success: boolean; data: ExperienceData };
type ExperiencesListResponse = { success: boolean; data: ExperienceData[] };

export function fetchExperiences() {
  return apiFetch<ExperiencesListResponse>("/api/experiences/list", { method: "GET" });
}
export function createExperience(payload: ExperiencePayload, token: string) {
  return apiFetch<ExperienceResponse>("/api/experiences/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function updateExperience(id: string, payload: Partial<ExperiencePayload>, token: string) {
  return apiFetch<ExperienceResponse>(`/api/experiences/edit/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function deleteExperience(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(`/api/experiences/remove/${id}`, { method: "DELETE" }, token);
}

// ── Pricing ───────────────────────────────────────────────────────────────────

type PricingPayload = { name: string; price: number; description: string; features: string[]; featured?: boolean; visible?: boolean };
type PricingData = PricingPayload & { id: string; createdAt?: string; updatedAt?: string };
type PricingResponse = { success: boolean; data: PricingData };
type PricingListResponse = { success: boolean; data: PricingData[] };

export function fetchPricing() {
  return apiFetch<PricingListResponse>("/api/pricing/list", { method: "GET" });
}
export function createPricing(payload: PricingPayload, token: string) {
  return apiFetch<PricingResponse>("/api/pricing/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function updatePricing(id: string, payload: Partial<PricingPayload>, token: string) {
  return apiFetch<PricingResponse>(`/api/pricing/edit/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function deletePricing(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(`/api/pricing/remove/${id}`, { method: "DELETE" }, token);
}

// ── Education ─────────────────────────────────────────────────────────────────

type EducationPayload = { title: string; org: string; year: string; description: string; type: "degree" | "certification"; visible?: boolean };
type EducationData = EducationPayload & { id: string; createdAt?: string; updatedAt?: string };
type EducationResponse = { success: boolean; data: EducationData };
type EducationListResponse = { success: boolean; data: EducationData[] };

export function fetchEducation() {
  return apiFetch<EducationListResponse>("/api/education/list", { method: "GET" });
}
export function createEducation(payload: EducationPayload, token: string) {
  return apiFetch<EducationResponse>("/api/education/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function updateEducation(id: string, payload: Partial<EducationPayload>, token: string) {
  return apiFetch<EducationResponse>(`/api/education/edit/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function deleteEducation(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(`/api/education/remove/${id}`, { method: "DELETE" }, token);
}

// ── Testimonials ──────────────────────────────────────────────────────────────

type TestimonialPayload = { quote: string; name: string; role: string; visible?: boolean };
type TestimonialData = TestimonialPayload & { id: string; createdAt?: string; updatedAt?: string };
type TestimonialResponse = { success: boolean; data: TestimonialData };
type TestimonialsListResponse = { success: boolean; data: TestimonialData[] };

export function fetchTestimonials() {
  return apiFetch<TestimonialsListResponse>("/api/testimonials/list", { method: "GET" });
}
export function createTestimonial(payload: TestimonialPayload, token: string) {
  return apiFetch<TestimonialResponse>("/api/testimonials/add", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function updateTestimonial(id: string, payload: Partial<TestimonialPayload>, token: string) {
  return apiFetch<TestimonialResponse>(`/api/testimonials/edit/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }, token);
}
export function deleteTestimonial(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(`/api/testimonials/remove/${id}`, { method: "DELETE" }, token);
}

// ── Contact (public submit + authenticated list) ────────────────────────────

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

type ContactSubmitResponse = { success: boolean; data: ContactMessage };
type ContactListResponse = { success: boolean; data: ContactMessage[] };

export function submitContactMessage(payload: { name: string; email: string; subject?: string; message: string }) {
  return apiFetch<ContactSubmitResponse>(
    "/api/contact/submit",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

export function fetchContactMessages(token: string) {
  return apiFetch<ContactListResponse>("/api/contact/list", { method: "GET" }, token);
}

export function deleteContactMessage(id: string, token: string) {
  return apiFetch<{ success: boolean; message: string }>(`/api/contact/remove/${id}`, { method: "DELETE" }, token);
}
