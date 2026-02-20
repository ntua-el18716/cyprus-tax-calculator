import { Field, FieldContent, FieldLabel, FieldTitle } from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type RadioGroupChoiceCardProps = {
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  name?: string;
};

export function FamilyStatus({
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
      <FieldLabel htmlFor="single">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Single Person</FieldTitle>
          </FieldContent>
          <RadioGroupItem value="single" id="single" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="family">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Family</FieldTitle>
          </FieldContent>
          <RadioGroupItem value="family" id="family" />
        </Field>
      </FieldLabel>

      <FieldLabel htmlFor="single_parent">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Single Parent</FieldTitle>
          </FieldContent>
          <RadioGroupItem value="single_parent" id="single_parent" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
