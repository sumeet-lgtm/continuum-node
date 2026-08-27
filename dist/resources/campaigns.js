export class CampaignsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/campaigns', params);
    }
    list(opts) {
        return this.http.get('/v1/campaigns', opts);
    }
    get(id) {
        return this.http.get(`/v1/campaigns/${id}`);
    }
    update(id, params) {
        return this.http.patch(`/v1/campaigns/${id}`, params);
    }
    send(id) {
        return this.http.post(`/v1/campaigns/${id}/send`);
    }
    cancel(id) {
        return this.http.post(`/v1/campaigns/${id}/cancel`);
    }
    duplicate(id) {
        return this.http.post(`/v1/campaigns/${id}/duplicate`);
    }
    delete(id) {
        return this.http.delete(`/v1/campaigns/${id}`);
    }
}
//# sourceMappingURL=campaigns.js.map