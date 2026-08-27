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
export declare class ListsResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        name: string;
        description?: string;
    }): Promise<MailingList>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: MailingList[];
        total: number;
    }>;
    get(id: string): Promise<MailingList>;
    update(id: string, params: {
        name?: string;
        description?: string;
    }): Promise<MailingList>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    subscribe(listId: string, params: {
        email: string;
        first_name?: string;
        last_name?: string;
        custom_fields?: Record<string, unknown>;
        gdpr_consent?: boolean;
        double_optin?: boolean;
        confirm_url?: string;
    }): Promise<Contact>;
    listContacts(listId: string, opts?: {
        status?: string;
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<ContactList>;
    getContact(listId: string, email: string): Promise<Contact>;
    unsubscribe(listId: string, email: string): Promise<{
        unsubscribed: boolean;
    }>;
}
//# sourceMappingURL=lists.d.ts.map