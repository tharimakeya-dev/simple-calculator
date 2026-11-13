/**
 * Fetch with Retry & Exponential Backoff
 * Automatically resends requests during network outages or when the server is temporarily unresponsive
 */

interface RetryOptions {
  retries?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<Response> {
  const { retries = 3, delayMs = 1000, backoffFactor = 2 } = retryOptions;

  let attempt = 0;
  let currentDelay = delayMs;

  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      if (response.ok || response.status < 500) {
        return response; // No retry on 2xx, 3xx or 4xx
      }
      throw new Error(`Server error: ${response.status}`);
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw err;
      }
      console.warn(`Request failed. Retrying in ${currentDelay}ms (attempt: ${attempt}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }

  throw new Error('Maximum number of retries exhausted');
}
