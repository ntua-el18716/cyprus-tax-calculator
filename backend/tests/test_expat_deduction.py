from backend.data import calculate_expat_deduction
from backend.schemas import ExpatExcemptionStatus


def test_low_no_expat_exemption():
    result = calculate_expat_deduction(100000, ExpatExcemptionStatus.not_applicable)
    assert result == 0


def test_low_income_expat_exemption():
    result = calculate_expat_deduction(30000, ExpatExcemptionStatus.low_income)
    # 30000 * 0.20 = 6000
    assert result == 6000


def test_low_income_expat_exemption_above_max_limit():
    result = calculate_expat_deduction(50000, ExpatExcemptionStatus.low_income)
    # 50000 * 0.20 = 10000 > 8550
    assert result == 8550


def test_low_income_expat_exemption_at_max_limit():
    result_above = calculate_expat_deduction(42751, ExpatExcemptionStatus.low_income)
    result_below = calculate_expat_deduction(42749, ExpatExcemptionStatus.low_income)
    # 8550 = 0.20 * x => X = 42750
    # x+ = 42753
    # 42751 * 0.20 = 8550.2 > 8550
    # x- = 42753
    # 42749 * 0.20 = 8549.8 < 8550

    assert result_above == 8550
    assert result_below == 8549.8


def test_high_income_expat_exemption():
    result = calculate_expat_deduction(150000, ExpatExcemptionStatus.high_income)
    # 150000 * 0.5 = 75000
    assert result == 75000
