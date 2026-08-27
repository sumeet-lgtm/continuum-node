import type { HttpClient } from '../client.js';

export interface Suppression {
  email: string;
  reason: 'hard_bounce' | 'soft_bounce' | 'complaint' | 'manual' | 'unsubscribed';
  apiKeyId: string;
  createdAt: string;
}

export interface SuppressionList {
  data: Suppression[];
  total: number;
  page: number;
  limit: number;
}

export class SuppressionsResource {
  constructor(private http: HttpClient) {}

  list(opts?: { reason?: string; page?: number; limit?: number }): Promise<SuppressionList> {
    return this.http.get<SuppressionList>('/v1/suppressions', opts);
  }

  add(email: string): Promise<Suppression> {
    return this.http.post<Suppression>('/v1/suppressions', { email, reason: 'manual' });
  }

  remove(email: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/suppressions/${encodeURIComponent(email)}`);
  }
}
