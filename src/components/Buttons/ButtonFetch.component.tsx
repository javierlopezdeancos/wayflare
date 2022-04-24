import Loading from "../Loadings/Loading.component";
import useButtonFetch from "./useButtonFetch.hook";
import Button from "./Button.component";
import { Variant } from "../../theme";
import styled from "styled-components";
import { ReactElement } from "react";
import Label from "../Labels/Label.component";
import Tooltip from "../Tooltips/Tooltip.component";
import { Placement } from "../Tooltips/Tooltip.Content.component";

export interface Props {
  label: string;
  labelInfo: string;
  labelInProgress: string;
  labelInfoInProgress: string;
  labelError: string;
  labelInfoError: string;
  url?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactElement;
  maxDuration?: number;
}

const ButtonFetchWaiting = styled(Button)`
  padding: ${"12px 26px"};
`;

const ButtonFetchLoading = styled(Loading)`
  margin-left: ${"10px"};
`;

function UnStyledButtonFetch({
  label,
  labelInfo,
  labelInProgress,
  labelInfoInProgress,
  labelError,
  labelInfoError,
  url,
  maxDuration,
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

    buttonFetch(url, maxDuration);
  };

  return (
    <div className={className}>
      {meta.isError && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
             <Button variant={Variant.error} onClick={handleClick}>
              <Label variant={Variant.error} text={labelError} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content
            variant={Variant.error}
            placement={Placement.bottom}
          >
            <p>{labelInfoError}</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      {meta.isLoading && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
            <ButtonFetchWaiting variant={Variant.secondary} onClick={handleClick}>
              <Label variant={Variant.secondary} text={labelInProgress} />
              <ButtonFetchLoading variant={Variant.secondary} size="20px" inline />
            </ButtonFetchWaiting>
          </Tooltip.Trigger>
          <Tooltip.Content
            variant={Variant.secondary}
            placement={Placement.bottom}
          >
            <p>{labelInfoInProgress}</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      {!meta.isError && !meta.isLoading && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
            <Button onClick={handleClick}>
              <Label text={label} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement={Placement.bottom}>
            <p>{labelInfo}</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      {children}
    </div>
  );
}

const ButtonFetch = styled(UnStyledButtonFetch)`
  display: ${"flex"};
  justify-content: ${"center"};
  align-items: ${"center"};
`;

export default ButtonFetch;
