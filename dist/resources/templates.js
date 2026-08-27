export class TemplatesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    create(params) {
        return this.http.post('/v1/templates', params);
    }
    list(opts) {
        return this.http.get('/v1/templates', opts);
    }
    get(id) {
        return this.http.get(`/v1/templates/${id}`);
    }
    update(id, params) {
        return this.http.patch(`/v1/templates/${id}`, params);
    }
    delete(id) {
        return this.http.delete(`/v1/templates/${id}`);
    }
}
//# sourceMappingURL=templates.js.map