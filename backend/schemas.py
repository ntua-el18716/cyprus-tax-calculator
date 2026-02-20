from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Summary(BaseModel):
    gross_annual: float = Field(..., description="Gross Annual Salary")
    net_annual: float = Field(..., description="Net Annual Salary")
    net_monthly_12: float = Field(..., description="Net Monthly Salary")
    net_monthly_13: Optional[float] = Field(..., description="Net Monthly Salary")


class Deductions(BaseModel):
    social_insurance: float = Field(..., description="Social Insurance Value")
    ghs: float = Field(..., description="General Health System Value")
    income_tax: float = Field(..., description="Total Income Tax")
    family_deduction: float = Field(
        ..., description="Reductions related to the number of dependent children"
    )
    total_deductions: float = Field(
        ..., description="Total Deductions (ghs, social insurance, exemptions, etc)"
    )


class IncomeTaxBreakdown(BaseModel):
    lower_bound: float = Field(..., description="Lower bound of tax bracket")
    upper_bound: Optional[float] = Field(..., description="Upper bound of tax bracket")
    rate: float = Field(..., description="Taxation Rate of tax bracket")
    taxable_amount: float = Field(
        ..., description="Amount of the salary that is taxable"
    )
    tax: float = Field(..., description="The income tax substracted from the salary")


class Details(BaseModel):
    income_tax_breakdown: list[IncomeTaxBreakdown]


class FamilyStatus(str, Enum):
    single = "single"
    married = "family"
    divorced = "single_parent"


class ExpatExcemptionStatus(int, Enum):
    not_applicable = 0
    low_income = 20
    high_income = 50


class InputParameters(BaseModel):
    gross_income: float = Field(..., ge=0, description="Gross Annual Salary")
    family_status: Optional[FamilyStatus] = Field(
        FamilyStatus.single,
        description="Family status of the employee (single, married, divorced)",
    )
    children_count: int = Field(0, ge=0, description="Number of dependent children")
    total_children_count: int = Field(0, ge=0, description="Number of total children")
    expat_excemption_status: Optional[ExpatExcemptionStatus] = Field(
        ExpatExcemptionStatus.not_applicable,
        description="Expat exemption status of the employee (not applicable, low income, high income)",
    )


class Output(BaseModel):
    summary: Summary
    deductions: Deductions
    details: Details
