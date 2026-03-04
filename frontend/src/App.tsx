import { useCallback, useState } from "react";
import { TaxForm } from "./TaxForm";
import TaxResult, { type taxResultProps } from "./TaxResult";
import { initialData } from "./lib/utils";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "./components/ThemeToggle";
import "../global.css";

function App() {
  const [taxResults, setTaxResults] = useState<taxResultProps | null>(
    initialData,
  );

  const handleFormChange = useCallback((data: taxResultProps) => {
    setTaxResults(data);
    // console.log(data);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-9 rounded-lg bg-primary">
              <Calculator className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">
                Cyprus Tax Calculator
              </h2>
              {/* <p className="text-xs text-muted-foreground">2026 Tax System</p> */}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-1 rounded-md">
              2026 New Cyprus Tax System
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6 md:py-12">
        <div className="mb-8 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight text-balance">
            Calculate your tax liability
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Enter your annual gross salary and family details to see a
            comprehensive breakdown of social insurance, GHS, and income tax.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Input Column */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <TaxForm onFormChange={handleFormChange} />
              <p className="mt-4 text-xs text-muted-foreground text-center">
                This is an estimate for informational purposes only. Consult a
                tax professional for accurate advice.
              </p>
            </div>
          </div>
          {/* Results Column */}
          <div className="lg:col-span-3">
            {taxResults && <TaxResult data={taxResults} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
