from fastapi.testclient import TestClient

from backend.main import app
from backend.schemas import FamilyStatus, ExpatExcemptionStatus

client = TestClient(app)


def test_valid_request_returns_200():
    """Valid POST request should return 200 and correct structure"""
    response = client.post(
        "/calculator",
        json={
            "gross_income": 50000,
            "family_status": FamilyStatus.single,
            "children_count": 0,
            "expat_excemption_status": ExpatExcemptionStatus.not_applicable,
        },
    )
    assert response.status_code == 200
    data = response.json()

    assert "summary" in data
    assert "deductions" in data
    assert "details" in data
    assert data["summary"]["gross_annual"] == 50000


def test_missing_required_field():
    """Missing gross_income should return 422"""
    response = client.post(
        "/calculator",
        json={
            "family_status": FamilyStatus.single,
            "children_count": 0,
            "expat_excemption_status": ExpatExcemptionStatus.not_applicable,
        },
    )
    assert response.status_code == 422


def test_negative_income_validation():
    """Negative gross_income should return 422"""
    response = client.post(
        "/calculator",
        json={
            "gross_income": -5000,
            "family_status": FamilyStatus.single,
            "children_count": 0,
            "expat_excemption": ExpatExcemptionStatus.high_income,
        },
    )
    assert response.status_code == 422


def test_zero_income_is_valid():
    """Zero gross_income should return 200"""
    response = client.post(
        "/calculator",
        json={
            "gross_income": 0,
            "family_status": FamilyStatus.single,
            "children_count": 0,
            "expat_excemption": ExpatExcemptionStatus.high_income,
        },
    )
    assert response.status_code == 200


def test_invalid_family_status():
    """Invalid enum value should return 422"""
    response = client.post(
        "/calculator",
        json={
            "gross_income": 50000,
            "family_status": "Invalid Family Status",
            "children_count": 0,
            "expat_excemption": ExpatExcemptionStatus.not_applicable,
        },
    )
    assert response.status_code == 422


def test_negative_children_count():
    """Negative children_count should return 422"""
    response = client.post(
        "/calculator",
        json={"gross_income": 45000, "family_status": "single", "children_count": -1},
    )
    assert response.status_code == 422


def test_optional_fields_can_be_omitted():
    """Request with only required field should work"""
    response = client.post("/calculator", json={"gross_income": 50000})

    assert response.status_code == 200
    data = response.json()
    assert data["summary"]["gross_annual"] == 50000


def test_all_fields_provided():
    """Request with all fields should work"""
    response = client.post(
        "/calculator",
        json={
            "gross_income": 60000,
            "family_status": "family",
            "children_count": 2,
            "expat_excemption_status": 20,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["summary"]["gross_annual"] == 60000
