const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000/api" : "/api");

// Small helper functions keep the fetch logic readable inside the components.
export async function fetchProjects() {
  const response = await fetch(`${API_BASE_URL}/projects/`);
  if (!response.ok) {
    throw new Error("Unable to load projects right now.");
  }
  return response.json();
}

export async function fetchSkills() {
  const response = await fetch(`${API_BASE_URL}/skills/`);
  if (!response.ok) {
    throw new Error("Unable to load skills right now.");
  }
  return response.json();
}

export async function fetchPortfolioCvText() {
  const documentPaths = [
    "/documents/alpie-guevarra-cv.txt",
    "/static/documents/alpie-guevarra-cv.txt",
  ];

  for (const path of documentPaths) {
    const response = await fetch(path);
    if (response.ok) {
      return response.text();
    }
  }

  throw new Error("Unable to load the CV text right now.");
}

export async function sendContactMessage(formData) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to send your message right now.");
  }

  return data;
}
