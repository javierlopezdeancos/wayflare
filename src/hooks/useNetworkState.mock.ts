let controller = new AbortController();

const networkState = {
  data: undefined as any,
  meta:{
    loading: false,
    error: false,
  },
  signal: controller.signal,
  actions: {
    abort: () => {
      controller.abort();
    },
    end: () => {
      networkState.meta.loading = false;
    },
    resetError: () => {
      networkState.meta.error = false;
    },
    resetSignal: () => {
      controller = new AbortController();
      networkState.signal = controller.signal;
    },
    setData: (d: any) => {
      networkState.data = d;
    },
    setError: () => {
      networkState.meta.error = true;
    },
    start: () => {
      networkState.meta.loading = true;
    },
  }
}

export default networkState;
