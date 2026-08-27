import type { HttpClient } from '../client.js';

export interface Attachment {
  filename: string;
  content: string; // base64
  content_type: string;
}

export interface SendParams {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
  reply_to?: string | string[];
  attachments?: Attachment[];
  headers?: Record<string, string>;
  tags?: Record<string, string>;
  template_id?: string;
  variables?: Record<string, string>;
  domain_id?: string;
  idempotency_key?: string;
  scheduled_at?: string; // ISO 8601
}

export interface SendResult {
  id: string;
  status: string;
  sesMessageId?: string;
}

export interface BatchResult {
  results: Array<{ id?: string; error?: string }>;
}

export class SendResource {
  constructor(private http: HttpClient) {}

  send(params: SendParams): Promise<SendResult> {
    return this.http.post<SendResult>('/v1/send', params);
  }

  batch(messages: SendParams[]): Promise<BatchResult> {
    return this.http.post<BatchResult>('/v1/send/batch', { messages });
  }

  cancelScheduled(id: string): Promise<{ cancelled: boolean }> {
    return this.http.delete<{ cancelled: boolean }>(`/v1/messages/${id}/cancel`);
  }
}
