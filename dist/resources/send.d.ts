import type { HttpClient } from '../client.js';
export interface Attachment {
    filename: string;
    content: string;
    content_type: string;
}
export interface SendParams {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    cc?: string[];
    bcc?: string[];
    reply_to?: string | string[];
    attachments?: Attachment[];
    headers?: Record<string, string>;
    tags?: Record<string, string>;
    template_id?: string;
    variables?: Record<string, string>;
    domain_id?: string;
    idempotency_key?: string;
    scheduled_at?: string;
}
export interface SendResult {
    id: string;
    status: string;
    sesMessageId?: string;
}
export interface BatchResult {
    results: Array<{
        id?: string;
        error?: string;
    }>;
}
export declare class SendResource {
    private http;
    constructor(http: HttpClient);
    send(params: SendParams): Promise<SendResult>;
    batch(messages: SendParams[]): Promise<BatchResult>;
    cancelScheduled(id: string): Promise<{
        cancelled: boolean;
    }>;
}
//# sourceMappingURL=send.d.ts.map