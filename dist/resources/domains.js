export class DomainsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/domains', params);
    }
    list(opts) {
        return this.http.get('/v1/domains', opts);
    }
    get(id) {
        return this.http.get(`/v1/domains/${id}`);
    }
    verify(id) {
        return this.http.post(`/v1/domains/${id}/verify`);
    }
    delete(id) {
        return this.http.delete(`/v1/domains/${id}`);
    }
    blacklistStatus(id) {
        return this.http.get(`/v1/domains/${id}/blacklist-status`);
    }
    checkBlacklist(domain) {
        return this.http.get('/v1/domains/blacklist-check', { domain });
    }
    health(id) {
        return this.http.get(`/v1/domains/${id}/health`);
    }
}
//# sourceMappingURL=domains.js.map