# Full-Stack Student Portfolio

This project is a beginner-friendly portfolio web application for a graduating student who wants to become a full-stack developer. It uses Django and Django REST Framework for the backend, React with Tailwind CSS for the frontend, and SQLite for storage so it stays compatible with the PythonAnywhere free tier.

## Tech Stack

- Backend: Django, Django REST Framework, django-cors-headers
- Frontend: React (functional components), Vite, Tailwind CSS
- Database: SQLite

## Project Structure

```text
portfolio/
├── config/
│   ├── settings.py
│   └── urls.py
├── portfolio/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   ├── tests.py
│   └── migrations/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   └── sections/
│   ├── package.json
│   └── .env.example
├── manage.py
└── requirements.txt
```

## Backend Overview

### What each backend part does

- `config/settings.py` defines Django, SQLite, REST framework, CORS, and static settings.
- `portfolio/models.py` stores projects, skills, and contact messages.
- `portfolio/serializers.py` converts models to JSON and validates submitted contact data.
- `portfolio/views.py` exposes the REST API using DRF `APIView`.
- `portfolio/urls.py` keeps all requested API routes under `/api/`.
- `portfolio/migrations/0002_seed_portfolio_data.py` inserts sample data for skills and projects.

### API Endpoints

- `GET /api/projects/`
- `GET /api/skills/`
- `POST /api/contact/`

### How the backend works

1. The React frontend sends requests to the Django API.
2. Django views load data from SQLite through the models.
3. DRF serializers shape the API response and validate incoming input.
4. Contact messages are stored in SQLite and can be viewed in Django admin.

## Frontend Overview

### What each frontend part does

- `frontend/src/App.jsx` renders the full one-page portfolio layout.
- `frontend/src/api.js` contains all requests to the backend API.
- `frontend/src/sections/SkillsSection.jsx` fetches skills and handles loading/error states.
- `frontend/src/sections/ProjectsSection.jsx` fetches projects and renders project cards.
- `frontend/src/sections/ContactSection.jsx` posts form data and displays success/error feedback.
- `frontend/src/index.css` includes Tailwind layers and custom theme styling.

### How components interact

1. `App.jsx` renders the page sections.
2. The skills and projects sections call helper functions from `api.js`.
3. `api.js` reads `VITE_API_BASE_URL` so local and production URLs can differ.
4. The contact section posts JSON to Django and reacts to the returned message.

## Running the Backend

Install backend packages:

```powershell
py -m pip install -r requirements.txt
```

Apply migrations and load sample data:

```powershell
py manage.py migrate
```

Start the backend:

```powershell
py manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

## Running the Frontend

Node.js is required for the frontend. Inside `frontend/`, run:

```powershell
npm install
copy .env.example .env
npm run dev
```

The React app will run at `http://127.0.0.1:5173/`.

## Connecting Frontend to Backend

Use the environment variable in `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Update that value for production after deployment.

## PythonAnywhere Notes

- SQLite is used for free-tier compatibility.
- No external APIs or external databases are required.
- Collect static files with `py manage.py collectstatic`.
- If React is served from the same domain in production, the CORS list can be tightened.

## Beginner Notes

- Sample projects and skills are added automatically by migration.
- Contact submissions are stored locally in SQLite.
- Django admin can be used to update content without changing code.
