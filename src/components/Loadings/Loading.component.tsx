import { ReactElement } from "react";
import { color, variant } from "../../theme";
import styled from "styled-components";

export interface Props {
  size?: string;
  variant?: variant;
  inline?: boolean;
  className?: string;
  children?: ReactElement;
}

function UnstyledLoading({
  size,
  inline,
  className,
  children,
  variant
}: Props): JSX.Element {
  return (
    <svg
      className={className}
      version="1.1"
      id="loading-circle"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 50 50"
      xmlSpace="preserve"
    >
      <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
        <animateTransform
          attributeType="XML"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
      {children}
    </svg>
  );
}

const Loading = styled(UnstyledLoading)`
  width: ${(props) => (props.size ? props.size : "20px")};
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  fill: ${(props) =>
    props.variant === variant.secondary ? color.secondary : color.primary};
`;

export default Loading;
