export enum variant {
  primary = "primary",
  secondary = "secondary",
  error = "error"
}

export enum size {
  medium = "medium"
}

export const color = {
  [variant.primary]: "black",
  [variant.secondary]: "#FF7900",
  [variant.error]: "#FF0000"
};

export const font = {
  family: {
    [variant.primary]: "'Roboto', sans-serif"
  },
  weight: {
    [size.medium]: "400"
  }
};
