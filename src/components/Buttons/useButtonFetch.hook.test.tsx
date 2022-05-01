import { screen, fireEvent, render , waitFor} from '@testing-library/react';
import useButtonFetch from './useButtonFetch.hook';
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock';

const URL_TO_FETCH = 'https://httpbin.org/delay/6';
const DATA_MOCK = 'data-mock';
const ERROR_LABEL = 'error-label';
const LOADING_LABEL = 'loading-label';
const DATA_LABEL = 'data-label';
const BUTTON_FETCH_LABEL = 'fetch data';
const LOADING_TEST_ID = 'loading-test-id';
const DATA_TEST_ID = 'data-test-id';
const ERROR_TEST_ID = 'error-test-id';
const DEFAULT_BUTTON_FETCH_DATA_TEST_ID = 'default-button-fetch-data-test-id';
const BUTTON_FETCH_DATA_TEST_ID = 'button-fetch-test-id';

interface Props {
  timeout?: number
};

function UseFetchButtonTestComponent({ timeout }: Props) {
  const { data, meta, buttonFetch } = useButtonFetch();

  const handleClick = async () => {
    await buttonFetch(URL_TO_FETCH, timeout);
  };

  if (meta.loading) {
    return (
      <>
        <span data-testid={LOADING_TEST_ID}>{LOADING_LABEL}</span>
        <button
          onClick={handleClick}
          data-testid={BUTTON_FETCH_DATA_TEST_ID}>
            {BUTTON_FETCH_LABEL}
        </button>
      </>
    );
  }

  if (meta.error) {
    return (
      <>
        <span data-testid={ERROR_TEST_ID}>{ERROR_LABEL}</span>;
        <button
          onClick={handleClick}
          data-testid={BUTTON_FETCH_DATA_TEST_ID}>{
            BUTTON_FETCH_LABEL}
        </button>
      </>
    );
  }

  if (data) {
    return (
      <>
        <span data-testid={DATA_TEST_ID}>{DATA_LABEL}</span>;
        <button
          onClick={handleClick}
          data-testid={BUTTON_FETCH_DATA_TEST_ID}>
          {BUTTON_FETCH_LABEL}
        </button>
      </>
    );
  }

  return <button onClick={handleClick} data-testid={DEFAULT_BUTTON_FETCH_DATA_TEST_ID}>{BUTTON_FETCH_LABEL}</button>;
}

jest.mock('../../hooks/useDebounce.hook', () => ({
  __esModule: true,
  default: (fn: Function) => fn,
}));

beforeEach(() => {
  fetchMock.mock(URL_TO_FETCH, { data: DATA_MOCK }, { delay: 50 });
});

test(`should fetch if timeout with 3000ms takes more than fetch with 50ms`, async () => {
  render(<UseFetchButtonTestComponent timeout={3} />);

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => {
    screen.getByTestId(LOADING_TEST_ID);
  });

  await waitFor(() => {
    const dataNode = screen.getByTestId(DATA_TEST_ID);

    expect(fetchMock.called()).toBe(true);
    expect(dataNode).toBeInTheDocument();
    expect(dataNode).toHaveTextContent(DATA_LABEL);
  });
});

test(`should not fetch if timeout with 10ms takes less than fetch with 50ms`, async () => {
  render(<UseFetchButtonTestComponent timeout={0.01} />);

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => {
    screen.getByTestId(LOADING_TEST_ID);
  });

  await waitFor(() => {
    const errorNode = screen.getByTestId(ERROR_TEST_ID);

    expect(fetchMock.called()).toBe(true);
    expect(errorNode).toBeInTheDocument();
    expect(errorNode).toHaveTextContent(ERROR_LABEL);
  });
});

test(`should loading until fetch if timeout with 3000ms takes more than fetch with 50ms`, async () => {
  render(<UseFetchButtonTestComponent timeout={3} />);

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => {
    const loadingNode = screen.getByTestId(LOADING_TEST_ID);

    expect(fetchMock.called()).toBe(true);
    expect(loadingNode).toBeInTheDocument();
    expect(loadingNode).toHaveTextContent(LOADING_LABEL);
  });
});

test(`should abort the first fetch if user try to fetch one second time`, async () => {
  render(<UseFetchButtonTestComponent timeout={3} />);

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => {
    screen.getByTestId(LOADING_TEST_ID);
  });

  const fetchDataButtonNode = screen.getByTestId(BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(fetchDataButtonNode);

  await waitFor(() => {
    screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
    expect(fetchMock.calls().length).toBe(1);
  });
});

test(`should start a new fetch if user try to fetch again after error`, async () => {
  render(<UseFetchButtonTestComponent timeout={0.01} />);

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => {
    screen.getByTestId(LOADING_TEST_ID);
  });

  await waitFor(() => {
    screen.getByTestId(ERROR_TEST_ID);
  });

  const fetchDataButtonNode = screen.getByTestId(BUTTON_FETCH_DATA_TEST_ID);
  fireEvent.click(fetchDataButtonNode);

  await waitFor(() => {
    const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);

    expect(fetchMock.calls().length).toBe(1);
    expect(defaultFetchDataButtonNode).toBeInTheDocument();
    expect(defaultFetchDataButtonNode).toHaveTextContent(BUTTON_FETCH_LABEL);
  });
});

afterEach(() => {
  fetchMock.restore();
  fetchMock.resetHistory();
  fetchMock.resetBehavior();
})
