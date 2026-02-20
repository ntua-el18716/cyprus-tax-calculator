from backend.schemas import FamilyStatus, ExpatExcemptionStatus

tax_brackets = [
    {"lower_bound": 0, "upper_bound": 22000, "rate": 0},
    {"lower_bound": 22000, "upper_bound": 32000, "rate": 0.20},
    {"lower_bound": 32000, "upper_bound": 42000, "rate": 0.25},
    {"lower_bound": 42000, "upper_bound": 72000, "rate": 0.30},
    {"lower_bound": 72000, "upper_bound": None, "rate": 0.35},
]

SOCIAL_INSURANCE_CAP = 68904
GHS_CAP = 68904


def calculate_income_tax(gross_income: float):
    result = []
    income_tax_value = 0.0

    for bracket in tax_brackets:
        lower_bound = bracket["lower_bound"]
        upper_bound = bracket["upper_bound"]
        rate = bracket["rate"]

        info_per_bracket = {
            "lower_bound": lower_bound,
            "upper_bound": upper_bound,
            "rate": rate,
            "taxable_amount": 0.0,
            "tax": 0.0,
        }

        if upper_bound is None or gross_income <= upper_bound:
            taxable_amount = max(0, gross_income - lower_bound - 1)
            info_per_bracket["taxable_amount"] = taxable_amount

            tax = taxable_amount * rate
            income_tax_value += tax
            info_per_bracket["tax"] = round(tax, 2)

        else:
            taxable_amount = upper_bound - lower_bound
            info_per_bracket["taxable_amount"] = taxable_amount
            tax = taxable_amount * rate
            income_tax_value += tax
            info_per_bracket["tax"] = round(tax, 2)
        result.append(info_per_bracket)
    income_tax = {"value": income_tax_value, "breakdown": result}
    return income_tax


def calculate_family_deduction(
    family_status: FamilyStatus,
    children_count: int,
    total_children_count: int,
    gross_income: float,
):
    if family_status == FamilyStatus.divorced:
        multiplier = 2
    else:
        multiplier = 1

    if family_status == FamilyStatus.single:
        limit = 40000
    elif total_children_count <= 2:
        limit = 100000
    elif total_children_count <= 4:
        limit = 150000
    else:
        limit = 200000

    if gross_income > limit:
        print(limit)
        return 0
    if not children_count:
        return 0
    elif children_count == 1:
        return 1000 * multiplier
    elif children_count == 2:
        return (1000 + 1250) * multiplier
    else:
        return (1000 + 1250 + (children_count - 2) * 1500) * multiplier


def calculate_expat_deduction(
    gross_income: float, expat_excemption_status: ExpatExcemptionStatus
):
    if expat_excemption_status == ExpatExcemptionStatus.low_income:
        return min(expat_excemption_status * gross_income / 100, 8550)
    else:
        return expat_excemption_status * gross_income / 100


def calculate_all(
    gross_income: float,
    family_status="single",
    children_count=0,
    total_children_count=0,
    expat_excemption_status=ExpatExcemptionStatus.not_applicable,
):
    # Calculate deductions
    ## Social Insurance
    social_insurance = min(gross_income, SOCIAL_INSURANCE_CAP) * 0.088
    ## General Healthcare System
    ghs = min(gross_income * 0.0265, GHS_CAP)

    ## Expat Deduction
    expat_deduction = calculate_expat_deduction(gross_income, expat_excemption_status)

    ## Family Deduction
    family_deduction = calculate_family_deduction(
        family_status, children_count, total_children_count, gross_income
    )
    taxable_income = float(
        gross_income - ghs - social_insurance - expat_deduction - family_deduction
    )

    income_tax = calculate_income_tax(taxable_income)

    total_deductions = income_tax["value"] + social_insurance + ghs

    net_annual = gross_income - total_deductions
    net_monthly_12 = net_annual / 12
    net_monthly_13 = net_annual / 13

    result = {
        "summary": {
            "gross_annual": gross_income,
            "net_annual": round(net_annual, 2),
            "net_monthly_12": round(net_monthly_12, 2),
            "net_monthly_13": round(net_monthly_13, 2),
        },
        "deductions": {
            "social_insurance": social_insurance,
            "ghs": ghs,
            "income_tax": round(income_tax["value"], 2),
            "family_deduction": round(family_deduction, 2),
            "total_deductions": round(total_deductions, 2),
        },
        "details": {
            "income_tax_breakdown": income_tax["breakdown"],
        },
    }
    return result
