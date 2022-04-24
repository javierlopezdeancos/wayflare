import styled from "styled-components";
import { ReactElement } from "react";
import { color, variant, size, font } from "../../theme";

export interface Props {
  className?: string;
  children?: ReactElement;
  text: string;
  variant?: variant;
}

function UnstyledLabel({
  variant,
  text,
  className,
  children
}: Props): JSX.Element {
  return (
    <span className={className}>
      {text}
      {children}
    </span>
  );
}

const Label = styled(UnstyledLabel)`
  color: ${(props) => {
    if (props.variant === variant.secondary) {
      return color.secondary;
    } else if (props.variant === variant.error) {
      return color.error;
    } else {
      return color.primary;
    }
  }};
  font-size: ${"12px"};
  font-family: ${font.family[variant.primary]};
  font-weight: ${font.weight[size.medium]};
`;

export default Label;
