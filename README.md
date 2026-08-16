# Wisechamps Payment Checkout

React checkout surface for buying live-quiz credit packs. A student enters their email, the app resolves their record and grade from the CRM through the platform API, they pick a pack, and the app requests a customised Razorpay payment link for that exact amount. Capture is reconciled back into Zoho CRM server-side.

## Overview

Students needed a way to top up quiz credits without an account, a password or a support ticket. Pricing also depends on who they are — grade and plan change the amount — so a static payment page was not enough.

This app keeps the flow to a single screen: identify by email, confirm the pack, get redirected to a payment link generated for that student. No card details, keys or payment state live in the browser.

## Key Features

- **Email-based identification** — no password; the email resolves the student record and grade before any pricing is shown
- **Grade-aware pricing** — the pack amount is derived from the resolved record rather than hard-coded in the client
- **Server-generated Razorpay links** — the client asks the API for a payment link and redirects; it never holds Razorpay credentials
- **CRM reconciliation** — capture is handled and written back to Zoho CRM by the backend, so the CRM stays the source of truth
- **Referral entry point** — referral context is carried through the flow
- **Explicit loading and error states** — every network step has a rendered state rather than a silent spinner
- **Mobile-first single-page flow** — Chakra UI with Framer Motion transitions and a scrolling social-proof marquee

## Tech Stack

React · Chakra UI · Framer Motion · Axios · animate.css · react-fast-marquee · @uiball/loaders · Create React App

## Architecture / How It Works

```
src/
  App.jsx              the whole checkout flow and its state machine
  components/Header    branding and navigation
  assets/              logo and voucher artwork
public/                manifest, redirects, static shell
```

The flow is a small state machine held in `App.jsx` — `email`, `mode`, `user`, `amount`, `loading` and `error`. Entering an email calls the platform API, which looks the student up in Zoho CRM and returns their record and grade. `mode` then decides what renders: the lookup form, the pack selector, or an error state. Confirming a pack posts to the API's payment-link endpoint and redirects the browser to the Razorpay-hosted link.

Payment credentials, link creation and capture all live in [backend.wisechamps.app](https://github.com/web-dev-akash/backend.wisechamps.app). This repository is deliberately the thin, public-facing half.

## Engineering Challenges

**No account, but personalised pricing.** Identification is a single email field, so the app has to handle every branch that follows — unknown email, known student, student with no active plan — without a login flow to lean on.

**Keeping payments out of the client.** Generating the Razorpay link server-side means the browser never sees a key or an amount it could tamper with; the client only ever receives a URL to redirect to.

**Redirect-based payment flow.** The user leaves the app to pay and comes back, so the app cannot assume continuity of in-memory state — the CRM record, not the browser, is the source of truth on return.

## Running Locally

```bash
git clone https://github.com/web-dev-akash/payment.wisechamps.com.git
cd payment.wisechamps.com
npm install
npm start
```

Runs on http://localhost:3000. The app talks to the deployed platform API; no credentials or environment variables are required to run the client, and none are committed to this repository.

## Future Improvements

- Split `App.jsx` into step components and lift the flow into a reducer
- Add a return-from-payment confirmation screen driven by a status lookup
- Migrate off Create React App to Vite
