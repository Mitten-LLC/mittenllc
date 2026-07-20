# Mitten OS — Pilot Architecture

## Experience

The public experience is a four-answer interview with text and push-to-talk
input. Each answer is transcribed, added to a compact session state, and used to
select one next-best question. The final response is a structured First Move
Brief. Email delivery is optional and requested only after the brief is shown.

## Backend shape

1. The browser records one short answer at a time and sends it over HTTPS.
2. A server route validates size, duration, session count, and abuse limits.
3. Audio is transcribed and immediately discarded. Raw audio is not retained.
4. The interview route sends the Mitten OS prompt, compact state, and current
   answer to the Responses API.
5. Structured output returns either the next question or the final brief.
6. D1 stores aggregate usage, consent, model usage, latency, and the final brief
   only when the visitor explicitly chooses to save or email it.
7. The OpenAI API key and email-provider key remain server-side secrets.

## Initial model route

- Interview reasoning: `gpt-5.6-luna`, standard mode, low reasoning.
- Transcription pilot: `whisper-1` for predictable per-minute pricing. Compare
  `gpt-4o-mini-transcribe` on representative voices before switching.
- No speech generation in the pilot; questions appear as text.
- No fine-tuning initially. Improve the versioned prompt and evaluation set
  before considering model customization.

## Hard cost controls

- Four visitor answers per session.
- Forty-five seconds of recorded audio per answer; three minutes total.
- 1,200 characters per answer.
- Bounded output schema and token ceiling for every model call.
- Three completed sessions per network/day during the pilot.
- Application daily-spend circuit breaker plus an OpenAI project budget.
- Usage ledger records model, input/output tokens, audio seconds, and estimated
  cost without retaining raw audio.
- A stable, privacy-preserving safety identifier accompanies model requests.

## Planning estimate

Assume a complete interview uses 6,000–10,000 cumulative text input tokens,
1,000–1,500 output tokens, and three minutes of audio. At July 2026 list prices,
`gpt-5.6-luna` reasoning is roughly $0.012–$0.019 per completed session, and
`whisper-1` transcription is $0.018 for three minutes. A planning allowance of
$0.03–$0.04 per complete voice session is reasonable before email and hosting.

The pilot should start with a $25 monthly application ceiling, producing a
theoretical maximum of roughly 625–830 completed sessions at that allowance.
The real run rate should be reviewed weekly using recorded API usage rather than
estimated from traffic.
