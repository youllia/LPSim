# Lern- und Prüf-Simulator (LPSim)

Web-basierte Anwendung zur Vorbereitung auf die LPIC-1 Linux-Zertifizierung. Bietet zwei Modi: **Lernmodus** (mit optionaler Lösungseinblendung) und **Prüfungssimulation** (mit Timer).

Abschlussprojekt im Rahmen der Umschulung zur Fachinformatikerin Anwendungsentwicklung (BITLC, 2026).

## Tech-Stack

- **Frontend:** Angular 21 (Standalone Components, Signals, neue Control-Flow-Syntax `@for` / `@if` / `@switch`)
- **Sprache:** TypeScript
- **UI:** Angular Material / Bootstrap
- **Backend:** JSON-Server (REST-Mock auf Basis von `db.json`)
- **Datenmigration:** Node.js-Skript
- **Versionierung:** Git

## Voraussetzungen

- **Node.js** ≥ 20 ([Download](https://nodejs.org/))
- **npm** ≥ 10 (kommt mit Node.js)
- **Angular CLI** 21 → `npm install -g @angular/cli@21`
- **JSON-Server** → `npm install -g json-server`

## Installation

```bash
# Repository klonen
git clone <REPO-URL>
cd lpsim

# Abhängigkeiten installieren
npm install
```

## Starten

Die App benötigt **zwei laufende Prozesse**: JSON-Server (Backend) und Angular Dev-Server (Frontend).

### 1. JSON-Server (Backend, Port 3000)

In einem separaten Terminal-Fenster:

```bash
json-server --watch db.json --port 3000
```

Verfügbare Endpunkte:
- `GET /topics`
- `GET /catalogs?topicId={id}`
- `GET /questions?catalogId={id}`
- `GET /questions/{id}`

### 2. Angular Dev-Server (Frontend, Port 4200)

```bash
ng serve
```

App öffnen: <http://localhost:4200>

### Optional — npm-Script-Verkürzung

Eintrag in `package.json` unter `"scripts"` (falls nicht vorhanden):

```json
"api": "json-server --watch db.json --port 3000"
```

Dann reicht `npm run api`.

## Projekt-Struktur

```
lpsim/
├── src/
│   └── app/
│       ├── app.config.ts          # DI-Provider (HttpClient, Router)
│       ├── app.routes.ts          # Routing-Definitionen
│       ├── app.ts                 # Root-Komponente
│       ├── app.html               # Layout (header / nav / aside / main / footer)
│       ├── features/              # Bildschirm-Komponenten (mit Routen)
│       │   ├── home/
│       │   ├── topic-select/
│       │   ├── catalog-select/
│       │   ├── question-select/
│       │   ├── question-detail/
│       │   ├── mode-select/
│       │   ├── exam-config/
│       │   ├── exam-run/
│       │   └── exam-result/
│       └── shared/                # Wiederverwendbare Bausteine
│           ├── layout/            # app-header, app-nav, app-aside, app-footer
│           ├── services/          # *Store / *State (Singleton, Signal-basiert)
│           │   ├── topic-store.ts
│           │   ├── catalog-store.ts
│           │   ├── question-store.ts
│           │   ├── mode-state.ts
│           │   └── exam-state.ts
│           └── models/            # TypeScript-Interfaces
│               ├── topic.ts
│               ├── catalog.ts
│               ├── question.ts
│               └── answer.ts
├── scripts/
│   └── migrate.js                 # Migration der 12 LPIC-Quelldateien → db.json
├── data/
│   └── raw/                       # 12 Original-LPIC-Dateien (Eingabe für Migration)
├── db.json                        # Konsolidierte Datenquelle für JSON-Server
└── package.json
```

## Datenmigration

Die 12 ursprünglichen LPIC-Quelldateien (in `data/raw/`) werden mittels Node.js-Skript in eine einzige `db.json`-Datei konsolidiert. Das Skript vergibt globale IDs und setzt Fremdschlüssel.

Erneut ausführen (z. B. nach Aktualisierung der Quelldateien):

```bash
node scripts/migrate.js
```

Ergebnis: `db.json` wird überschrieben.

## URL-Struktur (REST-Style)

| URL | Bildschirm |
|---|---|
| `/` | Home |
| `/topics` | Themenauswahl |
| `/topics/:topicId/catalogs` | Katalogauswahl |
| `/catalogs/:catalogId/questions` | Fragenliste |
| `/catalogs/:catalogId/questions/:questionId` | Frage-Detail |
| `/mode` | Modus-Umschalter |
| `/exam/config` | Prüfungs-Konfiguration |
| `/exam/run` | Prüfungs-Durchlauf |
| `/exam/result` | Ergebnisanzeige |

Direkte Aufrufe per Lesezeichen oder geteiltem Link werden unterstützt (Cold-Load-Strategie).

## Häufige Befehle

| Befehl | Wirkung |
|---|---|
| `ng serve` | Dev-Server auf :4200 starten |
| `ng build` | Production-Build in `dist/` |
| `ng generate component features/foo` | Neue Komponente generieren |
| `ng generate service shared/services/foo` | Neuen Service generieren |
| `json-server --watch db.json --port 3000` | Backend starten |
| `node scripts/migrate.js` | Daten neu migrieren |

## Build (für Abgabe)

```bash
ng build --configuration production
```

Ergebnis: `dist/lpsim/` enthält die optimierten statischen Dateien.

## Team

- **Iulia Tashkaeva** — Backend + Frontend-Logik (API, Services, Komponenten, Datenmodell, Migration)
- **Walia Adibi** — Frontend-Design (Templates, Styles, Angular Material / Bootrstrap)
- **Gemeinsam:** Dokumentation, Präsentation, UML-Diagramme, Wirtschaftlichkeitsrechnung

## Lizenz

Lehrprojekt — interne Nutzung im BITLC.
