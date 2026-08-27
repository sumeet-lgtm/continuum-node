import type { HttpClient } from '../client.js';
export interface UsageQuota {
    plan: string;
    verifications: {
        used: number;
        limit: number;
        resets_at: string;
    };
    sends: {
        used: number;
        limit: number;
        resets_at: string;
    };
    monitors: {
        active: number;
        limit: number;
    };
}
export declare class UsageResource {
    private http;
    constructor(http: HttpClient);
    get(): Promise<UsageQuota>;
}
//# sourceMappingURL=usage.d.ts.map