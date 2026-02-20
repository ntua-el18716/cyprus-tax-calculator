import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type RadioGroupChoiceCardProps = {
  value?: string;
  onValueChange?: () => void;
  name?: string;
};

export function RadioGroupChoiceCard({
  value,
  onValueChange,
  name,
}: RadioGroupChoiceCardProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      name={name}
      className="max-w-full flex flex-row"
    >
      <FieldLabel htmlFor="expat-0">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>No Excemption</FieldTitle>
          </FieldContent>
          <RadioGroupItem value="0" id="expat-0" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="expat-20">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>20% Excemption</FieldTitle>
            <FieldDescription className="text-xs">
              Max 8.550/yr - 7 years - Not a resident 3+ years prior
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="20" id="expat-20" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="expat-50">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>50% Excemption</FieldTitle>
            <FieldDescription className="text-xs">
              Min 55K/yr - 17 years - Not a resident 15+ years prior
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="50" id="expat-50" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
