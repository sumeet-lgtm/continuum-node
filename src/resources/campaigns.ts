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

export class CampaignsResource {
  constructor(private http: HttpClient) {}

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
  }): Promise<Campaign> {
    return this.http.post<Campaign>('/v1/campaigns', params);
  }

  list(opts?: { status?: string; page?: number; limit?: number }): Promise<CampaignList> {
    return this.http.get<CampaignList>('/v1/campaigns', opts);
  }

  get(id: string): Promise<Campaign> {
    return this.http.get<Campaign>(`/v1/campaigns/${id}`);
  }

  update(id: string, params: Partial<Campaign>): Promise<Campaign> {
    return this.http.patch<Campaign>(`/v1/campaigns/${id}`, params);
  }

  send(id: string): Promise<Campaign> {
    return this.http.post<Campaign>(`/v1/campaigns/${id}/send`);
  }

  cancel(id: string): Promise<Campaign> {
    return this.http.post<Campaign>(`/v1/campaigns/${id}/cancel`);
  }

  duplicate(id: string): Promise<Campaign> {
    return this.http.post<Campaign>(`/v1/campaigns/${id}/duplicate`);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/campaigns/${id}`);
  }
}
