import styled from "styled-components";
import { color, variant } from "../../theme";

export interface Props {
  onClick: () => void;
  className?: string;
  children?: any;
  variant?: variant;
}

function UnstyledButton({
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

const Button = styled(UnstyledButton)`
  display: ${"flex"};
  justify-content: ${"center"};
  align-items: ${"center"};
  color: ${(props: Props) => {
    if (props.variant === variant.secondary) {
      return color.secondary;
    } else if (props.variant === variant.error) {
      return color.error;
    } else {
      return color.primary;
    }
  }};
  font-size: ${"12px"};
  background: ${"white"};
  border: ${(props:Props) => {
    if (props.variant === variant.secondary) {
      return `2px solid ${color.secondary}`;
    } else if (props.variant === variant.error) {
      return `2px solid ${color.error}`;
    } else {
      return `2px solid ${color.primary}`;
    }
  }};
  padding: ${"15px 30px"};
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
