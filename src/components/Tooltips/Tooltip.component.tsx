import React, { useRef, useState } from 'react';
import { Variant } from "../../theme";
import styled from "styled-components";
import Content from "./Tooltip.Content.component";
import Trigger from "./Tooltip.Trigger.component";

export interface Props {
  variant?: Variant;
  className?: string;
  children: any;
  id: string;
  title?: string;
  dataTestId?: string;
}

function UnStyledTooltip({ id, dataTestId, className, children }: Props): JSX.Element {
  const nodeRef = useRef<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  let trigger = null;
  let content = null;

  React.Children.forEach(children, child => {
    if (!child.type) {
      return;
    }

    if (child.type.displayName === 'Trigger') {
      trigger = React.cloneElement(
        child, { 'aria-describedby': id }
      );
    }

    if (child.type.displayName === 'Content') {
      content = React.cloneElement(
        child, { id }
      );
    }
  });

  return (
    <div className={className}
      data-testid={dataTestId}
      ref={nodeRef as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {trigger}
      {isHovered && content}
    </div>
  );
};

UnStyledTooltip.Content = Content;
UnStyledTooltip.Trigger = Trigger;

const Tooltip = styled(UnStyledTooltip)`
  position: relative;
  display: inline-flex;
  user-select: none;
  cursor: pointer;
  margin: 0 10px;
  -webkit-tap-highlight-color: transparent;
`;

export default Tooltip;
