```text
Resume-Analyser/README.md
```

````markdown
# ResuIQ - AI Resume Analyzer

ResuIQ is a full-stack AI-powered resume analyzer that evaluates resumes and provides ATS scores, strengths, weaknesses, skill gaps, and personalized improvement recommendations.

The application uses a React-based frontend and Flask backend, with PostgreSQL for data persistence, Redis/RQ for asynchronous processing, and Google Gemini for AI-powered resume analysis.

---

## Features

- User registration and login
- JWT-based authentication
- Resume upload and management
- AI-powered resume analysis
- ATS score generation
- Strengths and weaknesses analysis
- Skill-gap identification
- Personalized improvement recommendations
- Asynchronous resume analysis using Redis and RQ
- PostgreSQL database persistence
- REST API architecture
- Responsive React interface
- Analysis status polling
- Protected application routes

---

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend

- Python
- Flask
- SQLAlchemy
- Flask-Migrate
- JWT Authentication
- REST APIs
- PostgreSQL
- Redis
- RQ (Redis Queue)
- Google Gemini API
- Gunicorn


---

## Project Structure

```text
Resume-Analyser/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── extensions.py
│   │   └── __init__.py
│   │
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── landing/
│   │   │   └── layout/
│   │   │
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
````

---

# Application Architecture

```text
                         ┌────────────────────┐
                         │   React Frontend   │
                         │   Vite + Tailwind  │
                         └──────────┬─────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌────────────────────┐
                         │    Flask Backend   │
                         │      REST APIs     │
                         └──────┬─────┬───────┘
                                │     │
                 ┌──────────────┘     └──────────────┐
                 │                                   │
                 ▼                                   ▼
        ┌─────────────────┐                 ┌─────────────────┐
        │   PostgreSQL    │                 │  Redis / RQ     │
        │    Database     │                 │ Background Jobs │
        └─────────────────┘                 └────────┬────────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │    RQ Worker    │
                                            └────────┬────────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │ Google Gemini   │
                                            │      API        │
                                            └─────────────────┘
```

---

# Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ├── Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Dashboard
 │
 ├── Upload Resume
 │
 ▼
Flask REST API
 │
 ├── Store Resume Metadata
 │
 └── Create Analysis Job
            │
            ▼
          Redis
            │
            ▼
        RQ Worker
            │
            ▼
      Google Gemini API
            │
            ▼
      Store Analysis
            │
            ▼
        PostgreSQL
            │
            ▼
      React Dashboard
```

---

# Backend Setup

## Prerequisites

Make sure the following are installed:

* Python 3.x
* PostgreSQL
* Redis
* Git

---

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Resume-Analyser
```

---

## 2. Navigate to Backend

```bash
cd backend
```

---

## 3. Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Backend Environment Variables

Create a `.env` file inside the `backend` directory.

```env
DATABASE_URL=postgresql://username@localhost:5432/resume_analyser

JWT_SECRET_KEY=change-this-to-a-random-secret
JWT_ACCESS_TOKEN_EXPIRES=15

MAX_FILE_SIZE=5242880
UPLOAD_FOLDER=uploads
PROMPT_FOLDER=app/prompt

GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

FRONTEND_URL=http://localhost:5173
```

### Environment Variable Description

| Variable                   | Description                           |
| -------------------------- | ------------------------------------- |
| `DATABASE_URL`             | PostgreSQL database connection        |
| `JWT_SECRET_KEY`           | Secret used for JWT authentication    |
| `JWT_ACCESS_TOKEN_EXPIRES` | JWT access-token expiry configuration |
| `MAX_FILE_SIZE`            | Maximum allowed uploaded file size    |
| `UPLOAD_FOLDER`            | Resume upload directory               |
| `PROMPT_FOLDER`            | AI prompt directory                   |
| `GEMINI_MODEL`             | Gemini model used for analysis        |
| `GEMINI_API_KEY`           | Google Gemini API key                 |
| `REDIS_HOST`               | Redis host                            |
| `REDIS_PORT`               | Redis port                            |
| `REDIS_DB`                 | Redis database                        |
| `FRONTEND_URL`             | Frontend URL                          |

> Never commit `.env` or expose API keys and secrets in source control.

---

# Database Setup

Make sure PostgreSQL is running and the database specified in `DATABASE_URL` exists.

Apply existing migrations:

```bash
flask db upgrade
```

After modifying database models, create a migration:

```bash
flask db migrate -m "your migration message"
```

Then apply it:

```bash
flask db upgrade
```

---

# Redis Setup

Redis is used for asynchronous resume analysis through RQ.

For local development, use:

```text
Host: localhost
Port: 6379
Database: 0
```

Make sure Redis is running before starting the RQ worker.

---

# Run the Backend

From the `backend` directory:

```bash
python run.py
```

The backend runs on:

```text
http://localhost:5000
```

---

# Run the RQ Worker

Open another terminal and activate the backend virtual environment.

From the `backend` directory:

```bash
python -m app.queue.worker
```

The worker processes resume-analysis jobs submitted through the backend.

---

# Backend API

## Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

---

## Authentication

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

---

## Resume Management

```http
POST /resume/upload
GET /resume
GET /resume/<id>
DELETE /resume/<id>
```

---

## Resume Analysis

### Start Analysis

```http
POST /resume/analysis/<id>
```

### Get Analysis

```http
GET /resume/analysis/<id>
```

---

# JWT Authentication

The application uses JWT-based authentication.

After successful login, the backend returns an access token.

Protected API requests use:

```http
Authorization: Bearer <access_token>
```

The frontend manages the access token and attaches it to authenticated API requests.

---

# AI Resume Analysis

ResuIQ uses the Google Gemini API to analyze resume content.

The analysis provides:

* ATS score
* Resume strengths
* Resume weaknesses
* Skill gaps
* Personalized improvement recommendations

AI-intensive processing is handled asynchronously through Redis and RQ.

---

# Frontend Setup

Open a new terminal from the repository root.

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

# Frontend Environment Variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

For the deployed backend:

```env
VITE_API_URL=https://resume-analyser-hpni.onrender.com
```

> Vite environment variables prefixed with `VITE_` are exposed to the browser. Do not store API keys or other secrets in frontend environment variables.

---

# Run the Frontend

From the `frontend` directory:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# Build the Frontend

Create a production build:

```bash
npm run build
```

The generated files will be available in:

```text
frontend/dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

# Frontend Pages

## Landing Page

Introduces ResuIQ and provides access to authentication.

## Register

Allows new users to create an account.

## Login

Authenticates existing users using email and password.

## Dashboard

Authenticated users can:

* Upload resumes
* View resumes
* Start resume analysis
* View analysis status
* Access analysis results

## Analysis

Displays the AI-generated resume analysis, including:

* ATS score
* Strengths
* Weaknesses
* Skill gaps
* Recommendations

---

# Frontend Architecture

The frontend is organized into reusable components and application layers.

```text
src/
│
├── components/     # Reusable UI components
├── context/        # Application state and authentication
├── pages/          # Application pages
├── routes/         # Route configuration
├── services/       # API services
├── utils/          # Utility functions
├── config/         # Application configuration
├── App.jsx         # Root component
└── main.jsx        # Application entry point
```

---

# Production

The backend can be served using Gunicorn:

```bash
gunicorn "app:create_app()"
```

The frontend can be built using:

```bash
npm run build
```

Production deployments should provide environment-specific configuration for:

* PostgreSQL
* Redis
* Google Gemini API
* JWT secret
* Frontend URL
* Backend API URL

---

# Deployment

The application can be deployed using separate services for the frontend and backend.

### Backend

The Flask backend can be deployed as a web service with:

* PostgreSQL database
* Redis-compatible key-value store
* Environment variables
* Gunicorn

### Frontend

The React frontend can be deployed as a static web application.

Configure the frontend API URL using:

```env
VITE_API_URL=<DEPLOYED_BACKEND_URL>
```

---

# Security

* Keep secrets in environment variables.
* Never commit `.env` files.
* Never expose Gemini API keys in frontend code.
* Use a strong random JWT secret.
* Validate uploaded files before processing.
* Configure CORS for trusted frontend origins in production.

---

# Future Improvements

* Resume-to-job-description matching
* Job-specific resume optimization
* Support for additional document formats
* Improved analysis history and comparison
* Additional AI models
* Enhanced resume recommendations
* Automated deployment pipelines

---

# Author

**Pradyumn Choudhary**

---

## License

This project is developed for learning and portfolio purposes.

````

### Your final repository structure

After deleting the two README files, you should have:

```text
Resume-Analyser/
│
├── README.md              ← keep this one
│
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
````

**One thing to check before committing:** make sure `.env` is in `.gitignore` for both frontend and backend. Your README only contains placeholder credentials, which is safe to publish.
