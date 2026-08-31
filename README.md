# @continuum/api

Official Node.js SDK for [Continuum](https://continuumapi.com) — email verification, transactional sending, newsletter campaigns, and cold outreach sequences in one API.

## Installation

> **Not yet installable by anyone outside this checkout.** This package has
> never been published to npm, and this repo has no git remote configured
> yet either — so neither `npm install @continuum/api` nor
> `npm install github:<org>/continuum-node` will work today. Once this repo
> is pushed to a real GitHub remote and/or published to npm, replace this
> notice with the real install command.

```bash
npm install @continuum/api
```

Requires Node.js 18+. Zero runtime dependencies.

## Quick start

```ts
import { Continuum } from '@continuum/api';

const continuum = new Continuum({ apiKey: 'cont_live_...' });

// Verify an email
const result = await continuum.verify.single('user@example.com');
console.log(result.status); // 'valid' | 'invalid' | 'risky' | 'unknown'

// Send a transactional email
const msg = await continuum.send.send({
  from: 'Acme <hello@acme.com>',
  to: 'user@example.com',
  subject: 'Welcome to Acme',
  html: '<p>Thanks for signing up!</p>',
});
console.log(msg.id);
```

## API reference

### `verify`

```ts
// Single email
continuum.verify.single(email)

// Bulk jobs
continuum.verify.createBulkJob(emails[], webhookUrl?)
continuum.verify.getBulkJob(id)
continuum.verify.listBulkJobs({ page?, limit? })
continuum.verify.getBulkResults(id, { page?, limit?, status? })
```

### `monitor`

Continuous deliverability monitoring — the platform's most-marketed
differentiator (see continuumapi.com's homepage and comparison pages), so
this resource exists specifically to make sure it's actually reachable from
the SDK rather than requiring a raw HTTP call.

```ts
continuum.monitor.create({ email, intervalHours?, tags?, notifyOnAnyChange? })
continuum.monitor.list({ page?, limit?, isActive?, isPaused?, tag?, email? })
continuum.monitor.get(id)
continuum.monitor.update(id, { intervalHours?, isActive?, tags?, notifyOnAnyChange? })
continuum.monitor.delete(id)
continuum.monitor.recheck(id)
continuum.monitor.checks(id, { page?, limit?, statusChanged? })
```

### `send`

```ts
// Transactional
continuum.send.send({ from, to, subject, html?, text?, cc?, bcc?,
  reply_to?, attachments?, headers?, tags?,
  template_id?, variables?, domain_id?,
  idempotency_key?, scheduled_at? })

// Batch (up to 100)
continuum.send.batch(messages[])

// Cancel a scheduled send
continuum.send.cancelScheduled(id)
```

### `messages`

```ts
continuum.messages.list({ status?, to?, from?, dateFrom?, dateTo?, page?, limit? })
continuum.messages.get(id)   // includes events[]
continuum.messages.stats()
```

### `suppressions`

```ts
continuum.suppressions.list({ reason?, page?, limit? })
continuum.suppressions.add(email)
continuum.suppressions.remove(email)
```

### `templates`

```ts
continuum.templates.create({ name, subject, html_body, text_body?, variables? })
continuum.templates.list()
continuum.templates.get(id)
continuum.templates.update(id, fields)
continuum.templates.delete(id)
```

### `domains`

```ts
continuum.domains.create({ name, region?, track_opens?, track_clicks? })
continuum.domains.list()
continuum.domains.get(id)
continuum.domains.verify(id)            // re-check DNS from SES
continuum.domains.delete(id)
continuum.domains.blacklistStatus(id)   // check owned domain against 15+ DNSBLs
continuum.domains.checkBlacklist(domain) // ad-hoc check any domain
continuum.domains.health(id)            // SPF + DKIM + DMARC + blacklist + score
```

### `lists` (newsletter contacts)

```ts
continuum.lists.create({ name, description? })
continuum.lists.list()
continuum.lists.get(id)
continuum.lists.update(id, fields)
continuum.lists.delete(id)

continuum.lists.subscribe(listId, { email, first_name?, last_name?,
  custom_fields?, gdpr_consent?, double_optin?, confirm_url? })
continuum.lists.listContacts(listId, { status?, page?, limit?, search? })
continuum.lists.getContact(listId, email)
continuum.lists.unsubscribe(listId, email)
```

### `campaigns`

```ts
continuum.campaigns.create({ from_name, from_email, subject, html_body,
  list_ids[], segment_ids?, scheduled_at?, ... })
continuum.campaigns.list({ status?, page?, limit? })
continuum.campaigns.get(id)
continuum.campaigns.update(id, fields)
continuum.campaigns.send(id)
continuum.campaigns.cancel(id)
continuum.campaigns.duplicate(id)
continuum.campaigns.delete(id)
```

### `sequences` (cold outreach)

```ts
continuum.sequences.create({ name, from_name, from_email, ... })
continuum.sequences.list()
continuum.sequences.get(id)
continuum.sequences.update(id, fields)
continuum.sequences.duplicate(id)
continuum.sequences.delete(id)

continuum.sequences.addStep(id, { delay_days?, delay_hours?,
  subject, html_body, condition? })
continuum.sequences.listSteps(id)

continuum.sequences.enroll(id, { emails?, list_id?, variables? })
continuum.sequences.listEnrollments(id, { status?, page?, limit? })
continuum.sequences.unenroll(id, email)

continuum.sequences.listTemplates()
continuum.sequences.createFromTemplate(templateId, { name? })
```

### `leads`

```ts
continuum.leads.create({ email, first_name?, company?, title?, ... })
continuum.leads.bulkCreate(leads[], campaignId?)
continuum.leads.list({ campaign_id?, status?, page?, limit? })
continuum.leads.get(id)
continuum.leads.findByEmail(email)
continuum.leads.update(id, { custom_variables? })
continuum.leads.setStatus(id, 'interested' | 'not_interested' | 'replied' | ...)
continuum.leads.delete(id)
```

### `mailboxes`

```ts
continuum.mailboxes.connect({ type, username, password?, ... })
continuum.mailboxes.list()
continuum.mailboxes.get(id)
continuum.mailboxes.test(id)
continuum.mailboxes.delete(id)

continuum.mailboxes.enableWarmup(id, { target_per_day?, ramp_up_days? })
continuum.mailboxes.disableWarmup(id)
continuum.mailboxes.getWarmup(id)
```

### `automations` (event-triggered drip)

```ts
continuum.automations.create({ name, trigger_event, steps[] })
continuum.automations.list()
continuum.automations.get(id)
continuum.automations.update(id, { name?, status? })
continuum.automations.delete(id)

continuum.automations.trigger({ event, email, data? })
continuum.automations.stats(id)
continuum.automations.listEnrollments(id, { status?, page?, limit? })
continuum.automations.unenroll(id, email)
```

### `ai`

```ts
// Generate cold email variants (Growth+ plan)
continuum.ai.generateEmail({ sender, recipient, tone?, count? })

// Classify an inbound reply (Growth+ plan)
continuum.ai.classifyReply({ subject, body })

// Personalized first lines per lead (Growth+ plan)
continuum.ai.personalize({ leads[], prompt_template?, tone? })

// Detect email service provider (Google / Microsoft / Yahoo)
continuum.ai.detectEsp(emails[])
```

### `analytics`

```ts
continuum.analytics.sends({ dateFrom?, dateTo?, domain_id? })
continuum.analytics.sendsTimeline({ dateFrom?, dateTo? })
```

### `usage`

```ts
continuum.usage.get()
// → { plan, verifications: { used, limit, resets_at }, sends: { ... }, monitors: { ... } }
```

## Error handling

```ts
import { Continuum, ContinuumError } from '@continuum/api';

try {
  await continuum.verify.single('bad-email');
} catch (err) {
  if (err instanceof ContinuumError) {
    console.log(err.status);  // 422
    console.log(err.code);    // 'validation_failed'
    console.log(err.message); // human-readable
  }
}
```

## TypeScript

All request params and response types are fully exported:

```ts
import type { VerificationResult, SendParams, Campaign, Lead } from '@continuum/api';
```

## License

MIT
