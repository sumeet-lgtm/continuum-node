import type { HttpClient } from '../client.js';

export interface MailingList {
  id: string;
  name: string;
  description?: string;
  contactCount: number;
  createdAt: string;
}

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  customFields?: Record<string, unknown>;
  status: string;
  subscribedAt: string;
  unsubscribedAt?: string;
}

export interface ContactList {
  data: Contact[];
  total: number;
  page: number;
  limit: number;
}

export class ListsResource {
  constructor(private http: HttpClient) {}

  // Mailing lists
  create(params: { name: string; description?: string }): Promise<MailingList> {
    return this.http.post<MailingList>('/v1/lists', params);
  }

  list(opts?: { page?: number; limit?: number }): Promise<{ data: MailingList[]; total: number }> {
    return this.http.get('/v1/lists', opts);
  }

  get(id: string): Promise<MailingList> {
    return this.http.get<MailingList>(`/v1/lists/${id}`);
  }

  update(id: string, params: { name?: string; description?: string }): Promise<MailingList> {
    return this.http.patch<MailingList>(`/v1/lists/${id}`, params);
  }

  delete(id: string): Promise<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`/v1/lists/${id}`);
  }

  // Contacts within a list
  subscribe(
    listId: string,
    params: {
      email: string;
      first_name?: string;
      last_name?: string;
      custom_fields?: Record<string, unknown>;
      gdpr_consent?: boolean;
      double_optin?: boolean;
      confirm_url?: string;
    },
  ): Promise<Contact> {
    return this.http.post<Contact>(`/v1/lists/${listId}/contacts`, params);
  }

  listContacts(listId: string, opts?: { status?: string; page?: number; limit?: number; search?: string }): Promise<ContactList> {
    return this.http.get<ContactList>(`/v1/lists/${listId}/contacts`, opts);
  }

  getContact(listId: string, email: string): Promise<Contact> {
    return this.http.get<Contact>(`/v1/lists/${listId}/contacts/${encodeURIComponent(email)}`);
  }

  unsubscribe(listId: string, email: string): Promise<{ unsubscribed: boolean }> {
    return this.http.delete<{ unsubscribed: boolean }>(`/v1/lists/${listId}/contacts/${encodeURIComponent(email)}`);
  }
}
