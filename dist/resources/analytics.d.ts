import type { HttpClient } from '../client.js';
export interface SendAnalytics {
    sent: number;
    delivered: number;
    bounced: number;
    complained: number;
    opened: number;
    clicked: number;
    delivery_rate: number;
    open_rate: number;
    click_rate: number;
    bounce_rate: number;
}
export interface TimelinePoint extends SendAnalytics {
    date: string;
}
export declare class AnalyticsResource {
    private http;
    constructor(http: HttpClient);
    sends(opts?: {
        dateFrom?: string;
        dateTo?: string;
        domain_id?: string;
        tag_key?: string;
        tag_value?: string;
    }): Promise<SendAnalytics>;
    sendsTimeline(opts?: {
        dateFrom?: string;
        dateTo?: string;
        domain_id?: string;
    }): Promise<{
        data: TimelinePoint[];
    }>;
}
//# sourceMappingURL=analytics.d.ts.map