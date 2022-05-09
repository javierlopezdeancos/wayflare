import { screen, fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import useButtonFetch from './useButtonFetch.hook';
import mockUserNetworkState from '../../hooks/useNetworkState.mock';
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock';

const URL_TO_FETCH = 'https://httpbin.org/delay/6';
const DATA_MOCK = { test: 'data-mock' };
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
  data?: any
  meta?: any
};

function UseFetchButtonTestComponent({ timeout, data, meta }: Props) {
  const { buttonFetch } = useButtonFetch();

  if (meta.error) {
    mockUserNetworkState.actions.setError();
  }

  if (meta.loading) {
    mockUserNetworkState.actions.start();
  }

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
  default: (fn: Function): Function => fn
}));

jest.mock("../../hooks/useNetworkState.hook", () => ({
  __esModule: true,
  default: () => mockUserNetworkState,
}));

const resetMockUserNetworkState = () => {
  mockUserNetworkState.data = undefined;
  mockUserNetworkState.meta = {
    loading: false,
    error: false,
  };
  mockUserNetworkState.actions.abort();
  mockUserNetworkState.actions.resetSignal();
};

test(`should fetch if timeout with 3000ms takes more than fetch with 50ms`, async () => {
  fetchMock.mock(URL_TO_FETCH, DATA_MOCK, { delay: 50 });

  render(
    <UseFetchButtonTestComponent
      timeout={3}
      data={undefined}
      meta={{loading: false, error: false}}
    />
  );

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);

  const startSpy = jest.spyOn(mockUserNetworkState.actions, 'start');
  const setDataSpy = jest.spyOn(mockUserNetworkState.actions, 'setData');
  const endSpy = jest.spyOn(mockUserNetworkState.actions, 'end');

  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => expect(startSpy).toHaveBeenCalledTimes(1));

  expect(mockUserNetworkState.meta.loading).toBe(true);
  expect(fetchMock.called()).toBe(true);

  await waitFor(() => expect(setDataSpy).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(endSpy).toHaveBeenCalledTimes(1));
});

test(`should not fetch if timeout with 10ms takes less than fetch with 50ms`, async () => {
  fetchMock.mock(URL_TO_FETCH, DATA_MOCK, { delay: 50 });

  render(
    <UseFetchButtonTestComponent
      timeout={0.01}
      data={undefined}
      meta={
       {
         loading: false,
         error: false
       }
     }
    />
  );

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);

  const startSpy = jest.spyOn(mockUserNetworkState.actions, 'start');
  const abortSpy = jest.spyOn(mockUserNetworkState.actions, 'abort');
  const endSpy = jest.spyOn(mockUserNetworkState.actions, 'end');

  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => expect(startSpy).toHaveBeenCalledTimes(1));

  expect(mockUserNetworkState.meta.loading).toBe(true);
  expect(fetchMock.called()).toBe(true);

  await waitFor(() => expect(abortSpy).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(endSpy).toHaveBeenCalledTimes(1));
});

test(`should abort the first fetch if user try to fetch one second time`, async () => {
  fetchMock.mock(URL_TO_FETCH, DATA_MOCK, { delay: 50 });

  const { rerender } = render(
    <UseFetchButtonTestComponent
      timeout={3}
      data={undefined}
      meta={{loading: false, error: false}}
    />
  );

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);

  const startSpy = jest.spyOn(mockUserNetworkState.actions, 'start');
  const setDataSpy = jest.spyOn(mockUserNetworkState.actions, 'setData');

  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => expect(startSpy).toHaveBeenCalledTimes(1));

  expect(mockUserNetworkState.meta.loading).toBe(true);
  expect(fetchMock.calls().length).toBe(1);

  rerender(
    <UseFetchButtonTestComponent
      timeout={3}
      data={undefined}
      meta={{loading: true, error: false}}
    />
  )

  await waitFor(() => screen.getByTestId(LOADING_TEST_ID));

  const abortSpy = jest.spyOn(mockUserNetworkState.actions, 'abort');
  const endSpy = jest.spyOn(mockUserNetworkState.actions, 'end');
  const fetchDataButtonNode = screen.getByTestId(BUTTON_FETCH_DATA_TEST_ID);

  fireEvent.click(fetchDataButtonNode);

  rerender(
    <UseFetchButtonTestComponent
      timeout={3}
      data={undefined}
      meta={{loading: false, error: false}}
    />
  )

  await waitFor(() => screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID));

  expect(mockUserNetworkState.data).toBe(undefined);
  expect(mockUserNetworkState.meta.loading).toBe(false);
  expect(abortSpy).toHaveBeenCalledTimes(1);
  expect(endSpy).toHaveBeenCalledTimes(1);
  expect(setDataSpy).not.toHaveBeenCalled();
});

test(`should come back to the default state if user try to fetch again after error`, async () => {
  fetchMock.mock(
    URL_TO_FETCH,
    DATA_MOCK,
    {
      delay: 50,
      response: {
        status: 500,
        throws: new TypeError('Failed to fetch')
      }
    }
  );

  render(
    <UseFetchButtonTestComponent
      timeout={0.01}
      data={undefined}
      meta={{loading: false, error: false}}
    />
  );

  const defaultFetchDataButtonNode = screen.getByTestId(DEFAULT_BUTTON_FETCH_DATA_TEST_ID);

  const setErrorSpy = jest.spyOn(mockUserNetworkState.actions, 'setError');
  const resetErrorSpy = jest.spyOn(mockUserNetworkState.actions, 'resetError');

  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => expect(setErrorSpy).toHaveBeenCalledTimes(1));

  fireEvent.click(defaultFetchDataButtonNode);

  await waitFor(() => expect(resetErrorSpy).toHaveBeenCalledTimes(1));

  expect(mockUserNetworkState.meta.error).toBe(false);
});

afterEach(() => {
  fetchMock.restore();
  fetchMock.resetHistory();
  fetchMock.resetBehavior();
  resetMockUserNetworkState();
  jest.restoreAllMocks();
});
