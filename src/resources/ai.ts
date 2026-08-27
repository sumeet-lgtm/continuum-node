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

export class AiResource {
  constructor(private http: HttpClient) {}

  generateEmail(params: {
    sender: { name: string; company: string; product: string };
    recipient: { industry?: string; pain_point?: string; use_case?: string };
    tone?: 'professional' | 'casual' | 'direct';
    count?: number;
  }): Promise<{ variants: GeneratedEmail[] }> {
    return this.http.post('/v1/ai/generate-email', params);
  }

  classifyReply(params: { subject: string; body: string }): Promise<ReplyClassification> {
    return this.http.post('/v1/ai/classify-reply', params);
  }

  personalize(params: {
    leads: Array<{ email: string; first_name?: string; company?: string; title?: string; company_description?: string }>;
    prompt_template?: string;
    tone?: 'professional' | 'casual' | 'witty';
  }): Promise<{ results: PersonalizedLead[] }> {
    return this.http.post('/v1/ai/personalize', params);
  }

  detectEsp(emails: string[]): Promise<{ results: Array<{ email: string; esp: 'google' | 'microsoft' | 'yahoo' | 'other' }> }> {
    return this.http.post('/v1/ai/detect-esp', { emails });
  }
}
