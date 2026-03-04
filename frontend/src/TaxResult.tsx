import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import DeductionsSection from "./components/DeductionsSection";
import { TaxDonutChart } from "./components/TaxDonutChart";
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
    <div className="flex flex-col gap-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-xl p-5 bg-primary text-primary-foreground">
          <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
            Net Annual
          </span>
          <span className="text-2xl font-semibold font-mono tracking-tight">
            €{data.summary.net_annual.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl p-5 bg-accent text-accent-foreground">
          <span className="text-xs font-medium uppercase tracking-wider text-accent-foreground/70">
            Tax Payable
          </span>
          <span className="text-2xl font-semibold font-mono tracking-tight">
            €{data.deductions.income_tax.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Net Monthly Wage Card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Net Monthly Wage
          </span>
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-semibold font-mono text-foreground">
              €
              {numOfMonths == "12"
                ? data.summary.net_monthly_12.toFixed(2)
                : data.summary.net_monthly_13.toFixed(2)}
            </span>
            <ToggleGroup
              type="single"
              variant="outline"
              value={numOfMonths}
              onValueChange={(value) => value && setNumOfMonths(value)}
            >
              <ToggleGroupItem className="font-bold" value="12">
                12
              </ToggleGroupItem>
              <ToggleGroupItem className="font-bold" value="13">
                13
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      {/* Tax Breakdown Donut Chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Income Breakdown
          </span>
          <TaxDonutChart
            netIncome={data.summary.net_annual}
            incomeTax={data.deductions.income_tax}
            socialInsurance={data.deductions.social_insurance}
            ghs={data.deductions.ghs}
          />
        </div>
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
