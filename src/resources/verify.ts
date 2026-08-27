import type { HttpClient } from '../client.js';

export interface VerificationResult {
  email: string;
  status: 'valid' | 'invalid' | 'risky' | 'unknown';
  score: number;
  checks: {
    format: boolean;
    mx: boolean;
    disposable: boolean;
    isToxic?: boolean;
    isAbuse?: boolean;
  };
  reason?: string;
  domain?: string;
  isFreeProvider?: boolean;
  isRoleAccount?: boolean;
  createdAt: string;
}

export interface BulkJobResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  totalEmails: number;
  processedCount: number;
  validCount: number;
  invalidCount: number;
  riskyCount: number;
  createdAt: string;
  completedAt?: string;
}

export interface BulkListResult {
  data: BulkJobResult[];
  total: number;
  page: number;
  limit: number;
}

export interface BulkEmailResult {
  data: VerificationResult[];
  total: number;
  page: number;
  limit: number;
}

export class VerifyResource {
  constructor(private http: HttpClient) {}

  single(email: string): Promise<VerificationResult> {
    return this.http.get<VerificationResult>('/v1/verify', { email });
  }

  createBulkJob(emails: string[], webhookUrl?: string): Promise<{ id: string; status: string }> {
    return this.http.post('/v1/verify/bulk', { emails, webhook_url: webhookUrl });
  }

  getBulkJob(id: string): Promise<BulkJobResult> {
    return this.http.get<BulkJobResult>(`/v1/verify/bulk/${id}`);
  }

  listBulkJobs(opts?: { page?: number; limit?: number }): Promise<BulkListResult> {
    return this.http.get<BulkListResult>('/v1/verify/bulk', opts);
  }

  getBulkResults(id: string, opts?: { page?: number; limit?: number; status?: string }): Promise<BulkEmailResult> {
    return this.http.get<BulkEmailResult>(`/v1/verify/bulk/${id}/results`, opts);
  }
}
