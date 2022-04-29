import { screen, fireEvent, render } from '@testing-library/react';
import useButtonFetch from './useButtonFetch.hook';
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock';

const URL_TO_FETCH = '';
const DATA_MOCK = 'data-mock';
const ERROR_LABEL = 'error-label';
const LOADING_LABEL= 'loading-label';
const LOADING_TEST_ID = 'loading-test-id';
const DATA_TEST_ID = 'data-test-id';
const BUTTON_FETCH_DATA_TEST_ID = 'button-fetch-test-id';

interface Props {
  timeout?: number
};

function UseFetchButtonTestComponent({ timeout }: Props) {
  const { data, meta, buttonFetch } = useButtonFetch<string>();

  const handleClick = async () => {
    await buttonFetch(URL_TO_FETCH, timeout);
  };

  if (meta.loading) {
    return <span data-testid={LOADING_TEST_ID}>{LOADING_LABEL}</span>;
  }

  if (meta.error) {
    return <span>{ERROR_LABEL}</span>;
  }

  if (data) {
    return <span data-testid={DATA_TEST_ID}>{data}</span>;
  }

  return <button onClick={handleClick} data-testid={BUTTON_FETCH_DATA_TEST_ID}>fetch data</button>;
}

const nativeFetch = global.fetch


beforeAll(() => {
  fetchMock.mock(URL_TO_FETCH, Response(DATA_MOCK));
});


test(`should fetch if timeout 300ms takes more than fetch 0ms`, async () => {
  // await fetch('https://httpbin.org/delay/6');

  render(<UseFetchButtonTestComponent timeout={300} />);

  const fetchDataButtonNode = screen.getByTestId(BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(fetchDataButtonNode);

  const dataNode = screen.getByTestId(DATA_TEST_ID);

  expect(dataNode).toBeInTheDocument();
  expect(dataNode).toHaveTextContent(DATA_MOCK);
});

afterAll(() => {
  global.fetch = nativeFetch
});
