export class AiResource {
    http;
    constructor(http) {
        this.http = http;
    }
    generateEmail(params) {
        return this.http.post('/v1/ai/generate-email', params);
    }
    classifyReply(params) {
        return this.http.post('/v1/ai/classify-reply', params);
    }
    personalize(params) {
        return this.http.post('/v1/ai/personalize', params);
    }
    detectEsp(emails) {
        return this.http.post('/v1/ai/detect-esp', { emails });
    }
}
//# sourceMappingURL=ai.js.map