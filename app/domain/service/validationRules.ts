const ValidationError = {
  RequiredError: 0,
  LongerThanError: 1,
  ShorterThanError: 2,
} as const;

export type ValidationError =
  (typeof ValidationError)[keyof typeof ValidationError];

export const isRequired = (value: string): ValidationError | undefined => {
  if (value === undefined || value === null || value === "") {
    return ValidationError.RequiredError;
  }
  return undefined;
};

export const isLongerThan = (
  value: string,
  length: number,
): ValidationError | undefined => {
  if (value.length > length) {
    return ValidationError.LongerThanError;
  }
  return undefined;
};

export const isShorterThan = (
  value: string,
  length: number,
): ValidationError | undefined => {
  if (value.length < length) {
    return ValidationError.ShorterThanError;
  }
  return undefined;
};

export const toErrorMessage = (
  target: string,
  error: ValidationError,
  maxLength?: number,
  minLength?: number,
): string => {
  switch (error) {
    case ValidationError.RequiredError:
      return `${target}は必須です`;
    case ValidationError.LongerThanError:
      return `${target}は${maxLength}文字以内である必要があります`;
    case ValidationError.ShorterThanError:
      return `${target}は${minLength}文字以上である必要があります`;
  }
};
