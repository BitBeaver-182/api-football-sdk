import {
  ApiFootballError,
  ApiFootballErrorDetails
} from "./errors";

import {
  PROVIDER_DEFAULTS
} from "./constants";

import {
  ApiFootballClientOptions
} from "../types/common";

interface InternalRequestOptions extends RequestInit {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  apiKey?: string;
  host?: string;
  baseUrl?: string;
  extraHeaders?: Record < string, string > ;
  fetchImpl?: typeof fetch;
  throwOnApiError?: boolean;
}

/**
 * Fetches a URL with retry and timeout capabilities.
 * @param url The URL to fetch.
 * @param options Request options including retry, timeout, and API configuration.
 * @returns The Response object.
 * @throws ApiFootballError on network errors, timeouts, or API errors if throwOnApiError is true.
 */
async function fetchWithRetryAndTimeout(
  url: string,
  options: InternalRequestOptions = {}
): Promise < Response > {
  const {
    maxRetries = 3,
      retryDelay = 1000, // 1 second
      timeout,
      apiKey,
      extraHeaders,
      fetchImpl = fetch,
      signal: originalSignal,
      throwOnApiError = true,
      ...requestInit
  } = options;

  let retries = 0;

  while (retries <= maxRetries) {
    const abortController = new AbortController();
    const timeoutId = timeout ?
      setTimeout(() => abortController.abort(), timeout) :
      undefined;

    // Combine external signal with internal timeout signal
    const signal = new AbortSignal();
    const handleAbort = () => abortController.abort();
    if (originalSignal) {
      originalSignal.addEventListener("abort", handleAbort, {
        once: true
      });
    }
    abortController.signal.addEventListener("abort", () => {
      if (originalSignal) {
        originalSignal.removeEventListener("abort", handleAbort);
      }
    }, {
      once: true
    });

    try {
      const headers = new Headers(requestInit.headers);
      if (apiKey) {
        headers.set("x-rapidapi-key", apiKey);
      }
      if (extraHeaders) {
        for (const [key, value] of Object.entries(extraHeaders)) {
          headers.set(key, value);
        }
      }

      const response = await fetchImpl(url, {
        ...requestInit,
        headers,
        signal: abortController.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorDetails: ApiFootballErrorDetails = {
          status: response.status,
          url: url,
        };
        try {
          errorDetails.body = await response.json();
        } catch (e) {
          errorDetails.body = await response.text();
        }

        if (response.status >= 500 && response.status < 600) {
          // Server error, potentially retry
          throw new ApiFootballError(
            `Server error: ${response.status} ${response.statusText}`,
            errorDetails
          );
        } else if (response.status === 429) {
          // Rate limit error, potentially retry after a delay
          throw new ApiFootballError("Rate limit exceeded", errorDetails);
        } else if (throwOnApiError) {
          // Client error or other unretriable error
          throw new ApiFootballError(
            `API error: ${response.status} ${response.statusText}`,
            errorDetails
          );
        }
      }

      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (
        error.name === "AbortError" &&
        abortController.signal.reason === undefined
      ) {
        // This is a timeout or user-aborted request, not a network error for retry
        throw new ApiFootballError(`Request timed out or was aborted.`, {
          url,
          cause: error
        });
      }

      if (retries < maxRetries && (
          error instanceof ApiFootballError &&
          (error.status === 429 || (error.status && error.status >= 500))
        )) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay * retries)); // Exponential backoff for retry delay
        continue; // Try again
      } else if (error instanceof ApiFootballError) {
        throw error;
      } else {
        throw new ApiFootballError(`Network or unexpected error: ${error.message}`, {
          url,
          cause: error
        });
      }
    } finally {
      if (originalSignal) {
        originalSignal.removeEventListener("abort", handleAbort);
      }
    }
  }
  throw new ApiFootballError(`Failed to fetch ${url} after ${maxRetries} retries.`);
}

export class HttpClient {
  private options: ApiFootballClientOptions;
  private defaultRequestOptions: InternalRequestOptions;

  constructor(options: ApiFootballClientOptions) {
    this.options = { ...options
    };

    const host =
      options.host ||
      (options.provider ?
        PROVIDER_DEFAULTS[options.provider].host :
        PROVIDER_DEFAULTS["api-sports"].host); // Default to api-sports host if no provider/host specified

    this.defaultRequestOptions = {
      apiKey: options.apiKey,
      baseUrl: options.baseUrl || `https://${host}`,
      maxRetries: options.maxRetries,
      retryDelay: options.retryDelay,
      timeout: options.timeout,
      extraHeaders: options.extraHeaders,
      fetchImpl: options.fetchImpl,
      throwOnApiError: options.throwOnApiError,
    };
  }

  /**
   * Constructs the full request URL.
   * @param path The API endpoint path.
   * @returns The full URL string.
   */
  private buildUrl(path: string): string {
    const baseUrl = this.defaultRequestOptions.baseUrl;
    if (!baseUrl) {
      throw new ApiFootballError("Base URL is not configured for the HTTP client.");
    }
    return `${baseUrl}/${path}`;
  }

  /**
   * Performs a GET request.
   * @param path The API endpoint path.
   * @param queryParams Optional query parameters.
   * @param requestOptions Additional request options.
   * @returns The parsed JSON response.
   */
  async get < T > (
    path: string,
    queryParams ? : Record < string, string | number | boolean | undefined > ,
    requestOptions ? : RequestInit
  ): Promise < T > {
    const url = new URL(this.buildUrl(path));
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetchWithRetryAndTimeout(url.toString(), {
      ...this.defaultRequestOptions,
      ...requestOptions,
      method: "GET",
    });

    return response.json() as Promise < T > ;
  }

  // Other HTTP methods (POST, PUT, DELETE) can be added here if needed for future API interactions.
}