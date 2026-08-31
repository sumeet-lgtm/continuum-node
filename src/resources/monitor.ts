import type { HttpClient } from '../client.js';

export interface Monitor {
  id: string;
  email: string;
  intervalHours: number;
  isActive: boolean;
  isPaused: boolean;
  lastCheckedAt: string | null;
  nextCheckAt: string;
  lastStatus: string | null;
  consecutiveFailures: number;
  pausedAt: string | null;
  failureReason: string | null;
  tags: string[];
  notifyOnAnyChange: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MonitorListResult {
  data: Monitor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MonitorCheck {
  id: string;
  monitorId: string;
  status: string;
  statusChanged: boolean;
  source: string;
  durationMs: number;
  createdAt: string;
}

export interface MonitorCheckListResult {
  data: MonitorCheck[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateMonitorParams {
  email: string;
  intervalHours?: number;
  tags?: string[];
  notifyOnAnyChange?: boolean;
}

export interface UpdateMonitorParams {
  intervalHours?: number;
  isActive?: boolean;
  tags?: string[];
  notifyOnAnyChange?: boolean;
}

export interface ListMonitorsParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  isPaused?: boolean;
  tag?: string;
  email?: string;
}

export class MonitorResource {
  constructor(private http: HttpClient) {}

  create(params: CreateMonitorParams): Promise<Monitor> {
    return this.http.post<Monitor>('/v1/monitoring', params);
  }

  list(opts?: ListMonitorsParams): Promise<MonitorListResult> {
    return this.http.get<MonitorListResult>('/v1/monitoring', opts as Record<string, string | number | boolean | undefined>);
  }

  get(id: string): Promise<Monitor> {
    return this.http.get<Monitor>(`/v1/monitoring/${id}`);
  }

  update(id: string, params: UpdateMonitorParams): Promise<Monitor> {
    return this.http.patch<Monitor>(`/v1/monitoring/${id}`, params);
  }

  delete(id: string): Promise<{ id: string; deleted: boolean }> {
    return this.http.delete<{ id: string; deleted: boolean }>(`/v1/monitoring/${id}`);
  }

  recheck(id: string): Promise<Monitor> {
    return this.http.post<Monitor>(`/v1/monitoring/${id}/recheck`);
  }

  checks(id: string, opts?: { page?: number; limit?: number; statusChanged?: boolean }): Promise<MonitorCheckListResult> {
    return this.http.get<MonitorCheckListResult>(`/v1/monitoring/${id}/checks`, opts as Record<string, string | number | boolean | undefined>);
  }
}
