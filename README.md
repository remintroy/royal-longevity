# Royal Longevity

## PostHog analytics

The browser SDK initializes in `instrumentation-client.ts` and captures page views
on initial load and client-side navigation, alongside PostHog's default autocapture.
This applies to both English and Arabic routes.

Set these values in `.env.local` and in your deployment's build environment:

```dotenv
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Copy the public project token and ingestion host from your PostHog project settings.
EU projects use `https://eu.i.posthog.com`; self-hosted projects use their own host.
Do not use a personal API key. Analytics stays inactive if either value is missing.
Use a separate project for local development if you want to keep production data clean.

Restart the development server after changing these values. For deployments, set
them before building and rebuild after changes: Next.js embeds public environment
variables in the browser bundle at build time.

To verify, open the site, navigate between pages, and check PostHog's live events
for `$pageview` events. Ad blockers can prevent delivery.

Setup follows the [PostHog Next.js guide](https://posthog.com/docs/libraries/next-js).
