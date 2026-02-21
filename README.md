# TaxApp

Full-stack tax calculator with a FastAPI backend and a Vite + React frontend.

## Features

- **Income Tax Calculation** — Progressive tax brackets with detailed breakdown
- **Deductions** — Social insurance, general health system (GHS), and expat exemptions
- **Family Deductions** — Based on family status and number of dependent children
- **Output** — Summary, itemized deductions, and tax bracket breakdown

## Tech Stack

- **Backend** — FastAPI, Pydantic, Python 3.12
- **Frontend** — React, Vite, Tailwind CSS, shadcn/ui
- **Containers** — Docker

## Local Development

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd TaxApp

2. Backend setup:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r backend/requirements.txt
   fastapi dev backend/main.py

3. Start the frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## Running with Docker Compose

```bash
docker-compose up --build
```

## Running the Backend with Docker

```bash
docker build -t tax-calculator -f backend/Dockerfile .
docker run -p 8000:8000 tax-calculator
```
