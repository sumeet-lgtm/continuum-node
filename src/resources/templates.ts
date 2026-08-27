import type { HttpClient } from '../client.js';

export interface Template {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  variables?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateList {
  data: Template[];
  total: number;
  page: number;
  limit: number;
}

export class TemplatesResource {
  constructor(private http: HttpClient) {}

  create(params: { name: string; subject: string; html_body: string; text_body?: string; variables?: string[] }): Promise<Template> {
    return this.http.post<Template>('/v1/templates', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<TemplateList> {
    return this.http.get<TemplateList>('/v1/templates', opts);
  }

  get(id: string): Promise<Template> {
    return this.http.get<Template>(`/v1/templates/${id}`);
  }

  update(id: string, params: Partial<{ name: string; subject: string; html_body: string; text_body: string; variables: string[] }>): Promise<Template> {
    return this.http.patch<Template>(`/v1/templates/${id}`, params);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/templates/${id}`);
  }
}
