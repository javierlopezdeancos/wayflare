import { useState, useEffect } from "react";
import useNetworkState from "../../hooks/useNetworkState.hook";

const FETCH_ERROR_MESSAGE = "Ignition error";

type UseButtonFetchReturn = {
  meta: {
    isLoading: boolean;
    isError: boolean;
  };
  buttonFetch: (url: string, timeout?: number) => Promise<void>;
};

export default function useButtonFetch(): UseButtonFetchReturn {
  const [fetchTimeout, setFetchTimeout] = useState<NodeJS.Timeout>();
  const { data, meta, actions, signal } = useNetworkState();

  useEffect(() => {
    if (fetchTimeout && !meta.isLoading) {
      clearTimeout(fetchTimeout);
    }
  }, [fetchTimeout, meta.isLoading]);

  const buttonFetch = async (url: string, timeout?: number): Promise<void> => {
    if (meta.isError && !meta.isLoading) {
      actions.resetErrorState();
      return;
    }

    if (meta.isLoading && fetchTimeout) {
      actions.abortRequest();
      return;
    }

    actions.startRequest();

    try {
      const response = await fetch(url, { signal });
      actions.setRequestData(response);

      if (timeout) {
        const t = setTimeout(() => {
          actions.abortRequest();
          actions.setErrorState(FETCH_ERROR_MESSAGE);
        }, timeout * 1000);

        setFetchTimeout(t);
      }
    } catch (error) {
      actions.setErrorState(FETCH_ERROR_MESSAGE);
    } finally {
      actions.endRequest();
    }
  };

  return { meta, buttonFetch };
}
