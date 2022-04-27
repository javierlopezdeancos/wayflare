import { screen, fireEvent, render } from '@testing-library/react';
import useDebounce from './useDebounce.hook';
import '@testing-library/jest-dom';

const BUTTON_DEBOUNCE_TEST_ID = 'debounce-test';

let counter = 0;
const MS_TO_DEBOUNCE = 200;

const mockIncrement = jest.fn(() => counter++);

function UseDebounceExampleMock() {
  const debounce = useDebounce(mockIncrement, MS_TO_DEBOUNCE);

  return (
    <>
      <button
        onClick={() => debounce()}
        data-testid={BUTTON_DEBOUNCE_TEST_ID}
      >
        debounce
      </button>
    </>
  )
}

test(`should debounce until ${MS_TO_DEBOUNCE} ms`, () => {
  render(<UseDebounceExampleMock />);

  const debounceButtonNode = screen.getByTestId(BUTTON_DEBOUNCE_TEST_ID);
  fireEvent.click(debounceButtonNode);
  fireEvent.click(debounceButtonNode);

  setTimeout(() => {
    expect(counter).toBe(1);
    expect(mockIncrement).toBeCalledTimes(2);
  }, MS_TO_DEBOUNCE);

  expect(counter).toBe(0);
});
