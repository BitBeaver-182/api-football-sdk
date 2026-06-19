export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function createTimeoutSignal(
  timeoutMs: number
): AbortSignal {
  const controller = new AbortController();

  setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  return controller.signal;
}

export function mergeSignals(
  ...signals: (AbortSignal | undefined)[]
): AbortSignal | undefined {
  const valid = signals.filter(Boolean);

  if (!valid.length) {
    return undefined;
  }

  const controller = new AbortController();

  for (const signal of valid) {
    signal!.addEventListener("abort", () => {
      controller.abort();
    });
  }

  return controller.signal;
}

export function buildQueryString(
  params: Record<string, unknown>
): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    query.append(key, String(value));
  }

  return query.toString();
}