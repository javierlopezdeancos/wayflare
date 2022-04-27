import { screen, fireEvent, render } from '@testing-library/react';
import Tooltip from "./Tooltip.component";
import { Placement } from "./Tooltip.Content.component";
import '@testing-library/jest-dom';


test('Allow user see a tooltip content info when hover the mouse into the tooltip trigger', () => {
  const TOOLTIP_DATA_TEST_ID = "tooltip-test";
  const TOOLTIP_TRIGGER_DATA_TEST_ID = "tooltip-trigger-test";
  const TOOLTIP_CONTENT_DATA_TEST_ID = "tooltip-content-test";

  render(
    <Tooltip id="button-fetch-tooltip" dataTestId={TOOLTIP_DATA_TEST_ID}>
      <Tooltip.Trigger data-testid={TOOLTIP_TRIGGER_DATA_TEST_ID}>
          <span>Hover me!</span>
      </Tooltip.Trigger>
      <Tooltip.Content placement={Placement.bottom} dataTestId={TOOLTIP_CONTENT_DATA_TEST_ID}>
        <p>I'm the content of tooltip</p>
      </Tooltip.Content>
    </Tooltip>
  );

  const tooltipTriggerNode = screen.getByTestId(TOOLTIP_TRIGGER_DATA_TEST_ID);
  fireEvent.mouseEnter(tooltipTriggerNode);
  const tooltipContentNode = screen.queryByTestId(TOOLTIP_CONTENT_DATA_TEST_ID);

  expect(tooltipContentNode).toBeVisible();
});
