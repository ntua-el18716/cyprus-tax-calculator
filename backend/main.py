from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.calculator import router as calculator_router


app = FastAPI(
    title="Tax Calculator API",
    version="0.1.0",
    description="A mini production-style API built with FastAPI",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost",
        "http://localhost:80",
        "http://localhost:3000",
        "https://cyprus-tax-calculator-frontend.onrender.com",
    ],
    allow_credentials=True,  # Allow cookies/auth headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc)
    allow_headers=["*"],  # Allow all headers (Content-Type, etc)
)


app.include_router(calculator_router)
