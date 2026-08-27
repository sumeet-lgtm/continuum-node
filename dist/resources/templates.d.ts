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
export declare class TemplatesResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        name: string;
        subject: string;
        html_body: string;
        text_body?: string;
        variables?: string[];
    }): Promise<Template>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<TemplateList>;
    get(id: string): Promise<Template>;
    update(id: string, params: Partial<{
        name: string;
        subject: string;
        html_body: string;
        text_body: string;
        variables: string[];
    }>): Promise<Template>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=templates.d.ts.map