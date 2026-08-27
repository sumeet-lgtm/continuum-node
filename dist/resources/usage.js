export class UsageResource {
    http;
    constructor(http) {
        this.http = http;
    }
    get() {
        return this.http.get('/v1/usage');
    }
}
//# sourceMappingURL=usage.js.map