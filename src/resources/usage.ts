import type { HttpClient } from '../client.js';

export interface UsageQuota {
  plan: string;
  verifications: { used: number; limit: number; resets_at: string };
  sends: { used: number; limit: number; resets_at: string };
  monitors: { active: number; limit: number };
}

export class UsageResource {
  constructor(private http: HttpClient) {}

  get(): Promise<UsageQuota> {
    return this.http.get<UsageQuota>('/v1/usage');
  }
}
