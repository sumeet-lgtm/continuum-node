export class MessagesResource {
    http;
    constructor(http) {
        this.http = http;
    }
    list(opts) {
        return this.http.get('/v1/messages', opts);
    }
    get(id) {
        return this.http.get(`/v1/messages/${id}`);
    }
    stats() {
        return this.http.get('/v1/messages/stats');
    }
}
//# sourceMappingURL=messages.js.map