export class MailboxesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    connect(params) {
        return this.http.post('/v1/mailboxes', params);
    }
    list(opts) {
        return this.http.get('/v1/mailboxes', opts);
    }
    get(id) {
        return this.http.get(`/v1/mailboxes/${id}`);
    }
    test(id) {
        return this.http.post(`/v1/mailboxes/${id}/test`);
    }
    delete(id) {
        return this.http.delete(`/v1/mailboxes/${id}`);
    }
    enableWarmup(id, params) {
        return this.http.post(`/v1/mailboxes/${id}/warmup`, params);
    }
    disableWarmup(id) {
        return this.http.delete(`/v1/mailboxes/${id}/warmup`);
    }
    getWarmup(id) {
        return this.http.get(`/v1/mailboxes/${id}/warmup`);
    }
}
//# sourceMappingURL=mailboxes.js.map