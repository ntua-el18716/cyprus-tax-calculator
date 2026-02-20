import { useCallback, useState } from "react";
import { TaxForm } from "./TaxForm";
import TaxResult, { type taxResultProps } from "./TaxResult";
import { initialData } from "./lib/utils";
function App() {
  const [taxResults, setTaxResults] = useState<taxResultProps | null>(
    initialData,
  );

  const handleFormChange = useCallback((data: taxResultProps) => {
    setTaxResults(data);
    // console.log(data);
  }, []);

  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      {/* Inputs */}
      <div className="w-full px-8 overflow-y-auto">
        <TaxForm onFormChange={handleFormChange} />
      </div>
      <div className="w-full px-8 overflow-y-auto">
        {taxResults && <TaxResult data={taxResults} />}
      </div>
    </div>
  );
}

export default App;
