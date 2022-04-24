import styled from "styled-components";
import { Color, Variant } from "../../theme";

export interface Props {
  onClick: () => void;
  className?: string;
  children?: any;
  variant?: Variant;
}

function UnStyledButton({
  variant,
  onClick,
  className,
  children
}: Props): JSX.Element {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

const Button = styled(UnStyledButton)`
  display: ${"flex"};
  justify-content: ${"center"};
  align-items: ${"center"};
  color: ${(props: Props) => {
    if (props.variant === Variant.secondary) {
      return Color.secondary;
    } else if (props.variant === Variant.error) {
      return Color.error;
    } else {
      return Color.primary;
    }
  }};
  font-size: ${"12px"};
  background: ${"white"};
  border: ${(props:Props) => {
    if (props.variant === Variant.secondary) {
      return `2px solid ${Color.secondary}`;
    } else if (props.variant === Variant.error) {
      return `2px solid ${Color.error}`;
    } else {
      return `2px solid ${Color.primary}`;
    }
  }};
  padding: ${"15px 30px"};
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
