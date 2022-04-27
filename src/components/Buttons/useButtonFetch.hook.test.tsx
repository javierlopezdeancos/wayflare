import { screen, fireEvent, render } from '@testing-library/react';
import useButtonFetch from './useButtonFetch.hook';
import '@testing-library/jest-dom';

const BUTTON_FETCH_TEST_ID = 'button-fetch-test';
const URL_TO_FETCH = '';
const DATA_TEST_ID = 'data-test';
const ERROR_TEST_ID = 'loading-test';
const LOADING_TEST_ID = 'error-test';
const DATA_MOCK = 'data-mock';
const ERROR_MOCK = 'error-mock';
const LOADING_MOCK = 'loading-mock';

let fetchReference: any;

interface Props {
  url: string;
  ms: number,
}

function UseFetchExampleMock({ url, ms }: Props) {
  const { data, meta, buttonFetch } = useButtonFetch();

  return (
    <>
      {meta?.loading && <span data-testid={LOADING_TEST_ID}>{LOADING_MOCK}</span>}
      {meta?.error && <span data-testid={ERROR_TEST_ID}>{ERROR_MOCK}</span>}
      {(data) && <span data-testid={DATA_TEST_ID}>{DATA_MOCK}</span>}
      <button
        onClick={async () => await buttonFetch('', ms)}
        data-testid={BUTTON_FETCH_TEST_ID}
      >
        fecth
      </button>
    </>
  )
}

const FETCH_TIME_MOCK = 200;

beforeAll(() => {
  fetchReference = window.fetch;
  window.fetch = jest.fn(async () => {
    setTimeout(() => {
      Promise.resolve(new Response(DATA_MOCK));
     }, FETCH_TIME_MOCK);
  }) as any;
});


test('should fetch if timeout takes more than fetch', () => {
  render(<UseFetchExampleMock url={URL_TO_FETCH} ms={300} />);

  const fetchButtonNode = screen.getByTestId(BUTTON_FETCH_TEST_ID);
  fireEvent.click(fetchButtonNode);

  setTimeout(() => {
    const dataNode = screen.getByTestId(DATA_TEST_ID);

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(URL_TO_FETCH, {
      method: 'GET',
    });
    expect(dataNode).toHaveTextContent('lol');
  }, FETCH_TIME_MOCK);
});

afterAll(() => {
  window.fetch = fetchReference;
});
