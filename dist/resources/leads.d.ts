import type { HttpClient } from '../client.js';
export interface Lead {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    title?: string;
    customVars?: Record<string, unknown>;
    status: 'active' | 'interested' | 'not_interested' | 'replied' | 'unsubscribed' | 'bounced' | 'do_not_contact';
    createdAt: string;
}
export interface LeadList {
    data: Lead[];
    total: number;
    page: number;
    limit: number;
}
export declare class LeadsResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        email: string;
        first_name?: string;
        last_name?: string;
        company?: string;
        title?: string;
        custom_variables?: Record<string, unknown>;
        campaign_id?: string;
    }): Promise<Lead>;
    bulkCreate(leads: Array<Omit<Parameters<LeadsResource['create']>[0], never>>, campaignId?: string): Promise<{
        created: number;
        skipped: number;
    }>;
    list(opts?: {
        campaign_id?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<LeadList>;
    get(id: string): Promise<Lead>;
    findByEmail(email: string): Promise<Lead>;
    update(id: string, params: {
        custom_variables?: Record<string, unknown>;
    }): Promise<Lead>;
    setStatus(id: string, status: Lead['status']): Promise<Lead>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=leads.d.ts.map