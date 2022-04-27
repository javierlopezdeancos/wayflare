import { screen, fireEvent, render } from '@testing-library/react';
import Button from "./Button.component";
import { Variant } from "../../theme";

test('Allow user trigger an action when button is press', () => {
  const BUTTON_DATA_TEST_ID = 'button-test';

  let counter = 0;

  const mockCallback = jest.fn(() => counter++);

  render(
    <Button
      variant={Variant.primary}
      dataTestId={BUTTON_DATA_TEST_ID}
      onClick={mockCallback}
    >
      <span>Hello</span>
    </Button>
  );

  const buttonNode = screen.getByTestId(BUTTON_DATA_TEST_ID);
  fireEvent.click(buttonNode);

  expect(counter).toBe(1);
  expect(mockCallback).toBeCalledTimes(1);
});


