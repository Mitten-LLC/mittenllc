# Mitten booking with Google Calendar

## Recommended first release

Use a native Google Calendar **Appointment schedule** owned by `ben@mitten.consulting`, then embed its public booking page in the Mitten website. This replaces Calendly without creating a second scheduling system.

The site already supports this path. Set the public runtime variable below to the Google appointment-schedule booking URL:

```text
GOOGLE_BOOKING_URL=https://calendar.google.com/calendar/appointments/...
```

When the variable is absent, the homepage displays a working email fallback instead of a broken calendar.

## Suggested meeting defaults

- Name: Mitten intro conversation
- Duration: 30 minutes
- Location: Google Meet
- Buffer: 15 minutes before and after
- Daily limit: 3
- Booking window: 2 hours to 30 days in advance
- Intake fields: name, email, organization, and “What hard problem should we discuss?”

## Why this is the right architecture now

Google remains the source of truth for availability, conflict checking, event creation, Meet links, reminders, rescheduling, and cancellation. The website owns the brand and context around the embed but not scheduling logic.

Building a custom scheduler is only warranted if the native experience later blocks a real product requirement. A reliable custom version would need Google OAuth, encrypted token storage, free/busy queries, timezone handling, temporary slot locks, idempotent event creation, confirmation email, cancellation and rescheduling, abuse protection, and operational monitoring.

## Access dependency

The currently connected account can read free/busy status for `ben@mitten.consulting` but does not own that calendar. The appointment schedule must therefore be created while signed into the owning Mitten Google account, or that account must be connected with write access.
