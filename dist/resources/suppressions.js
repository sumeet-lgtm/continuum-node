export class SuppressionsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    list(opts) {
        return this.http.get('/v1/suppressions', opts);
    }
    add(email) {
        return this.http.post('/v1/suppressions', { email, reason: 'manual' });
    }
    remove(email) {
        return this.http.delete(`/v1/suppressions/${encodeURIComponent(email)}`);
    }
}
//# sourceMappingURL=suppressions.js.map