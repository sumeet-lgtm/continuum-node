export class LeadsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/leads', params);
    }
    bulkCreate(leads, campaignId) {
        return this.http.post('/v1/leads/bulk', { leads, campaign_id: campaignId });
    }
    list(opts) {
        return this.http.get('/v1/leads', opts);
    }
    get(id) {
        return this.http.get(`/v1/leads/${id}`);
    }
    findByEmail(email) {
        return this.http.get('/v1/leads/by-email', { email });
    }
    update(id, params) {
        return this.http.patch(`/v1/leads/${id}`, params);
    }
    setStatus(id, status) {
        return this.http.patch(`/v1/leads/${id}/status`, { status });
    }
    delete(id) {
        return this.http.delete(`/v1/leads/${id}`);
    }
}
//# sourceMappingURL=leads.js.map