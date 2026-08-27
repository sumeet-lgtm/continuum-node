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
export declare class MessagesResource {
    private http;
    constructor(http: HttpClient);
    list(opts?: {
        status?: string;
        to?: string;
        from?: string;
        dateFrom?: string;
        dateTo?: string;
        page?: number;
        limit?: number;
    }): Promise<MessageList>;
    get(id: string): Promise<Message>;
    stats(): Promise<MessageStats>;
}
//# sourceMappingURL=messages.d.ts.map