from backend.data import calculate_all
from backend.schemas import FamilyStatus, ExpatExcemptionStatus

#  gross_income: float,
#     family_status="single",
#     children_count=0,
#     expat_excemption_status=ExpatExcemptionStatus.not_applicable,


def tests_basic_single_no_deductions():
    """Single, no children, no expat excemption"""
    result = calculate_all(
        gross_income=30000,
        family_status=FamilyStatus.single,
        children_count=0,
        expat_excemption_status=ExpatExcemptionStatus.not_applicable,
    )
    assert "summary" in result
    assert "deductions" in result
    assert "details" in result

    # Verify gross matches input
    assert result["summary"]["gross_annual"] == 30000

    # Verify net is less than gross
    assert result["summary"]["net_annual"] < 30000

    # Verify monthly calculations
    net_annual = result["summary"]["net_annual"]
    assert result["summary"]["net_monthly_12"] == round(net_annual / 12, 2)
    assert result["summary"]["net_monthly_13"] == round(net_annual / 13, 2)


def test_high_income_above_family_limit():
    """Income > 150k, 4 children, should not get family deduction"""
    result = calculate_all(
        160000, FamilyStatus.single, 4, ExpatExcemptionStatus.not_applicable
    )

    # Should still calculate correctly
    assert result["summary"]["gross_annual"] == 160000
    assert result["summary"]["net_annual"] > 0


def test_all_features_combined():
    """Married, 3 children, high expat exemption"""
    result = calculate_all(
        gross_income=80000,
        family_status=FamilyStatus.married,
        children_count=3,
        expat_excemption_status=ExpatExcemptionStatus.high_income,
    )
    assert result["summary"]["net_annual"] > 0
    assert result["summary"]["net_annual"] < 80000
    assert result["deductions"]["total_deductions"] > 0


def test_zero_income():
    """Edge case: zero income"""
    result = calculate_all(
        0, FamilyStatus.single, 0, ExpatExcemptionStatus.not_applicable
    )

    assert result["summary"]["gross_annual"] == 0
    assert result["summary"]["net_annual"] == 0
    assert result["deductions"]["income_tax"] == 0
