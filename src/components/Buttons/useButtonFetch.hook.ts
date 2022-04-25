import { useState } from "react";
import useNetworkState from "../../hooks/useNetworkState.hook";
import useDebounce from "../../hooks/useDebounce.hook";

type UseButtonFetchReturn = {
  data: unknown;
  meta: {
    loading: boolean;
    error: boolean;
  };
  buttonFetch: Function;
};

export default function useButtonFetch(): UseButtonFetchReturn {
  const [fetchTimeout, setFetchTimeout] = useState<any>();
  const { data, meta, actions, signal } = useNetworkState();

  const buttonFetch = async (url: string, timeout?: number): Promise<void> => {
    const isTryingToFetchForFirstTime = !meta.loading && !meta.error;

    let t;

    if (isTryingToFetchForFirstTime) {
      actions.start();

      if (timeout) {
        t = setTimeout(() => {
          actions.abort();
          actions.setError('');
        }, timeout * 1000);

        setFetchTimeout(t as any);
      }

      try {
        const response = await fetch(url, { signal });
        actions.setData(response);
      } catch (error: any) {

        if (error as DOMException) {
          actions.resetSignal();
          return;
        }

        actions.setError('');
      } finally {
        actions.end();
      }

      return;
    }

    if (meta.loading) {
      if (timeout && fetchTimeout) {
        clearTimeout(fetchTimeout);
        setFetchTimeout(undefined);
      }

      actions.abort();

      return;
    }

    if (meta.error) {
      actions.resetError();
      return;
    }
  };

  const debounceButtonFetch = useDebounce(buttonFetch, 400);

  return { data, meta,  buttonFetch: debounceButtonFetch };
}
