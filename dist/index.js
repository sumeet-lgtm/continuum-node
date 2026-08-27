import { HttpClient, ContinuumError } from './client.js';
import { VerifyResource } from './resources/verify.js';
import { SendResource } from './resources/send.js';
import { MessagesResource } from './resources/messages.js';
import { SuppressionsResource } from './resources/suppressions.js';
import { TemplatesResource } from './resources/templates.js';
import { DomainsResource } from './resources/domains.js';
import { ListsResource } from './resources/lists.js';
import { CampaignsResource } from './resources/campaigns.js';
import { SequencesResource } from './resources/sequences.js';
import { LeadsResource } from './resources/leads.js';
import { MailboxesResource } from './resources/mailboxes.js';
import { AutomationsResource } from './resources/automations.js';
import { AiResource } from './resources/ai.js';
import { AnalyticsResource } from './resources/analytics.js';
import { UsageResource } from './resources/usage.js';
export class Continuum {
    verify;
    send;
    messages;
    suppressions;
    templates;
    domains;
    lists;
    campaigns;
    sequences;
    leads;
    mailboxes;
    automations;
    ai;
    analytics;
    usage;
    constructor(opts) {
        const http = new HttpClient(opts);
        this.verify = new VerifyResource(http);
        this.send = new SendResource(http);
        this.messages = new MessagesResource(http);
        this.suppressions = new SuppressionsResource(http);
        this.templates = new TemplatesResource(http);
        this.domains = new DomainsResource(http);
        this.lists = new ListsResource(http);
        this.campaigns = new CampaignsResource(http);
        this.sequences = new SequencesResource(http);
        this.leads = new LeadsResource(http);
        this.mailboxes = new MailboxesResource(http);
        this.automations = new AutomationsResource(http);
        this.ai = new AiResource(http);
        this.analytics = new AnalyticsResource(http);
        this.usage = new UsageResource(http);
    }
}
export { ContinuumError };
//# sourceMappingURL=index.js.map