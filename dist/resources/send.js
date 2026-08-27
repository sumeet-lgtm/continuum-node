export class SendResource {
    http;
    constructor(http) {
        this.http = http;
    }
    send(params) {
        return this.http.post('/v1/send', params);
    }
    batch(messages) {
        return this.http.post('/v1/send/batch', { messages });
    }
    cancelScheduled(id) {
        return this.http.delete(`/v1/messages/${id}/cancel`);
    }
}
//# sourceMappingURL=send.js.map