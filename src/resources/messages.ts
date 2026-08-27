import type { HttpClient } from '../client.js';

export interface Message {
  id: string;
  apiKeyId: string;
  to: string;
  from: string;
  subject: string;
  status: string;
  sesMessageId?: string;
  createdAt: string;
  sentAt?: string;
  events?: MessageEvent[];
}

export interface MessageEvent {
  id: string;
  type: 'delivered' | 'bounced' | 'complained' | 'opened' | 'clicked';
  occurredAt: string;
}

export interface MessageStats {
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

export interface MessageList {
  data: Message[];
  total: number;
  page: number;
  limit: number;
}

export class MessagesResource {
  constructor(private http: HttpClient) {}

  list(opts?: {
    status?: string;
    to?: string;
    from?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<MessageList> {
    return this.http.get<MessageList>('/v1/messages', opts);
  }

  get(id: string): Promise<Message> {
    return this.http.get<Message>(`/v1/messages/${id}`);
  }

  stats(): Promise<MessageStats> {
    return this.http.get<MessageStats>('/v1/messages/stats');
  }
}
