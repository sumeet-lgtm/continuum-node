export interface ContinuumOptions {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
}
export declare class ContinuumError extends Error {
    readonly status: number;
    readonly code: string;
    readonly details?: unknown;
    constructor(status: number, code: string, message: string, details?: unknown);
}
export declare class HttpClient {
    readonly baseUrl: string;
    private readonly apiKey;
    private readonly timeout;
    constructor(opts: ContinuumOptions);
    request<T>(method: string, path: string, body?: unknown, query?: Record<string, string | number | boolean | undefined>): Promise<T>;
    get<T>(path: string, query?: Record<string, string | number | boolean | undefined>): Promise<T>;
    post<T>(path: string, body?: unknown): Promise<T>;
    patch<T>(path: string, body?: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map