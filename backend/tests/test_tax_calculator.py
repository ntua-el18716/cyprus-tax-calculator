from backend.data import calculate_income_tax


def test_zero_income():
    result = calculate_income_tax(0)
    assert result["value"] == 0


def test_in_first_bracket():
    result = calculate_income_tax(20000)
    assert result["value"] == 0


def test_income_at_first_bracket_boundary():
    result = calculate_income_tax(22000)
    assert result["value"] == 0


def test_income_in_second_bracket():
    result = calculate_income_tax(25000)
    # 25000 - 22000 - 1 = 2999 * 0.20 = 599.8
    assert round(result["value"], 2) == 599.80


def test_income_at_second_bracket_boundary():
    result = calculate_income_tax(32000)
    # (32000 - 22000 - 1) * 0.20 = 2000
    assert round(result["value"], 2) == 1999.80


def test_income_in_third_bracket():
    result = calculate_income_tax(37000)
    # First: (32000-22000)*0.20 = 2000
    # Second: (37000-32000-1)*0.25 = 1249.75
    # Total = 3249.75
    assert round(result["value"], 2) == 3249.75


def test_income_in_fourth_bracket():
    result = calculate_income_tax(50000)
    # (32000-22000)*0.20 + (42000-32000)*0.25 + (50000-42000-1)*0.30
    # = 2000 + 2500 + 2399.7 = 6899.7
    assert round(result["value"], 2) == 6899.70


def test_income_in_highest_bracket():
    result = calculate_income_tax(100000)
    # (32000-22000)*0.20 + (42000-32000)*0.25 + (72000-42000)*0.30 + (100000-72000-1)*0.35
    # = 2000 + 2500 + 9000 + 9799.65 = 23299.65
    assert round(result["value"], 2) == 23299.65


def test_breakdown_structure():
    result = calculate_income_tax(25000)
    assert "breakdown" in result
    assert isinstance(result["breakdown"], list)
    assert len(result["breakdown"]) == 5
