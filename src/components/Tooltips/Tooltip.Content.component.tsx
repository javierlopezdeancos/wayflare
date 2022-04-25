// Externals
import { useEffect } from 'react';
import styled from "styled-components";
import { Color, Font, Variant } from "../../theme";

export enum Placement {
  bottom = "bottom",
  top = "top",
  left = "left",
  right = "right",
}

export interface Props {
  variant?: Variant;
  placement: Placement;
  onDisplay?: () => void;
  onDismiss?: () => void;
  dataTestId?: string;
  className?: string;
  children: any;
}

function UnStyledContent ({ className, placement, onDisplay, onDismiss, dataTestId, children, ...otherProps }: Props) {
  useEffect(() => {
    onDisplay && onDisplay();

    return () => {
        onDismiss && onDismiss();
    };
  }, []);

  return (
    <div
      role="tooltip"
      data-testid={dataTestId || "tooltip-content"}
      {...otherProps}
      className={`${placement} ${className}`}
    >
      <span></span>
      {children}
    </div>
  );
}

const Content = styled(UnStyledContent)`
  position: absolute;
  padding: 0 5px;
  cursor: default;
  min-width: 135px;
  background-color: ${(props: Props) => {
    if (props.variant === Variant.secondary) {
      return Color.secondary;
    } else if (props.variant === Variant.error) {
      return Color.error;
    } else {
      return Color.primary;
    }
  }};
  color: ${Color.tertiary};
  font-size: ${Font.size.medium};
  font-family: ${Font.family.primary};
  font-weight: ${Font.weight.large};
  animation: fadeIn ease-in-out 0.65s;

  & > span {
    position: absolute;
    width: 0;
    height: 0;
  }

  & > p {
    margin: 10px 0;
  }

  &.top {
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);

    & > span {
      bottom: -10px;
      left: calc(50% - 10px);
      border-right: 10px solid transparent;
      border-top: 10px solid ${(props) => {
        if (props.variant === Variant.secondary) {
          return Color.secondary;
        } else if (props.variant === Variant.error) {
          return Color.error;
        } else {
          return Color.primary;
        }
      }};
      border-left: 10px solid transparent;
    }
  }

  &.right,
  &.left {
    top: 50%;
    transform: translateY(-50%);

    & > span {
      top: calc(50% - 10px);
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }

  &.right {
    left: calc(100% + 5px);

    & > span {
      left: -10px;
      border-right: 10px solid ${(props) => {
        if (props.variant === Variant.secondary) {
          return Color.secondary;
        } else if (props.variant === Variant.error) {
          return Color.error;
        } else {
          return Color.primary;
        }
      }};
    }
  }

  &.left {
    right: calc(100% + 5px);

    & > span {
        right: -10px;
        border-left: 10px solid ${(props) => {
        if (props.variant === Variant.secondary) {
          return Color.secondary;
        } else if (props.variant === Variant.error) {
          return Color.error;
        } else {
          return Color.primary;
        }
      }};
    }
  }

  &.bottom {
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);

    & > span {
      top: -15px;
      left: calc(50% - 10px);
      border-right: 10px solid transparent;
      border-bottom: 15px solid ${(props) => {
        if (props.variant === Variant.secondary) {
          return Color.secondary;
        } else if (props.variant === Variant.error) {
          return Color.error;
        } else {
          return Color.primary;
        }
      }};
      border-left: 10px solid transparent;
    }
  }
`;

Content.displayName = 'Content';

export default Content;
