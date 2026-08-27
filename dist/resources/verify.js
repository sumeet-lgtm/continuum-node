export class VerifyResource {
    http;
    constructor(http) {
        this.http = http;
    }
    single(email) {
        return this.http.get('/v1/verify', { email });
    }
    createBulkJob(emails, webhookUrl) {
        return this.http.post('/v1/verify/bulk', { emails, webhook_url: webhookUrl });
    }
    getBulkJob(id) {
        return this.http.get(`/v1/verify/bulk/${id}`);
    }
    listBulkJobs(opts) {
        return this.http.get('/v1/verify/bulk', opts);
    }
    getBulkResults(id, opts) {
        return this.http.get(`/v1/verify/bulk/${id}/results`, opts);
    }
}
//# sourceMappingURL=verify.js.map