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

Create a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:port/database_name
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
