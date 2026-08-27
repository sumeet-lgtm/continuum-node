import { HttpClient, ContinuumError } from './client.js';
import type { ContinuumOptions } from './client.js';
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
  readonly verify: VerifyResource;
  readonly send: SendResource;
  readonly messages: MessagesResource;
  readonly suppressions: SuppressionsResource;
  readonly templates: TemplatesResource;
  readonly domains: DomainsResource;
  readonly lists: ListsResource;
  readonly campaigns: CampaignsResource;
  readonly sequences: SequencesResource;
  readonly leads: LeadsResource;
  readonly mailboxes: MailboxesResource;
  readonly automations: AutomationsResource;
  readonly ai: AiResource;
  readonly analytics: AnalyticsResource;
  readonly usage: UsageResource;

  constructor(opts: ContinuumOptions) {
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
export type { ContinuumOptions };

// Resource types
export type { VerificationResult, BulkJobResult } from './resources/verify.js';
export type { SendParams, SendResult, BatchResult, Attachment } from './resources/send.js';
export type { Message, MessageEvent, MessageStats } from './resources/messages.js';
export type { Suppression } from './resources/suppressions.js';
export type { Template } from './resources/templates.js';
export type { Domain, DnsRecord, BlacklistResult, DomainHealth } from './resources/domains.js';
export type { MailingList, Contact } from './resources/lists.js';
export type { Campaign } from './resources/campaigns.js';
export type { Sequence, SequenceStep, SequenceEnrollment } from './resources/sequences.js';
export type { Lead } from './resources/leads.js';
export type { Mailbox, WarmupConfig } from './resources/mailboxes.js';
export type { Automation, AutomationStep, AutomationStats } from './resources/automations.js';
export type { GeneratedEmail, ReplyClassification, PersonalizedLead } from './resources/ai.js';
export type { SendAnalytics, TimelinePoint } from './resources/analytics.js';
export type { UsageQuota } from './resources/usage.js';
