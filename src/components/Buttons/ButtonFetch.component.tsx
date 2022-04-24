import Loading from "../Loadings/Loading.component";
import useButtonFetch from "./useButtonFetch.hook";
import Button from "./Button.component";
import { variant } from "../../theme";
import styled from "styled-components";
import { ReactElement } from "react";
import Label from "../Labels/Label.component";

export interface Props {
  label: string;
  labelInProgress: string;
  url?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactElement;
  timeout?: number;
}

const ButtonFetchWaiting = styled(Button)`
  padding: ${"12px 26px"};
`;

const ButtonFetchLoading = styled(Loading)`
  margin-left: ${"10px"};
`;

function UnstyledButtonFetch({
  label,
  labelInProgress,
  url,
  timeout,
  onClick,
  className,
  children
}: Props): JSX.Element {
  const { meta, buttonFetch } = useButtonFetch();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (!url) {
      return;
    }

    buttonFetch(url, timeout);
  };

  return (
    <div className={className}>
      {meta.isError && (
        <Button variant={variant.error} onClick={handleClick}>
          <Label variant={variant.error} text={label} />
        </Button>
      )}

      {meta.isLoading && (
        <ButtonFetchWaiting variant={variant.secondary} onClick={handleClick}>
          <Label variant={variant.secondary} text={labelInProgress} />
          <ButtonFetchLoading variant={variant.secondary} size="20px" inline />
        </ButtonFetchWaiting>
      )}

      {!meta.isError && !meta.isLoading && (
        <Button onClick={handleClick}>
          <Label text={label} />
        </Button>
      )}

      {children}
    </div>
  );
}

const ButtonFetch = styled(UnstyledButtonFetch)`
  display: ${"flex"};
  justify-content: ${"center"};
  align-items: ${"center"};
`;

export default ButtonFetch;
