import type { HttpClient } from '../client.js';
export interface Suppression {
    email: string;
    reason: 'hard_bounce' | 'soft_bounce' | 'complaint' | 'manual' | 'unsubscribed';
    apiKeyId: string;
    createdAt: string;
}
export interface SuppressionList {
    data: Suppression[];
    total: number;
    page: number;
    limit: number;
}
export declare class SuppressionsResource {
    private http;
    constructor(http: HttpClient);
    list(opts?: {
        reason?: string;
        page?: number;
        limit?: number;
    }): Promise<SuppressionList>;
    add(email: string): Promise<Suppression>;
    remove(email: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=suppressions.d.ts.map