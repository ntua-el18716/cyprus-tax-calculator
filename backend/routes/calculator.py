from fastapi import APIRouter

from backend.data import calculate_all
from backend.schemas import InputParameters, Output

router = APIRouter(prefix="", tags=["calculator"])


@router.post("/calculator", response_model=Output)
def calculate(payload: InputParameters):
    res = calculate_all(
        gross_income=payload.gross_income,
        family_status=payload.family_status,
        children_count=payload.children_count,
        total_children_count=payload.total_children_count,
        expat_excemption_status=payload.expat_excemption_status,
    )
    return res
