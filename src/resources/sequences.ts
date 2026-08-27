import type { HttpClient } from '../client.js';

export interface Sequence {
  id: string;
  name: string;
  fromName: string;
  fromEmail: string;
  status: 'active' | 'paused' | 'archived';
  trackOpens: boolean;
  trackClicks: boolean;
  stopOnReply: boolean;
  createdAt: string;
}

export interface SequenceStep {
  id: string;
  stepOrder: number;
  delayDays: number;
  delayHours: number;
  subject: string;
  htmlBody: string;
  textBody?: string;
  condition: 'always' | 'if_not_opened' | 'if_opened' | 'if_not_clicked' | 'if_not_replied';
}

export interface SequenceEnrollment {
  id: string;
  email: string;
  status: 'active' | 'paused' | 'completed' | 'unsubscribed' | 'bounced' | 'replied';
  currentStep: number;
  nextSendAt?: string;
  enrolledAt: string;
}

export class SequencesResource {
  constructor(private http: HttpClient) {}

  create(params: {
    name: string;
    from_name: string;
    from_email: string;
    mailbox_id?: string;
    track_opens?: boolean;
    track_clicks?: boolean;
    stop_on_reply?: boolean;
  }): Promise<Sequence> {
    return this.http.post<Sequence>('/v1/sequences', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<{ data: Sequence[]; total: number }> {
    return this.http.get('/v1/sequences', opts);
  }

  get(id: string): Promise<Sequence> {
    return this.http.get<Sequence>(`/v1/sequences/${id}`);
  }

  update(id: string, params: Partial<{ name: string; status: string }>): Promise<Sequence> {
    return this.http.patch<Sequence>(`/v1/sequences/${id}`, params);
  }

  duplicate(id: string): Promise<Sequence> {
    return this.http.post<Sequence>(`/v1/sequences/${id}/duplicate`);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/sequences/${id}`);
  }

  addStep(
    id: string,
    params: {
      delay_days?: number;
      delay_hours?: number;
      subject: string;
      html_body: string;
      text_body?: string;
      condition?: SequenceStep['condition'];
    },
  ): Promise<SequenceStep> {
    return this.http.post<SequenceStep>(`/v1/sequences/${id}/steps`, params);
  }

  listSteps(id: string): Promise<{ data: SequenceStep[] }> {
    return this.http.get(`/v1/sequences/${id}/steps`);
  }

  enroll(
    id: string,
    params: { emails?: string[]; list_id?: string; variables?: Record<string, string> },
  ): Promise<{ enrolled: number }> {
    return this.http.post(`/v1/sequences/${id}/contacts`, params);
  }

  listEnrollments(id: string, opts?: { status?: string; page?: number; limit?: number }): Promise<{ data: SequenceEnrollment[]; total: number }> {
    return this.http.get(`/v1/sequences/${id}/contacts`, opts);
  }

  unenroll(id: string, email: string): Promise<{ unenrolled: boolean }> {
    return this.http.delete(`/v1/sequences/${id}/contacts/${encodeURIComponent(email)}`);
  }

  listTemplates(): Promise<{ data: unknown[] }> {
    return this.http.get('/v1/sequence-templates');
  }

  createFromTemplate(templateId: string, params: { name?: string }): Promise<Sequence> {
    return this.http.post<Sequence>(`/v1/sequences/from-template/${templateId}`, params);
  }
}
