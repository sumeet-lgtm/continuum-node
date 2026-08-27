import type { HttpClient } from '../client.js';
export interface Mailbox {
    id: string;
    type: 'smtp' | 'gmail' | 'outlook';
    username: string;
    dailyLimit: number;
    sentToday: number;
    status: 'active' | 'paused' | 'error';
    lastErrorMsg?: string;
    createdAt: string;
}
export interface WarmupConfig {
    enabled: boolean;
    targetPerDay: number;
    currentPerDay: number;
    rampUpDays: number;
    startedAt: string;
}
export declare class MailboxesResource {
    private http;
    constructor(http: HttpClient);
    connect(params: {
        type: 'smtp' | 'gmail' | 'outlook';
        host?: string;
        port?: number;
        username: string;
        password?: string;
        oauth_token?: string;
        daily_limit?: number;
        send_delay_min?: number;
        send_delay_max?: number;
    }): Promise<Mailbox>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Mailbox[];
        total: number;
    }>;
    get(id: string): Promise<Mailbox>;
    test(id: string): Promise<{
        ok: boolean;
        error?: string;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    enableWarmup(id: string, params: {
        target_per_day?: number;
        ramp_up_days?: number;
    }): Promise<WarmupConfig>;
    disableWarmup(id: string): Promise<{
        disabled: boolean;
    }>;
    getWarmup(id: string): Promise<WarmupConfig>;
}
//# sourceMappingURL=mailboxes.d.ts.map