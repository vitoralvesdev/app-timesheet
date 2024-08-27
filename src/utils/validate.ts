import { FieldError } from "react-hook-form";
import { THEME } from "@/theme";
import { ViewStyle } from "react-native";

export const getTextFieldOnValidation = (
  field?: FieldError,
  value?: string,
): ViewStyle | undefined => {
  const $errorStyle = {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: THEME.colors.error[200],
  };

  return !!field ? $errorStyle : undefined;
};
