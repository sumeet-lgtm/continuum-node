export class ContinuumError extends Error {
    status;
    code;
    details;
    constructor(status, code, message, details) {
        super(message);
        this.name = 'ContinuumError';
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
export class HttpClient {
    baseUrl;
    apiKey;
    timeout;
    constructor(opts) {
        this.apiKey = opts.apiKey;
        this.baseUrl = (opts.baseUrl ?? 'https://api.continuumapi.com').replace(/\/$/, '');
        this.timeout = opts.timeout ?? 30_000;
    }
    async request(method, path, body, query) {
        const url = new URL(this.baseUrl + path);
        if (query) {
            for (const [k, v] of Object.entries(query)) {
                if (v !== undefined)
                    url.searchParams.set(k, String(v));
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
        let data;
        const ct = res.headers.get('content-type') ?? '';
        if (ct.includes('application/json')) {
            data = await res.json();
        }
        else {
            data = await res.text();
        }
        if (!res.ok) {
            const err = data;
            throw new ContinuumError(res.status, err?.error?.code ?? 'unknown_error', err?.error?.message ?? `HTTP ${res.status}`, err?.details);
        }
        return data;
    }
    get(path, query) {
        return this.request('GET', path, undefined, query);
    }
    post(path, body) {
        return this.request('POST', path, body);
    }
    patch(path, body) {
        return this.request('PATCH', path, body);
    }
    delete(path) {
        return this.request('DELETE', path);
    }
}
//# sourceMappingURL=client.js.map