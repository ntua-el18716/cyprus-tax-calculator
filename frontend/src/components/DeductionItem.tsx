import { ItemDescription, ItemTitle } from "./ui/item";

interface DeductionItemProps {
  deductionName: string;
  deductionDescription: string;
  deductionValue: string | number;
  numOfMonths: number;
}

export default function DeductionItem({
  deductionName,
  deductionDescription,
  deductionValue,
  numOfMonths,
}: DeductionItemProps) {
  return (
    <div className="flex flex-row w-full items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-200">
      <div className="flex flex-col h-full items-start gap-1">
        <ItemTitle className="font-bold text-slate-900">
          {deductionName}
        </ItemTitle>
        <ItemDescription className="text-xs text-slate-500">
          {deductionDescription}
        </ItemDescription>
      </div>
      <div className="flex flex-col items-end gap-1">
        <ItemTitle className="font-semibold text-slate-700 text-lg">
          €{deductionValue}
        </ItemTitle>
        <ItemDescription className="text-xs text-slate-500">
          €{(Number(deductionValue) / Number(numOfMonths)).toFixed(2)}
        </ItemDescription>
      </div>
    </div>
  );
}
