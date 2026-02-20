import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./components/ui/item";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import DeductionsSection from "./components/DeductionsSection";
import { useState } from "react";

export interface taxResultProps {
  summary: {
    gross_annual: number;
    net_annual: number;
    net_monthly_12: number;
    net_monthly_13: number;
  };
  deductions: {
    social_insurance: number;
    ghs: number;
    income_tax: number;
    family_deduction: number;
    total_deductions: number;
  };
  details: {
    income_tax_breakdown: {
      lower_bound: number;
      upper_bound: number | null;
      rate: number;
      taxable_amount: number;
      tax: number;
    }[];
  };
}

export default function TaxResult({ data }: { data: taxResultProps }) {
  const [numOfMonths, setNumOfMonths] = useState("12");

  return (
    <div className="w-full">
      <div className="flex flex-row w-full gap-6 px-20 py-5">
        {/* Tax Payable */}
        <Item variant="outline" className="w-full">
          <ItemContent className="text-center flex gap-2">
            <ItemDescription className="font-semibold uppercase">
              Tax Payable
            </ItemDescription>
            <ItemTitle className="text-2xl font-bold text-center">
              €{data.deductions.income_tax.toFixed(2)}
            </ItemTitle>
          </ItemContent>
        </Item>
        {/* Net Monthly Wage */}
        <Item variant="outline" className="w-full">
          <ItemContent className="text-center">
            <ItemDescription className="font-semibold uppercase">
              Net Monthly Wage
            </ItemDescription>
            <div className="flex flex-row justify-between">
              <ItemTitle className="text-2xl font-bold">
                €
                {numOfMonths == "12"
                  ? data.summary.net_monthly_12.toFixed(2)
                  : data.summary.net_monthly_13.toFixed(2)}
              </ItemTitle>
              <ItemActions>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={numOfMonths}
                  onValueChange={(value) => value && setNumOfMonths(value)}
                >
                  <ToggleGroupItem value="12">12</ToggleGroupItem>
                  <ToggleGroupItem value="13">13</ToggleGroupItem>
                </ToggleGroup>
              </ItemActions>
            </div>
          </ItemContent>
        </Item>
      </div>
      {/* Deductions & Tax Breakdown */}

      <DeductionsSection
        deductions={data.deductions}
        details={data.details}
        numOfMonths={Number(numOfMonths)}
      />
    </div>
  );
}
