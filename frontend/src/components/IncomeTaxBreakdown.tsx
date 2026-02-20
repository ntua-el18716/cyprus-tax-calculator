import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ItemDescription } from "./ui/item";
import { ChevronDown } from "lucide-react";

interface IncomeTaxBreakdownProps {
  lower_bound: number;
  upper_bound: number | null;
  rate: number;
  taxable_amount: number;
  tax: number;
}

export default function IncomeTaxBreakdown({
  bracketInfo,
  incomeTax,
  numOfMonths,
}: {
  bracketInfo: IncomeTaxBreakdownProps[];
  incomeTax: number;
  numOfMonths: number;
}) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex flex-row w-full items-center justify-between p-4 hover:bg-gray-50 group">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <ItemDescription className="font-bold text-slate-900">
              Income Tax
            </ItemDescription>
            <ChevronDown className="size-5 text-slate-600 group-data-[state=open]:rotate-180 transition-transform" />
          </div>
          <ItemDescription className="text-xs text-slate-500">
            2026 Reform Brackets
          </ItemDescription>
        </div>
        <div className="flex flex-col items-end gap-1">
          <ItemDescription className="font-semibold text-red-600 text-lg">
            -€{incomeTax.toFixed(2)}
          </ItemDescription>
          <ItemDescription className="text-xs text-slate-500">
            -€{(incomeTax / numOfMonths).toFixed(2)}
          </ItemDescription>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-sm font-semibold text-slate-700">
                Tax Bracket Distribution
              </th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-slate-700">
                Chargeable Income
              </th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-slate-700">
                Tax Rate
              </th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-slate-700">
                Tax Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {bracketInfo.map((bracket) =>
              bracket.taxable_amount ? (
                <IncomeTaxBracketItem
                  lower_bound={bracket.lower_bound}
                  upper_bound={bracket.upper_bound}
                  taxable_amount={bracket.taxable_amount}
                  rate={bracket.rate}
                  tax={bracket.tax}
                />
              ) : null,
            )}
          </tbody>
        </table>
      </CollapsibleContent>
    </Collapsible>
  );
}

function IncomeTaxBracketItem({
  lower_bound,
  upper_bound,
  rate,
  taxable_amount,
  tax,
}: IncomeTaxBreakdownProps) {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 px-2 text-sm text-slate-700">
        {upper_bound
          ? `€${lower_bound} - €${upper_bound}`
          : `Over €${lower_bound}`}
      </td>
      <td className="text-right py-2 px-2 text-sm text-slate-700">
        €{taxable_amount.toFixed(2)}
      </td>
      <td className="text-right py-2 px-2 text-sm text-slate-700">
        {rate * 100}%
      </td>
      <td className="text-right py-2 px-2 text-sm font-semibold text-red-600">
        €{tax.toFixed(2)}
      </td>
    </tr>
  );
}
