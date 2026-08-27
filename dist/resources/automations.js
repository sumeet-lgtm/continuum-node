export class AutomationsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/automations', params);
    }
    list(opts) {
        return this.http.get('/v1/automations', opts);
    }
    get(id) {
        return this.http.get(`/v1/automations/${id}`);
    }
    update(id, params) {
        return this.http.patch(`/v1/automations/${id}`, params);
    }
    delete(id) {
        return this.http.delete(`/v1/automations/${id}`);
    }
    trigger(params) {
        return this.http.post('/v1/automations/trigger', params);
    }
    stats(id) {
        return this.http.get(`/v1/automations/${id}/stats`);
    }
    listEnrollments(id, opts) {
        return this.http.get(`/v1/automations/${id}/enrollments`, opts);
    }
    unenroll(id, email) {
        return this.http.delete(`/v1/automations/${id}/enrollments/${encodeURIComponent(email)}`);
    }
}
//# sourceMappingURL=automations.js.map