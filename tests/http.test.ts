import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../src/core/http";
import { ApiFootballError } from "../src/core/errors";

describe("HttpClient", () => {
  const apiKey = "test-api-key";
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn();
  });

  it("should make a basic GET request", async () => {
    const client = new HttpClient({ apiKey, fetchImpl: fetchMock });
    const mockResponse = { get: "test", response: [1, 2, 3] };

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
      headers: new Headers(),
    });

    const result = await client.get("/test");

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/test",
      expect.objectContaining({
        headers: { "x-apisports-key": apiKey, Accept: "application/json" },
      })
    );
  });

  it("should capture rate limits from headers", async () => {
    const client = new HttpClient({ apiKey, fetchImpl: fetchMock });
    const headers = new Headers({
      "x-ratelimit-requests-remaining": "50",
      "x-ratelimit-requests-limit": "100",
      "x-ratelimit-day-remaining": "5000",
    });

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
      headers,
    });

    await client.get("/test");

    expect(client.rateLimit.requestsRemaining).toBe(50);
    expect(client.rateLimit.requestsLimit).toBe(100);
    expect(client.rateLimit.dailyRemaining).toBe(5000);
  });

  it("should retry on network errors", async () => {
    const client = new HttpClient({
      apiKey,
      fetchImpl: fetchMock,
      maxRetries: 2,
      retryDelay: 1,
    });

    fetchMock
      .mockRejectedValueOnce(new Error("Network fail"))
      .mockRejectedValueOnce(new Error("Network fail"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
        headers: new Headers(),
      });

    const result = await client.get("/test");

    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("should throw ApiFootballError on HTTP error", async () => {
    const client = new HttpClient({ apiKey, fetchImpl: fetchMock, maxRetries: 0 });

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      headers: new Headers(),
    });

    const promise = client.get("/test");
    await expect(promise).rejects.toThrow(ApiFootballError);
    await expect(promise).rejects.toThrow("HTTP 404");
  });
});
