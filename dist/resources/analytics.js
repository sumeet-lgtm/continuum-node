export class AnalyticsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    sends(opts) {
        return this.http.get('/v1/analytics/sends', opts);
    }
    sendsTimeline(opts) {
        return this.http.get('/v1/analytics/sends/timeline', opts);
    }
}
//# sourceMappingURL=analytics.js.map