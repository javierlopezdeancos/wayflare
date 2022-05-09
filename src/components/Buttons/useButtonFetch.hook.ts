import { useState } from "react";
import useNetworkState from "../../hooks/useNetworkState.hook";
import useDebounce from "../../hooks/useDebounce.hook";

type ButtonFetch = (url: string, timeout?: number) => Promise<void>;

export type UseButtonFetchReturn<D> = {
  data: D | undefined;
  meta: {
    loading: boolean;
    error: boolean;
  };
  buttonFetch: ButtonFetch;
};

export default function useButtonFetch<D = unknown>(): UseButtonFetchReturn<D> {
  const [fetchTimeout, setFetchTimeout] = useState<any>();
  const { data, meta, actions, signal } = useNetworkState<D>();

  const buttonFetch = async (url: string, timeout?: number): Promise<void> => {
    const isTryingToFetchForFirstTime = !meta.loading && !meta.error;

    let t;

    if (isTryingToFetchForFirstTime) {
      actions.start();

      if (timeout) {
        t = setTimeout(() => {
          actions.abort();
          actions.setError();
        }, timeout * 1000);

        setFetchTimeout(t as any);
      }

      try {
        const response = await fetch(url, { signal }) as any;
        const d = await response.json();

        actions.setData(d);
      } catch (error: any) {
        if (error as DOMException) {
          actions.resetSignal();
          return;
        }

        actions.setError();
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

  return { data, meta, buttonFetch: debounceButtonFetch };
}
