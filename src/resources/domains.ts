import type { HttpClient } from '../client.js';

export interface Domain {
  id: string;
  name: string;
  status: 'pending' | 'verified' | 'failed';
  region: string;
  dkimSelector: string;
  spfStatus: string;
  dkimStatus: string;
  returnPathStatus: string;
  trackOpens: boolean;
  trackClicks: boolean;
  createdAt: string;
  verifiedAt?: string;
  dnsRecords?: DnsRecord[];
}

export interface DnsRecord {
  type: string;
  name: string;
  value: string;
  priority?: number;
}

export interface BlacklistResult {
  domain: string;
  blacklisted: boolean;
  ipListings: string[];
  domainListings: string[];
  checkedAt: string;
}

export interface DomainHealth {
  spf: { valid: boolean; record?: string };
  dkim: { valid: boolean };
  dmarc: { valid: boolean; record?: string };
  blacklists: BlacklistResult;
  score: number;
}

export class DomainsResource {
  constructor(private http: HttpClient) {}

  create(params: { name: string; region?: string; track_opens?: boolean; track_clicks?: boolean }): Promise<Domain> {
    return this.http.post<Domain>('/v1/domains', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<{ data: Domain[] }> {
    return this.http.get<{ data: Domain[] }>('/v1/domains', opts);
  }

  get(id: string): Promise<Domain> {
    return this.http.get<Domain>(`/v1/domains/${id}`);
  }

  verify(id: string): Promise<Domain> {
    return this.http.post<Domain>(`/v1/domains/${id}/verify`);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/domains/${id}`);
  }

  blacklistStatus(id: string): Promise<BlacklistResult> {
    return this.http.get<BlacklistResult>(`/v1/domains/${id}/blacklist-status`);
  }

  checkBlacklist(domain: string): Promise<BlacklistResult> {
    return this.http.get<BlacklistResult>('/v1/domains/blacklist-check', { domain });
  }

  health(id: string): Promise<DomainHealth> {
    return this.http.get<DomainHealth>(`/v1/domains/${id}/health`);
  }
}
