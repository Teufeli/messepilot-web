# MessePilot Website CODEX Notes

Stand: 2026-06-06

Pfad: `/Users/rogerzutter/Documents/Projekte/messepilot-web`

## Repo-Status Beim Erstellen

- Branch: `main`
- HEAD: `d0491c611a770a9156c6fc8ff9429274edf3ccc9`
- Status: clean
- Stack: Next.js `16.2.3`, React `19.2.4`, Firebase, `d3-geo`, `topojson-client`, `world-atlas`.

Letzte Commits:

- `d0491c6 Focus fair location map on selected filters`
- `6327b5a Add interactive fair location map filters`
- `b35229e Add data region contract`
- `a0db006 Keep website presence active while visible`
- `06dd323 Mark website presence inactive when hidden`

## Wichtige Dateien

- Home Page: `components/website/WebsiteHomePage.tsx`
- Standortkarte: `components/website/HomeFairLocationMap.tsx`
- Karten-Copy: `lib/website/homeLocationMapCopy.ts`
- Published Fairs Data: `lib/fairs.ts`
- Fairs List: `components/website/FairsListClient.tsx`
- Fair Pages: `app/(site)/[locale]/fairs/page.tsx`, `app/(site)/[locale]/fairs/[id]/page.tsx`
- Weather: `components/website/WeatherSummary.tsx`, `lib/website/weather.ts`

## Website-Karte

- Nutzt SVG-Weltkarte mit `d3-geo`, `topojson-client`, `world-atlas`.
- Zoom/Pan ist umgesetzt.
- Region-/Landfilter werden aus live Published Fairs abgeleitet.
- Filter zeigen keine leeren Regionen/Laender.
- Karte fokussiert automatisch auf ausgewaehlte Region/Land.
- Keine schwere Map-Dependency.

## Published Fairs

- Website zeigt live veroeffentlichte Messen.
- Keine Candidates anzeigen.
- TitleImage-Fallback muss ohne `thumb` funktionieren: `app`/`web` sind relevant.
- Medienaenderungen muessen ueber frisches Manifest/Published-Fair-Daten sichtbar werden.

## Vercel

- Deployment laeuft ueber Vercel/Hosting.
- Kein Deploy ohne Freigabe, falls nicht automatisch durch Push ausgeloest.
- Nach Push Production Deployment pruefen, wenn die Aufgabe das verlangt.

## Offener Mini-Fix

- `WeatherSummary` Hydration-Warnung: `17 °C` vs `63 °F`.

## Standard Checks

```bash
git status --short
git diff --check
npm run lint
npm run build
npm run typecheck --if-present
npx tsc --noEmit
```

## Regeln

- Keine Backend/iOS/Admin-Aenderungen aus Website-Bloecken.
- Keine Datenwrites.
- Keine neue schwere Dependency ohne Begruendung.
- Mobile und Desktop visuell pruefen, wenn UI geaendert wird.
