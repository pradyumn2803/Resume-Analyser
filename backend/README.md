# AI Resume Analyzer

## Project Structure

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
├── run.py
├── requirements.txt
└── .env
```

## Local Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file in backend:

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

### Run Application

```bash
python run.py
```

## Health Check

Endpoint:

```http
GET /health
```

Response:

```json
{
  "status": "healthy"
}
```

## Author

Pradyumn Choudhary
