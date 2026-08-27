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

export class MailboxesResource {
  constructor(private http: HttpClient) {}

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
  }): Promise<Mailbox> {
    return this.http.post<Mailbox>('/v1/mailboxes', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<{ data: Mailbox[]; total: number }> {
    return this.http.get('/v1/mailboxes', opts);
  }

  get(id: string): Promise<Mailbox> {
    return this.http.get<Mailbox>(`/v1/mailboxes/${id}`);
  }

  test(id: string): Promise<{ ok: boolean; error?: string }> {
    return this.http.post(`/v1/mailboxes/${id}/test`);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/mailboxes/${id}`);
  }

  enableWarmup(id: string, params: { target_per_day?: number; ramp_up_days?: number }): Promise<WarmupConfig> {
    return this.http.post<WarmupConfig>(`/v1/mailboxes/${id}/warmup`, params);
  }

  disableWarmup(id: string): Promise<{ disabled: boolean }> {
    return this.http.delete(`/v1/mailboxes/${id}/warmup`);
  }

  getWarmup(id: string): Promise<WarmupConfig> {
    return this.http.get<WarmupConfig>(`/v1/mailboxes/${id}/warmup`);
  }
}
