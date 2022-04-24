export enum Variant {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
  error = "error"
}

export enum Size {
  medium = "medium",
  large = "large"
}

export const Color = {
  [Variant.primary]: "black",
  [Variant.secondary]: "#FF7900",
  [Variant.tertiary]: "white",
  [Variant.error]: "#FF0000",
};

export const Font = {
  family: {
    [Variant.primary]: "'Roboto', sans-serif"
  },
  weight: {
    [Size.medium]: "400",
    [Size.large]: "700"
  },
  size: {
    [Size.medium]: "12px",
    [Size.large]: "16px"
  }
};
