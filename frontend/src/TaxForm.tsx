/* eslint-disable no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field";
import { Input } from "./components/ui/input";
import { RadioGroupChoiceCard } from "./components/ExpatStatus";
import { FamilyStatus } from "./components/FamilyStatus";
import { Slider } from "./components/ui/slider";
import { useEffect } from "react";
import { type taxResultProps } from "./TaxResult";
import ChildrenTable from "./components/ChildrenTable";

const formSchema = z.object({
  grossIncome: z
    .number()
    .min(0, "Income must be at least 0")
    .max(200000, "Income must be at most 200,000"),
  familyStatus: z.enum(["single", "family", "single-parent"]),
  numberOfChildren: z.number().min(0, "Children must be at least 0"),
  numberOfDependentChildren: z.number().min(0, "Children must be at least 0"),
  expatRelief: z.enum(["0", "20", "50"]),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

interface TaxFormProps {
  onFormChange: (data: taxResultProps) => void;
}

export function TaxForm({ onFormChange }: TaxFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossIncome: 50000,
      expatRelief: "0",
      familyStatus: "single",
      numberOfChildren: 0,
      numberOfDependentChildren: 0,
      description: "",
    },
  });

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    const payload = {
      gross_income: watchedValues.grossIncome || 0,
      family_status: watchedValues.familyStatus || "single",
      children_count: watchedValues.numberOfDependentChildren || 0,
      total_children_count: watchedValues.numberOfChildren || 0,
      expat_excemption_status: watchedValues.expatRelief || 0,
    };

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    fetch(`${apiUrl}/calculator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        onFormChange(data);
      })
      .catch((error) => {
        console.error("Error fetching tax calculation:", error);
      });
  }, [watchedValues, onFormChange]);

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center py-3">
            Tax Calculator
          </CardTitle>
          <CardDescription>
            A tax calculator for the new Tax System 2026
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="grossIncome"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="gross-income"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Calculator className="size-5 text-primary" />
                    Annual Gross Salary
                  </FieldLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-2xl">
                      €
                    </span>
                    <Input
                      id="gross-income"
                      type="text"
                      value={field.value.toLocaleString()}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        const numValue = value === "" ? 0 : parseInt(value, 10);
                        field.onChange(numValue);
                      }}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="pl-12 text-3xl! font-bold h-16"
                    />
                  </div>
                  <Slider
                    value={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                    min={0}
                    max={200000}
                    step={1000}
                    className="mt-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>€0</span>
                    <span>€100,000</span>
                    <span>€200,000</span>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="expatRelief"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Expatriate Tax Relief</FieldLabel>
                  <RadioGroupChoiceCard
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="familyStatus"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Family Status</FieldLabel>
                  <FamilyStatus
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="numberOfChildren"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex flex-row w-full gap-5">
                    <div className="w-full">
                      <FieldLabel>Total Number of Children</FieldLabel>
                      <Input
                        type="number"
                        min="0"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                    <div className="w-full">
                      <FieldLabel>Number of Dependent Children</FieldLabel>
                      <Controller
                        name="numberOfDependentChildren"
                        control={form.control}
                        render={({ field: depField }) => (
                          <Input
                            type="number"
                            min="0"
                            value={depField.value}
                            onChange={(e) => {
                              const depValue = Number(e.target.value);
                              depField.onChange(depValue);
                              // If dependent > total, update total to match
                              if (
                                depValue > (watchedValues.numberOfChildren ?? 0)
                              ) {
                                form.setValue("numberOfChildren", depValue);
                              }
                            }}
                          />
                        )}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </div>
                  {watchedValues.numberOfDependentChildren &&
                  watchedValues.numberOfDependentChildren > 0 ? (
                    <ChildrenTable
                      numberOfDependentChildren={Number(
                        watchedValues.numberOfDependentChildren,
                      )}
                      numberOfChildren={Number(watchedValues.numberOfChildren)}
                      grossIncome={Number(watchedValues.grossIncome)}
                      familyStatus={watchedValues.familyStatus || "single"}
                    />
                  ) : null}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
