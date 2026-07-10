# DESIGN.md — LernPrüfSim

The visual system for LPSim. Built as a token layer over Angular Material 3, so
Material components (card, button, toggle, field, radio, checkbox) inherit the
brand automatically. Source of truth: `src/styles/_tokens.scss` + `src/styles.scss`.

register: product

## Direction

Calm, focused, quietly technical. A study instrument, not a gamified toy. The
subject is Linux/sysadmin, but the design deliberately avoids the "hacker terminal"
cliché (no neon green on black). Two modes share one system at different
temperatures: **Lernmodus = teal (calm)**, **Prüfung = amber (timed, alert)**.

## Colour (OKLCH, light + dark)

Never `#000`/`#fff`; all neutrals are faintly tinted toward the brand hue.
Defined as `--mat-sys-*` overrides so Material follows the brand, plus a private
`--lp-*` layer.

| Role | Meaning | Light | Dark |
|---|---|---|---|
| primary | brand, nav, actions, learning accent | `oklch(0.54 0.088 194)` teal | `oklch(0.8 0.1 190)` |
| tertiary | exam / timed context | `oklch(0.66 0.13 66)` amber | `oklch(0.82 0.12 74)` |
| error | wrong answers, destructive | `oklch(0.57 0.185 24)` coral | `oklch(0.72 0.16 24)` |
| `--lp-success` | correct answers | `oklch(0.56 0.135 150)` green | `oklch(0.75 0.13 150)` |
| surface / background | tinted near-white / deep teal-charcoal | `oklch(0.99 0.003 195)` | `oklch(0.2 0.013 210)` |

Correctness (green/red) is the most important signal and is **never colour-only**:
always paired with an icon or `✓`/`✕` label. Brand teal (hue ~194) is kept distinct
from success green (hue 150) so the two never blur.

Theme is switched via `<html data-theme="light|dark">` (see `ThemeStore`); first paint
respects `prefers-color-scheme`, and an inline script in `index.html` prevents a flash.

## Type

- **Inter** for all UI, **JetBrains Mono** for Linux commands, paths and the fill-in
  input. Both self-hosted via `@fontsource/*` (offline-safe, no CDN).
- Headings 700, tight tracking (`-0.01…-0.03em`), `text-wrap: balance`.
- Body 1rem/1.6, prose capped ~72ch.

## Shape, elevation, motion

- Radius scale `--lp-radius-xs…lg` (6→20px) + `pill`. Cards use `lg`.
- Two-layer soft shadows (`--lp-shadow-sm/md/lg`), tinted toward the brand.
- Motion is ease-out only (`--lp-ease`, exponential, no bounce), 120–260ms.
  Layout properties are never animated; `prefers-reduced-motion` is honoured.

## Components & patterns

- **Shell:** sticky translucent header (brand mark + theme toggle) over a nav bar
  (underline tabs + mode segmented control). Sticky footer.
- **Cards** (`topic-card`, `catalog-card`): hairline border + `sm` shadow, hover
  lifts 2px and shifts the arrow. Question list uses compact rows, not cards.
- **Answer options** (`.opt`, shared by SC/MC): full-width bordered rows. Selected
  = primary border/tint; after checking, `.opt--correct/--wrong` add a full colour
  border, tint and a trailing `✓ Richtig` / `✕ Falsch` label. **No side-stripe borders.**
- **Fill-in:** monospace input on a code surface with a `>_` prompt and a
  check/cross status icon.
- **States:** every list has loading (`.lp-skeleton` shimmer), empty and error
  (`.lp-state`) variants that teach rather than just say "nothing here".
- Icons are inline stroke SVGs (`currentColor`, 1.5–2.4px), no icon font.

## Absolute bans honoured

No `#000`/`#fff`, no gradient text, no side-stripe accent borders, no glassmorphism
as default, no em dashes in copy, no identical icon-card grids.
