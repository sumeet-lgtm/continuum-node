import type { HttpClient } from '../client.js';
export interface VerificationResult {
    email: string;
    status: 'valid' | 'invalid' | 'risky' | 'unknown';
    score: number;
    checks: {
        format: boolean;
        mx: boolean;
        disposable: boolean;
        isToxic?: boolean;
        isAbuse?: boolean;
    };
    reason?: string;
    domain?: string;
    isFreeProvider?: boolean;
    isRoleAccount?: boolean;
    createdAt: string;
}
export interface BulkJobResult {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    totalEmails: number;
    processedCount: number;
    validCount: number;
    invalidCount: number;
    riskyCount: number;
    createdAt: string;
    completedAt?: string;
}
export interface BulkListResult {
    data: BulkJobResult[];
    total: number;
    page: number;
    limit: number;
}
export interface BulkEmailResult {
    data: VerificationResult[];
    total: number;
    page: number;
    limit: number;
}
export declare class VerifyResource {
    private http;
    constructor(http: HttpClient);
    single(email: string): Promise<VerificationResult>;
    createBulkJob(emails: string[], webhookUrl?: string): Promise<{
        id: string;
        status: string;
    }>;
    getBulkJob(id: string): Promise<BulkJobResult>;
    listBulkJobs(opts?: {
        page?: number;
        limit?: number;
    }): Promise<BulkListResult>;
    getBulkResults(id: string, opts?: {
        page?: number;
        limit?: number;
        status?: string;
    }): Promise<BulkEmailResult>;
}
//# sourceMappingURL=verify.d.ts.map