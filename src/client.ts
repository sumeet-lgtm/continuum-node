export interface ContinuumOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class ContinuumError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ContinuumError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class HttpClient {
  readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(opts: ContinuumOptions) {
    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl ?? 'https://api.continuumapi.com').replace(/\/$/, '');
    this.timeout = opts.timeout ?? 30_000;
  }

  async request<T>(method: string, path: string, body?: unknown, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = new URL(this.baseUrl + path);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined) url.searchParams.set(k, String(v));
      }
    }

    const res = await fetch(url.toString(), {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': '@continuum/api/0.1.0',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(this.timeout),
    });

    let data: unknown;
    const ct = res.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const err = data as { error?: { code?: string; message?: string }; details?: unknown };
      throw new ContinuumError(
        res.status,
        err?.error?.code ?? 'unknown_error',
        err?.error?.message ?? `HTTP ${res.status}`,
        err?.details,
      );
    }

    return data as T;
  }

  get<T>(path: string, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('GET', path, undefined, query);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, body);
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
