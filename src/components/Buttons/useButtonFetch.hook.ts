import { useEffect, useState } from "react";
import useNetworkState from "../../hooks/useNetworkState.hook";

type UseButtonFetchReturn = {
  meta: {
    isLoading: boolean;
    isError: boolean;
  };
  buttonFetch: (url: string, timeout?: number) => Promise<void>;
};

export default function useButtonFetch(): UseButtonFetchReturn {
  const [fetchTimeout, setFetchTimeout] = useState();
  const { data, meta, actions, signal } = useNetworkState();

  useEffect(() => {
    if (fetchTimeout && !meta.isLoading) {
      clearTimeout(fetchTimeout);
    }
  }, [meta.isLoading]);

  const buttonFetch = async (url: string, timeout?: number): Promise<void> => {
    if (meta.isError) {
      actions.resetError();
      return;
    }

    if (meta.isLoading) {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
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

  return { meta, buttonFetch };
}
