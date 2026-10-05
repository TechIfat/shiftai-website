# ShiftAi website: agent notes

Static hand-written HTML (GitHub Pages, shiftaiconsulting.co.uk, deployed from `main`). Each page carries its own inline `<style>`; there is no shared stylesheet, so a colour change must be made page by page.

## Colour system: information vs action

**Rule.** Ink and light brass tint, alternating, are **information cards** (they explain something). Warm brass is an **action block** (the visitor does something: book, register, email, start a check). Do not use warm brass for information, and do not use ink or tint for an action block.

| Role | Background | Text | Contrast |
|---|---|---|---|
| Information card, ink | `#2d3561` | parchment `#f4f3ef` (headings, body); brass-on-ink `#e8b080` (small labels) | 10.55:1; 6.11:1 |
| Information card, light brass tint | parchment `#f4f3ef` + `rgba(196,119,58,0.08)` (renders about `#f0e9e1`) | ink `#2d3561`; body `#55546a`; brass-text `#8a4a14` (small labels) | 9.73:1; 6.10:1; 5.68:1 |
| Action block | warm brass `#dba67a`, 1px border `#c4773a`, radius 10px | ink `#2d3561` | 5.44:1 |
| Pill on an action block | ink `#2d3561` | parchment `#f4f3ef` | 10.55:1 |
| Pill on an ink card | warm brass `#dba67a` | ink `#2d3561` | 5.44:1 |
| Button on an action block | ink `#2d3561` (or white `#ffffff` with ink text and a 2px ink border) | parchment `#f4f3ef` (ink on white) | 10.55:1 (11.71:1) |
| Option or sub-card inside an action block | white `#ffffff` | ink `#2d3561` | 11.71:1 |

Other tokens: page background parchment `#f4f3ef`; ink-on-parchment is 10.55:1.

Notes:
- Minimum for any text is 4.5:1 (WCAG AA). Check the pair before adding a new one.
- Borders and card edges are non-text, so they are not held to 4.5:1. A white button on warm brass is 2.15:1, which is why those buttons get a 2px ink border.
- The brass outline card (`1.5px solid #c4773a` on parchment) is retired: information uses ink or the light tint, actions use warm brass. Do not add new ones.
- **Exception: closing CTA bands.** The full-width grey (`--bg2`) closing bands ("Start here" / contact) with an ink button on index, complyai, enablement, ai-for-good and healthcare stay as they are. They are bands, not cards, and are deliberately exempt from the warm-brass action rule.
- Small text on the light tint must be `#55546a` (6.10:1) or `#8a4a14` (5.68:1); `--muted` `#6b6a80` (4.36:1 on the 8% tint) and `--brass` `#c4773a` (2.89:1) fail 4.5:1 there.
- The contact page's "Ask the Discovery Agent" card is hidden unless `chat-widget.js` has injected the widget, so it returns by itself when `CHAT_ENABLED` is set to true.
- Specificity trap: a generic `.card p{color:...}` rule beats a pill's colour. Write pill selectors as `.card p.pill`. This has caused invisible pill text twice.

## Content rules

- No claims of NHS work delivered. The healthcare work is consulting plus a research index in development; nothing from the index is published.
- Say "in development" or "planned, not yet available" for anything not live.
- Independent: not affiliated with or endorsed by the NHS.
- Healthcare standards claims (DCB0129, DCB0160, DTAC) must be checked against the NHS England specification documents, not recalled from memory.

## Workflow

- Preview first: show screenshots at 1280px and 390px, then commit, PR and merge only on approval.
- Headless Chrome cannot render narrower than about 500px; for 390px, load the page in a 390px-wide iframe.
- The chat widget is disabled (`CHAT_ENABLED=false` in `chat-widget.js`); do not re-enable it without being asked.
- Do not commit `blog/linkedin-assets/` unless asked.
