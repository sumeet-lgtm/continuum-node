export class ListsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    // Mailing lists
    create(params) {
        return this.http.post('/v1/lists', params);
    }
    list(opts) {
        return this.http.get('/v1/lists', opts);
    }
    get(id) {
        return this.http.get(`/v1/lists/${id}`);
    }
    update(id, params) {
        return this.http.patch(`/v1/lists/${id}`, params);
    }
    delete(id) {
        return this.http.delete(`/v1/lists/${id}`);
    }
    // Contacts within a list
    subscribe(listId, params) {
        return this.http.post(`/v1/lists/${listId}/contacts`, params);
    }
    listContacts(listId, opts) {
        return this.http.get(`/v1/lists/${listId}/contacts`, opts);
    }
    getContact(listId, email) {
        return this.http.get(`/v1/lists/${listId}/contacts/${encodeURIComponent(email)}`);
    }
    unsubscribe(listId, email) {
        return this.http.delete(`/v1/lists/${listId}/contacts/${encodeURIComponent(email)}`);
    }
}
//# sourceMappingURL=lists.js.map