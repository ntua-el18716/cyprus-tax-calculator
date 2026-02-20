export default function ChildrenTable({
  numberOfDependentChildren,
  numberOfChildren,
  grossIncome,
  familyStatus,
}: {
  numberOfDependentChildren: number;
  numberOfChildren: number;
  grossIncome: number;
  familyStatus: string | null;
}) {
  let deduction = 0;
  let limit = grossIncome;
  // Setting limit based on the number of total children
  if (familyStatus == "single") limit = 40000;
  else if (numberOfChildren <= 2) limit = 100000;
  else if (numberOfChildren == 3 || numberOfChildren == 4) limit = 150000;
  else if (numberOfChildren >= 5) limit = 200000;

  // Find deduction based on the number of dependent children and gross income being under the limit
  if (numberOfDependentChildren == 1 && grossIncome <= limit) deduction = 1000;
  else if (numberOfDependentChildren == 2 && grossIncome <= limit)
    deduction = 2250;
  else if (
    (numberOfDependentChildren == 3 || numberOfDependentChildren == 4) &&
    grossIncome <= limit
  )
    deduction = 2250 + (numberOfDependentChildren - 2) * 1500;
  else if (numberOfDependentChildren >= 5 && grossIncome <= limit)
    deduction = 2250 + (numberOfDependentChildren - 2) * 1500;

  if (familyStatus == "single_parent") deduction *= 2;
  else if (familyStatus == "single" && limit) deduction = 0;
  return (
    <div className="w-full space-y-4">
      <table className="w-full text-sm">
        <tbody>
          {numberOfDependentChildren >= 1 ? (
            <tr className="border-b border-gray-200">
              <td className="py-3 text-gray-600">1st Child</td>
              <td className="py-3 text-right font-medium">€1.000 per parent</td>
            </tr>
          ) : null}
          {numberOfDependentChildren >= 2 ? (
            <tr className="border-b border-gray-200">
              <td className="py-3 text-gray-600">2nd Child</td>
              <td className="py-3 text-right font-medium">€1.250 per parent</td>
            </tr>
          ) : null}
          {numberOfDependentChildren >= 3 ? (
            <tr className="border-b border-gray-200">
              <td className="py-3 text-gray-600">
                3rd+ Child (×{numberOfDependentChildren - 2})
              </td>
              <td className="py-3 text-right font-medium">
                €{(numberOfDependentChildren - 2) * 1500} per parent
              </td>
            </tr>
          ) : null}
          <tr>
            <td className="py-3 font-semibold text-gray-900 text-lg">
              Deduction
            </td>
            {deduction ? (
              <td className="py-3 text-right font-bold text-lg">
                €{deduction}
              </td>
            ) : (
              <td className="text-red-500 text-sm py-3 text-right">
                Income exceeds the limit for this family status
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <p className="text-md">Family Income Rules</p>
      <ul className="text-sm list-disc ml-5">
        <li>1-2 children: 100.000</li>
        <li>3-4 children: 150.000</li>
        <li>5+ children: 200.000</li>
        {familyStatus == "single" && (
          <li>For divorced parents who don't live with the children: 40.000</li>
        )}
        {familyStatus == "single_parent" && (
          <li>For single parents: deductions are doubled</li>
        )}
      </ul>
    </div>
  );
}
