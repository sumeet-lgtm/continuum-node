export class SequencesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/sequences', params);
    }
    list(opts) {
        return this.http.get('/v1/sequences', opts);
    }
    get(id) {
        return this.http.get(`/v1/sequences/${id}`);
    }
    update(id, params) {
        return this.http.patch(`/v1/sequences/${id}`, params);
    }
    duplicate(id) {
        return this.http.post(`/v1/sequences/${id}/duplicate`);
    }
    delete(id) {
        return this.http.delete(`/v1/sequences/${id}`);
    }
    addStep(id, params) {
        return this.http.post(`/v1/sequences/${id}/steps`, params);
    }
    listSteps(id) {
        return this.http.get(`/v1/sequences/${id}/steps`);
    }
    enroll(id, params) {
        return this.http.post(`/v1/sequences/${id}/contacts`, params);
    }
    listEnrollments(id, opts) {
        return this.http.get(`/v1/sequences/${id}/contacts`, opts);
    }
    unenroll(id, email) {
        return this.http.delete(`/v1/sequences/${id}/contacts/${encodeURIComponent(email)}`);
    }
    listTemplates() {
        return this.http.get('/v1/sequence-templates');
    }
    createFromTemplate(templateId, params) {
        return this.http.post(`/v1/sequences/from-template/${templateId}`, params);
    }
}
//# sourceMappingURL=sequences.js.map