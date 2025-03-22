import { hasLength, isNotEmpty } from "@mantine/form";

export function validateInput(input: string) {
  return (
    isNotEmpty("This field is required")(input) ||
    hasLength({ min: 8, max: 20 }, "Must be at least 8-20 characters")(input)
  );
}
