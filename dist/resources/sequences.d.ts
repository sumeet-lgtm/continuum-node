import type { HttpClient } from '../client.js';
export interface Sequence {
    id: string;
    name: string;
    fromName: string;
    fromEmail: string;
    status: 'active' | 'paused' | 'archived';
    trackOpens: boolean;
    trackClicks: boolean;
    stopOnReply: boolean;
    createdAt: string;
}
export interface SequenceStep {
    id: string;
    stepOrder: number;
    delayDays: number;
    delayHours: number;
    subject: string;
    htmlBody: string;
    textBody?: string;
    condition: 'always' | 'if_not_opened' | 'if_opened' | 'if_not_clicked' | 'if_not_replied';
}
export interface SequenceEnrollment {
    id: string;
    email: string;
    status: 'active' | 'paused' | 'completed' | 'unsubscribed' | 'bounced' | 'replied';
    currentStep: number;
    nextSendAt?: string;
    enrolledAt: string;
}
export declare class SequencesResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        name: string;
        from_name: string;
        from_email: string;
        mailbox_id?: string;
        track_opens?: boolean;
        track_clicks?: boolean;
        stop_on_reply?: boolean;
    }): Promise<Sequence>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Sequence[];
        total: number;
    }>;
    get(id: string): Promise<Sequence>;
    update(id: string, params: Partial<{
        name: string;
        status: string;
    }>): Promise<Sequence>;
    duplicate(id: string): Promise<Sequence>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    addStep(id: string, params: {
        delay_days?: number;
        delay_hours?: number;
        subject: string;
        html_body: string;
        text_body?: string;
        condition?: SequenceStep['condition'];
    }): Promise<SequenceStep>;
    listSteps(id: string): Promise<{
        data: SequenceStep[];
    }>;
    enroll(id: string, params: {
        emails?: string[];
        list_id?: string;
        variables?: Record<string, string>;
    }): Promise<{
        enrolled: number;
    }>;
    listEnrollments(id: string, opts?: {
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: SequenceEnrollment[];
        total: number;
    }>;
    unenroll(id: string, email: string): Promise<{
        unenrolled: boolean;
    }>;
    listTemplates(): Promise<{
        data: unknown[];
    }>;
    createFromTemplate(templateId: string, params: {
        name?: string;
    }): Promise<Sequence>;
}
//# sourceMappingURL=sequences.d.ts.map