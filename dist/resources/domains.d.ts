import type { HttpClient } from '../client.js';
export interface Domain {
    id: string;
    name: string;
    status: 'pending' | 'verified' | 'failed';
    region: string;
    dkimSelector: string;
    spfStatus: string;
    dkimStatus: string;
    returnPathStatus: string;
    trackOpens: boolean;
    trackClicks: boolean;
    createdAt: string;
    verifiedAt?: string;
    dnsRecords?: DnsRecord[];
}
export interface DnsRecord {
    type: string;
    name: string;
    value: string;
    priority?: number;
}
export interface BlacklistResult {
    domain: string;
    blacklisted: boolean;
    ipListings: string[];
    domainListings: string[];
    checkedAt: string;
}
export interface DomainHealth {
    spf: {
        valid: boolean;
        record?: string;
    };
    dkim: {
        valid: boolean;
    };
    dmarc: {
        valid: boolean;
        record?: string;
    };
    blacklists: BlacklistResult;
    score: number;
}
export declare class DomainsResource {
    private http;
    constructor(http: HttpClient);
    create(params: {
        name: string;
        region?: string;
        track_opens?: boolean;
        track_clicks?: boolean;
    }): Promise<Domain>;
    list(opts?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: Domain[];
    }>;
    get(id: string): Promise<Domain>;
    verify(id: string): Promise<Domain>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    blacklistStatus(id: string): Promise<BlacklistResult>;
    checkBlacklist(domain: string): Promise<BlacklistResult>;
    health(id: string): Promise<DomainHealth>;
}
//# sourceMappingURL=domains.d.ts.map