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

export class LeadsResource {
  constructor(private http: HttpClient) {}

  create(params: {
    email: string;
    first_name?: string;
    last_name?: string;
    company?: string;
    title?: string;
    custom_variables?: Record<string, unknown>;
    campaign_id?: string;
  }): Promise<Lead> {
    return this.http.post<Lead>('/v1/leads', params);
  }

  bulkCreate(leads: Array<Omit<Parameters<LeadsResource['create']>[0], never>>, campaignId?: string): Promise<{ created: number; skipped: number }> {
    return this.http.post('/v1/leads/bulk', { leads, campaign_id: campaignId });
  }

  list(opts?: { campaign_id?: string; status?: string; page?: number; limit?: number }): Promise<LeadList> {
    return this.http.get<LeadList>('/v1/leads', opts);
  }

  get(id: string): Promise<Lead> {
    return this.http.get<Lead>(`/v1/leads/${id}`);
  }

  findByEmail(email: string): Promise<Lead> {
    return this.http.get<Lead>('/v1/leads/by-email', { email });
  }

  update(id: string, params: { custom_variables?: Record<string, unknown> }): Promise<Lead> {
    return this.http.patch<Lead>(`/v1/leads/${id}`, params);
  }

  setStatus(id: string, status: Lead['status']): Promise<Lead> {
    return this.http.patch<Lead>(`/v1/leads/${id}/status`, { status });
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/leads/${id}`);
  }
}
