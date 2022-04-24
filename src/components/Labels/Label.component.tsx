import styled from "styled-components";
import { ReactElement } from "react";
import { Color, Variant, Size, Font } from "../../theme";

export interface Props {
  className?: string;
  children?: ReactElement;
  text: string;
  variant?: Variant;
}

function UnStyledLabel({
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

const Label = styled(UnStyledLabel)`
  color: ${(props) => {
    if (props.variant === Variant.secondary) {
      return Color.secondary;
    } else if (props.variant === Variant.error) {
      return Color.error;
    } else {
      return Color.primary;
    }
  }};
  font-size: ${Font.size[Size.medium]};
  font-family: ${Font.family[Variant.primary]};
  font-weight: ${Font.weight[Size.medium]};
`;

export default Label;
