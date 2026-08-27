import type { HttpClient } from '../client.js';
export interface GeneratedEmail {
    subject: string;
    body: string;
}
export interface ReplyClassification {
    category: 'interested' | 'not_interested' | 'out_of_office' | 'referral' | 'meeting_request' | 'unsubscribe' | 'question';
    confidence: number;
    suggested_action: string;
}
export interface PersonalizedLead {
    email: string;
    first_line: string | null;
    error?: string;
}
export declare class AiResource {
    private http;
    constructor(http: HttpClient);
    generateEmail(params: {
        sender: {
            name: string;
            company: string;
            product: string;
        };
        recipient: {
            industry?: string;
            pain_point?: string;
            use_case?: string;
        };
        tone?: 'professional' | 'casual' | 'direct';
        count?: number;
    }): Promise<{
        variants: GeneratedEmail[];
    }>;
    classifyReply(params: {
        subject: string;
        body: string;
    }): Promise<ReplyClassification>;
    personalize(params: {
        leads: Array<{
            email: string;
            first_name?: string;
            company?: string;
            title?: string;
            company_description?: string;
        }>;
        prompt_template?: string;
        tone?: 'professional' | 'casual' | 'witty';
    }): Promise<{
        results: PersonalizedLead[];
    }>;
    detectEsp(emails: string[]): Promise<{
        results: Array<{
            email: string;
            esp: 'google' | 'microsoft' | 'yahoo' | 'other';
        }>;
    }>;
}
//# sourceMappingURL=ai.d.ts.map