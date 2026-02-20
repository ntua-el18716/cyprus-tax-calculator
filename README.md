# TaxApp

Full-stack tax calculator with a FastAPI backend and a Vite + React frontend.

## Features

- **Income Tax Calculation** — Progressive tax brackets with detailed breakdown
- **Deductions** — Social insurance, general health system (GHS), and expat exemptions
- **Family Deductions** — Based on family status and number of dependent children
- **Flexible Inputs** — Support for different family statuses and expat income levels
- **Detailed Output** — Summary, itemized deductions, and tax bracket breakdown

## Tech Stack

- **Backend** — FastAPI, Pydantic, Python 3.12
- **Frontend** — React, Vite, Tailwind CSS
- **Containers** — Docker, Docker Compose

## Local Development

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd TaxApp
   ```

2. Backend setup:

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install backend dependencies:
  ```bash
  pip install -r backend/requirements.txt
  ```

4. Start the backend:
  ```bash
  fastapi run main
  ```

5. Start the frontend:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

The frontend dev server runs at `http://localhost:8080` (see [frontend/vite.config.ts](frontend/vite.config.ts)).
The backend runs at `http://localhost:8000` with docs at `/docs`.

## Running with Docker Compose

```bash
docker-compose up --build
```

This starts:
- Frontend: `http://localhost`
- Backend: `http://localhost:8000`

Note: When running in Docker, the frontend must call the backend using the Compose service name (`http://backend:8000`).

## Running the Backend with Docker

```bash
docker build -t tax-calculator -f backend/Dockerfile .
docker run -p 8000:8000 tax-calculator
```

## Example Usage

### Request

```bash
curl -X POST "http://localhost:8000/calculator" \
  -H "Content-Type: application/json" \
  -d '{
    "gross_income": 45000,
    "family_status": "single",
    "children_count": 0,
    "expat_excemption_status": "not_applicable"
  }'
```

### Response

```json
{
  "summary": {
    "gross_annual": 45000.0,
    "net_annual": 36829.2,
    "net_monthly_12": 3069.1,
    "net_monthly_13": 2833.02
  },
  "deductions": {
    "social_insurance": 3960.0,
    "ghs": 1192.5,
    "income_tax": 3018.3,
    "total_deductions": 8170.8
  },
  "details": {
    "income_tax_breakdown": [
      {
        "lower_bound": 0.0,
        "upper_bound": 22000.0,
        "rate": 0.0,
        "taxable_amount": 0.0,
        "tax": 0.0
      },
      {
        "lower_bound": 22000.0,
        "upper_bound": 32000.0,
        "rate": 0.2,
        "taxable_amount": 10000.0,
        "tax": 2000.0
      }
    ]
  }
}
```

## API Endpoint

### `POST /calculator`

**Input Parameters:**

- `gross_income` (float, required) — Gross annual salary (must be >= 0)
- `family_status` (enum, optional) — `"single"`, `"family"`, or `"single_parent"` (default: `"single"`)
- `children_count` (int, optional) — Number of dependent children (default: `0`, must be >= 0)
- `expat_excemption_status` (enum, optional) — `"not_applicable"` (0%), `"low_income"` (20%), or `"high_income"` (50%) (default: `"not_applicable"`)

**Output:**

Returns a structured JSON object with:

- `summary` — Gross, net annual, and monthly salary figures
- `deductions` — Itemized deductions including tax, social insurance, and GHS
- `details` — Detailed income tax breakdown by bracket

## License

MIT
