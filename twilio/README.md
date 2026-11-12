# Twilio Serverless SMS opt-in backend

This folder contains Twilio Serverless Functions used by `michaelako.com` to:

- Accept SMS opt-in form submissions
- Record consent metadata for compliance (including the disclosure text version shown at opt-in)
- Send an initial confirmation SMS
- Optionally handle inbound `HELP` / `STOP` keywords if you are not using Twilio Advanced Opt-Out

## Functions

- `functions/optin.js`: HTTP endpoint for the website opt-in form (`POST`)
- `functions/inbound.js`: Messaging webhook endpoint for inbound keywords (`POST` from Twilio)

## Required environment variables (Twilio Functions)

Set these in your Twilio Serverless environment:

- `SYNC_SERVICE_SID`: Twilio Sync Service SID used to store consent records
- `SYNC_MAP_NAME`: Sync Map name for subscriber records (default: `sms_optins`)
- `MESSAGING_SERVICE_SID`: Messaging Service SID to send confirmation SMS from (recommended)
  - Alternatively, set `FROM_NUMBER` (E.164) if you are not using a Messaging Service
- `ALLOWED_ORIGINS`: comma-separated allowed CORS origins (default: `https://michaelako.com,https://www.michaelako.com`)
- `CONFIRMATION_MESSAGE`: optional override for the confirmation SMS body

Optional (used by `inbound.js`):

- `PROGRAM_NAME`: defaults to `Michaela Kotarba Yoga Updates`
- `SUPPORT_EMAIL`: defaults to `michaelakotarba@gmail.com`

## Deploy (Twilio CLI)

1. Install the Twilio CLI and Serverless plugin:

```bash
npm i -g twilio-cli
twilio plugins:install @twilio-labs/plugin-serverless
```

2. Authenticate:

```bash
twilio login
```

3. Deploy from this folder:

```bash
cd twilio
twilio serverless:deploy
```

During deploy, configure the environment variables listed above for your chosen environment (e.g. `prod`).

## Hook up inbound keywords (HELP / STOP)

If you use **Twilio Advanced Opt-Out**, Twilio will automatically handle standard opt-out keywords (including `STOP`) for you.

If you are **not** using Advanced Opt-Out, configure your Messaging Service (or phone number) inbound webhook to point to the deployed `inbound` function URL so `HELP`/`STOP` can be answered.

## Configure the website endpoint

The Astro site posts to a build-time public env var:

- `PUBLIC_SMS_OPTIN_ENDPOINT`: the deployed URL of the `optin` function

For GitHub Pages deploys, set a repo variable named `PUBLIC_SMS_OPTIN_ENDPOINT` and the deploy workflow will pass it into the build.

