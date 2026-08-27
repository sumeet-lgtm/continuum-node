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

export class AutomationsResource {
  constructor(private http: HttpClient) {}

  create(params: { name: string; trigger_event: string; steps: AutomationStep[] }): Promise<Automation> {
    return this.http.post<Automation>('/v1/automations', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<{ data: Automation[]; total: number }> {
    return this.http.get('/v1/automations', opts);
  }

  get(id: string): Promise<Automation> {
    return this.http.get<Automation>(`/v1/automations/${id}`);
  }

  update(id: string, params: { name?: string; status?: string }): Promise<Automation> {
    return this.http.patch<Automation>(`/v1/automations/${id}`, params);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/automations/${id}`);
  }

  trigger(params: { event: string; email: string; data?: Record<string, unknown> }): Promise<{ enrolled: boolean; enrollments?: unknown[] }> {
    return this.http.post('/v1/automations/trigger', params);
  }

  stats(id: string): Promise<AutomationStats> {
    return this.http.get<AutomationStats>(`/v1/automations/${id}/stats`);
  }

  listEnrollments(id: string, opts?: { status?: string; page?: number; limit?: number }): Promise<{ data: unknown[]; total: number }> {
    return this.http.get(`/v1/automations/${id}/enrollments`, opts);
  }

  unenroll(id: string, email: string): Promise<{ unenrolled: boolean }> {
    return this.http.delete(`/v1/automations/${id}/enrollments/${encodeURIComponent(email)}`);
  }
}
