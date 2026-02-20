import { Card } from "./ui/card";
import { Item, ItemContent, ItemDescription } from "./ui/item";

import DeductionItem from "./DeductionItem";
import IncomeTaxBreakdown from "./IncomeTaxBreakdown";

interface deductionsProps {
  social_insurance: number;
  ghs: number;
  income_tax: number;
  family_deduction: number;
  total_deductions: number;
}
interface detailsProps {
  income_tax_breakdown: {
    lower_bound: number;
    upper_bound: number | null;
    rate: number;
    taxable_amount: number;
    tax: number;
  }[];
}

export default function DeductionsSection({
  deductions,
  details,
  numOfMonths,
}: {
  deductions: deductionsProps;
  details: detailsProps;
  numOfMonths: number;
}) {
  return (
    <Card className="w-full">
      <Item variant="outline" className="w-full">
        <ItemContent className="text-center">
          <ItemDescription className="font-bold uppercase text-lg">
            Deductions
          </ItemDescription>
        </ItemContent>
      </Item>
      {/* Social Security */}
      <DeductionItem
        deductionName="Social Security"
        deductionDescription="8.8% Cap: €68,904/yr"
        deductionValue={deductions.social_insurance.toFixed(2)}
        numOfMonths={numOfMonths}
      />
      {/* General Healthcare System */}
      <DeductionItem
        deductionName="General Healthcare System"
        deductionDescription="8.8% Cap: €68,904/yr"
        deductionValue={deductions.ghs.toFixed(2)}
        numOfMonths={numOfMonths}
      />
      {/* Family Deductions */}
      {deductions.family_deduction ? (
        <DeductionItem
          deductionName="Family Deductions"
          deductionDescription="X dependent children"
          deductionValue={deductions.family_deduction}
          numOfMonths={numOfMonths}
        />
      ) : null}
      {/* Income Tax & Income Tax Breakdown */}
      <IncomeTaxBreakdown
        bracketInfo={details.income_tax_breakdown}
        incomeTax={deductions.income_tax}
        numOfMonths={numOfMonths}
      />
    </Card>
  );
}
