import Loading from "../Loadings/Loading.component";
import useButtonFetch from "./useButtonFetch.hook";
import Button from "./Button.component";
import { Variant } from "../../theme";
import styled from "styled-components";
import { ReactElement } from "react";
import Label from "../Labels/Label.component";
import Tooltip from "../Tooltips/Tooltip.component";
import { Placement } from "../Tooltips/Tooltip.Content.component";

type Labels = {
  default: {
    button: string;
    tooltip: string;
  },
  inProgress: {
    button: string;
    tooltip: string;
  },
  error: {
    button: string;
    tooltip: string;
  }
};

export interface Props {
  labels: Labels;
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
  labels,
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
      {meta.error && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
             <Button variant={Variant.error} onClick={handleClick}>
              <Label variant={Variant.error} text={labels.error.button} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content
            variant={Variant.error}
            placement={Placement.bottom}
          >
            <p>{labels.error.tooltip}</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      {meta.loading && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
            <ButtonFetchWaiting variant={Variant.secondary} onClick={handleClick}>
              <Label variant={Variant.secondary} text={labels.inProgress.button} />
              <ButtonFetchLoading variant={Variant.secondary} size="20px" inline />
            </ButtonFetchWaiting>
          </Tooltip.Trigger>
          <Tooltip.Content
            variant={Variant.secondary}
            placement={Placement.bottom}
          >
            <p>{labels.inProgress.tooltip}</p>
          </Tooltip.Content>
        </Tooltip>
      )}

      {!meta.error && !meta.loading && (
        <Tooltip id="button-fetch-tooltip">
          <Tooltip.Trigger>
            <Button onClick={handleClick}>
              <Label text={labels.default.button} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement={Placement.bottom}>
            <p>{labels.default.tooltip}</p>
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
