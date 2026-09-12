
### AI Resume Analyzer - Backend

Backend service for **ResuIQ**, an AI-powered resume analyzer that evaluates resumes and generates ATS scores, strengths, weaknesses, skill gaps, and personalized improvement recommendations.

Built using Flask with PostgreSQL for persistence, Redis/RQ for asynchronous processing, JWT for authentication, and Google Gemini for AI-powered resume analysis.

---

### Tech Stack

- **Python**
- **Flask**
- **PostgreSQL**
- **SQLAlchemy**
- **Flask-Migrate**
- **JWT Authentication**
- **Redis**
- **RQ (Redis Queue)**
- **Google Gemini API**
- **Gunicorn**
- **Docker**

---

## Features

- User registration and authentication
- JWT-based authentication
- Resume upload and management
- AI-powered resume analysis
- ATS score generation
- Strengths and weaknesses identification
- Skill-gap analysis
- Personalized improvement recommendations
- Asynchronous resume analysis using Redis and RQ
- PostgreSQL database persistence
- RESTful API architecture
- Health-check endpoint

---

### Project Structure

```text
backend/
│
├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── extensions.py
│   └── __init__.py
│
├── migrations/
│
├── run.py
├── requirements.txt
└── .env


### Directory Overview

| Directory/File      | Description                             |
| ------------------- | --------------------------------------- |
| `app/models/`       | Database models                         |
| `app/routes/`       | REST API routes                         |
| `app/services/`     | Business logic and application services |
| `app/utils/`        | Utility and helper functions            |
| `app/extensions.py` | Flask extension initialization          |
| `app/__init__.py`   | Flask application factory               |
| `migrations/`       | Database migration files                |
| `run.py`            | Application entry point                 |
| `requirements.txt`  | Python dependencies                     |
| `.env`              | Environment configuration               |

---

# Local Setup

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Resume-Analyser/backend
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

## 3. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Configuration

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

### Environment Variables

| Variable                   | Description                            |
| -------------------------- | -------------------------------------- |
| `DATABASE_URL`             | PostgreSQL database connection URL     |
| `JWT_SECRET_KEY`           | Secret key used for JWT authentication |
| `JWT_ACCESS_TOKEN_EXPIRES` | JWT access-token expiry configuration  |
| `MAX_FILE_SIZE`            | Maximum allowed resume file size       |
| `UPLOAD_FOLDER`            | Directory used for uploaded resumes    |
| `PROMPT_FOLDER`            | Location of AI prompts                 |
| `GEMINI_MODEL`             | Google Gemini model used for analysis  |
| `GEMINI_API_KEY`           | Google Gemini API key                  |
| `REDIS_HOST`               | Redis host                             |
| `REDIS_PORT`               | Redis port                             |
| `REDIS_DB`                 | Redis database number                  |
| `FRONTEND_URL`             | Frontend application URL               |

> **Important:** Never commit `.env` or expose your Gemini API key, database credentials, or JWT secret.

---

# Database Setup

Make sure PostgreSQL is installed and running.

Create the database specified in your `DATABASE_URL`.

Run the existing database migrations:

```bash
flask db upgrade
```

If you need to create a new migration after modifying the models:

```bash
flask db migrate -m "your migration message"
```

Then apply it:

```bash
flask db upgrade
```

---

# Redis Setup

Redis is required for asynchronous resume analysis using RQ.

Make sure Redis is running locally with:

```text
Host: localhost
Port: 6379
Database: 0
```

---

# Run the Backend

Start the Flask application:

```bash
python run.py
```

The backend will be available at:

```text
http://localhost:5000
```

---

# Run the RQ Worker

Resume analysis is processed asynchronously using Redis Queue.

From the `backend` directory, start the worker:

```bash
python -m app.queue.worker
```

The worker consumes analysis jobs from Redis and processes resume analysis in the background.

---

# API Endpoints

## Health Check

### Request

```http
GET /health
```

### Response

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

Authentication returns an access token that is used to access protected endpoints.

---

## Resume Management

```http
POST /resume/upload
GET /resume
GET /resume/<id>
DELETE /resume/<id>
```

These endpoints provide functionality for uploading, retrieving, and managing resumes.

---

## Resume Analysis

### Start Analysis

```http
POST /resume/analysis/<id>
```

Starts the AI-powered analysis process for the selected resume.

### Get Analysis

```http
GET /resume/analysis/<id>
```

Retrieves the analysis results and processing status.

---

# Application Architecture

The backend follows a layered architecture separating API routes, business logic, database operations, and background processing.

```text
                         ┌─────────────────┐
                         │     Frontend    │
                         │ React + Vite    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Flask REST    │
                         │      API        │
                         └────────┬────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              ┌──────────┐ ┌───────────┐ ┌─────────────┐
              │PostgreSQL│ │   Redis   │ │    Gemini   │
              │ Database │ │    / RQ   │ │     API     │
              └──────────┘ └─────┬─────┘ └─────────────┘
                                 │
                                 ▼
                         ┌─────────────────┐
                         │   RQ Worker     │
                         │ Background Jobs │
                         └─────────────────┘
```

### Request Flow

```text
Resume Upload
      │
      ▼
Flask API
      │
      ├── Store resume metadata
      │
      └── Create analysis job
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
        Store analysis results
                │
                ▼
           PostgreSQL
                │
                ▼
             Frontend
```

---

# Authentication

The backend uses **JWT-based authentication**.

After successful login, the API returns an access token.

Protected endpoints require the token in the request header:

```http
Authorization: Bearer <access_token>
```

---

# AI Resume Analysis

The application uses the **Google Gemini API** to analyze uploaded resumes.

The analysis can provide:

* ATS score
* Resume strengths
* Resume weaknesses
* Missing or relevant skills
* Personalized improvement recommendations

The AI processing is handled asynchronously using **Redis and RQ**, allowing longer-running analysis tasks to be processed separately from the API request.

---

# Production

The Flask application can be served using Gunicorn:

```bash
gunicorn "app:create_app()"
```

Production environments should provide environment-specific configuration for:

* PostgreSQL
* Redis
* Google Gemini API
* JWT secret
* Frontend URL

---

# Security Notes

* Store secrets in environment variables.
* Never commit `.env` to source control.
* Use a strong random value for `JWT_SECRET_KEY`.
* Do not expose API keys in frontend code.
* Configure CORS only for trusted frontend origins in production.
* Validate uploaded files before processing.

---

# Development

Run the application locally:

```bash
python run.py
```

Run the background worker separately:

```bash
python -m app.queue.worker
```

The frontend can then communicate with the backend through the REST API.

---

# Author

**Pradyumn Choudhary**

---

## License

This project is developed for learning and portfolio purposes.

```

**One correction before you paste it:** if your actual worker module is not `app.queue.worker`, change that command to whatever module you currently use. Everything else above follows the backend structure and functionality you've described.
```
