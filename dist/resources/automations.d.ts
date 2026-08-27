import type { HttpClient } from '../client.js';
export interface AutomationStep {
    delay_hours?: number;
    subject: string;
    html_body: string;
    text_body?: string;
    from_name?: string;
    from_email?: string;
}
export interface Automation {
    id: string;
    name: string;
    triggerEvent: string;
    status: string;
    createdAt: string;
    steps: AutomationStep[];
}
export interface AutomationStats {
    automationId: string;
    enrollments: {
        total: number;
        active: number;
        completed: number;
        unsubscribed: number;
        bounced: number;
    };
    completion_rate: number;
    unsubscribe_rate: number;
}
export declare class AutomationsResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        name: string;
        trigger_event: string;
        steps: AutomationStep[];
    }): Promise<Automation>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Automation[];
        total: number;
    }>;
    get(id: string): Promise<Automation>;
    update(id: string, params: {
        name?: string;
        status?: string;
    }): Promise<Automation>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    trigger(params: {
        event: string;
        email: string;
        data?: Record<string, unknown>;
    }): Promise<{
        enrolled: boolean;
        enrollments?: unknown[];
    }>;
    stats(id: string): Promise<AutomationStats>;
    listEnrollments(id: string, opts?: {
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: unknown[];
        total: number;
    }>;
    unenroll(id: string, email: string): Promise<{
        unenrolled: boolean;
    }>;
}
//# sourceMappingURL=automations.d.ts.map