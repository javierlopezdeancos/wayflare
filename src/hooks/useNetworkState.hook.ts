import { useState } from "react";

export type UseNetworkStateReturn = {
  data: unknown;
  meta: {
    loading: boolean;
    error: boolean;
    errorMessage: string;
  };
  signal: AbortSignal;
  actions: {
    start: () => void;
    end: () => void;
    abort: () => void;
    resetError: () => void;
    setError: (message: string) => void;
    setData: (data: unknown) => void;
    setLoading: (laoding: boolean) => void;
    resetSignal: () => void;
  };
};

export default function useNetworkState(): UseNetworkStateReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<unknown>({});
  const [controller, setController] = useState<AbortController>(new AbortController());

  const resetSignal = () => {
    setController(new AbortController());
  };

  return {
    data,
    meta: {
      loading,
      error,
      errorMessage
    },
    signal: controller.signal,
    actions: {
      start: () => setLoading(true),
      end: () => setLoading(false),
      abort: () => {
        controller.abort();
        setLoading(false);
      },
      resetError: () => {
        setError(false);
        setErrorMessage("");
      },
      setError: (message = "") => {
        setLoading(false);
        setError(true);
        setErrorMessage(message);
      },
      setLoading: (loading: boolean) => setLoading(loading),
      setData: (data: unknown) => setData(data),
      resetSignal: () => resetSignal()
    }
  };
}
