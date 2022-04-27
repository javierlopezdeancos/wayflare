import { cloneElement } from 'react';

export interface Props {
  children: any;
}

const Trigger = ({ children,...otherProps }: Props) => {
  return (
    cloneElement(children, {...otherProps})
  );
}

Trigger.displayName = 'Trigger';

export default Trigger;
