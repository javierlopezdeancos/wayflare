import { useState } from "react";
import useNetworkState from "../../hooks/useNetworkState.hook";
import useDebounce from "../../hooks/useDebounce.hook";

type UseButtonFetchReturn = {
  meta: {
    isLoading: boolean;
    isError: boolean;
  };
  buttonFetch: Function;
};

export default function useButtonFetch(): UseButtonFetchReturn {
  const [fetchTimeout, setFetchTimeout] = useState<any>();
  const { data, meta, actions, signal } = useNetworkState();

  const buttonFetch = async (url: string, timeout?: number): Promise<void> => {
    if (meta.isError) {
      actions.resetError();
      return;
    }

    if (meta.isLoading) {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
        setFetchTimeout(undefined);
      }

      actions.abortRequest();

      return;
    }

    actions.startRequest();

    if (timeout) {
      const t = setTimeout(() => {
        actions.abortRequest();
        actions.setError('');
      }, timeout * 1000);

      setFetchTimeout(t as any);
    }

    try {
      const response = await fetch(url, { signal });
      actions.setRequestData(response);
    } catch (error) {
      actions.setError('');
    } finally {
      actions.endRequest();
    }
  };

  const debounceButtonFetch = useDebounce(buttonFetch, 400);

  return { meta,  buttonFetch: debounceButtonFetch };
}
