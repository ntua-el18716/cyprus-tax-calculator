from backend.data import calculate_family_deduction

from backend.schemas import FamilyStatus


def test_no_children():
    result = calculate_family_deduction(FamilyStatus.single, 0, 0, 50000)
    assert result == 0


def test_one_child_under_limit():
    result = calculate_family_deduction(FamilyStatus.married, 1, 0, 50000)
    assert result == 1000


def test_one_child_above_limit():
    result = calculate_family_deduction(FamilyStatus.married, 1, 0, 100001)
    assert result == 0


def test_two_children_above_limit():
    result = calculate_family_deduction(FamilyStatus.married, 2, 0, 100001)
    assert result == 0


def test_three_children_under_limit():
    result = calculate_family_deduction(FamilyStatus.married, 3, 50000)
    assert result == 3750


def test_three_children_above_limit():
    result = calculate_family_deduction(FamilyStatus.married, 3, 150001)
    assert result == 0


def test_more_than_four_children_under_limit():
    result = calculate_family_deduction(FamilyStatus.married, 6, 170000)
    assert result == (2250 + 4 * 1500)


def test_more_than_four_children_above_limit():
    result = calculate_family_deduction(FamilyStatus.married, 6, 270000)
    assert result == 0


def test_exactly_at_limit():
    result = calculate_family_deduction(FamilyStatus.single, 2, 100000)
    assert result == 2250
