import type { HttpClient } from '../client.js';
export interface Campaign {
    id: string;
    fromName: string;
    fromEmail: string;
    subject: string;
    status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed' | 'cancelled';
    totalRecipients: number;
    sentCount: number;
    deliveredCount: number;
    openCount: number;
    clickCount: number;
    bounceCount: number;
    scheduledAt?: string;
    sentAt?: string;
    createdAt: string;
}
export interface CampaignList {
    data: Campaign[];
    total: number;
    page: number;
    limit: number;
}
export declare class CampaignsResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        from_name: string;
        from_email: string;
        domain_id?: string;
        reply_to?: string;
        subject: string;
        html_body: string;
        text_body?: string;
        list_ids: string[];
        segment_ids?: string[];
        exclude_list_ids?: string[];
        track_opens?: boolean;
        track_clicks?: boolean;
        scheduled_at?: string;
    }): Promise<Campaign>;
    list(opts?: {
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<CampaignList>;
    get(id: string): Promise<Campaign>;
    update(id: string, params: Partial<Campaign>): Promise<Campaign>;
    send(id: string): Promise<Campaign>;
    cancel(id: string): Promise<Campaign>;
    duplicate(id: string): Promise<Campaign>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=campaigns.d.ts.map