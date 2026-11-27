---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: code
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { checks-pass: 7, usable-at-360px: 5 }
---

# Plan: informatik-internet, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Lernende der Klasse 7-8 verfolgen im Netz-Simulator, wie ein Päckchen von Rechner zu Rechner reist, und erklären
damit den Aufbau des Internets, Client und Server, IP-Adresse und DNS, die Teile einer URL, Dienste und Protokolle
und den Abruf einer Webseite Schritt für Schritt. Explainer zu lernapps/apps#502 (Epic lernapps/apps#509).

## Key decisions

- Archetyp `explainer`: Lernende brauchen Erklärung, Bild und Simulator vor dem Üben; so der Auftrag #502 (Format 2).
- Strang `informatik/informatiksysteme`, zwei Kapitel `netz` und `webseite`, je mit Wiederholungsseite am Anfang
  (hardware-und-software aus #490, dateipfad aus #492), weil die Karte sie verlangt und die App sie nicht übt.
- Netz-Simulator als eigene Vue-Komponente `NetzSimulator` (Anzeige), dazu Übungskomponenten `NetzWeg` (Weg über
  Router legen) und `UrlZerleger` (nach `EvaSortierer` aus #490, Herkunft im Dateikopf): kein Block zeigt ein
  wanderndes Päckchen oder prüft einen Weg im Netz. Bestätigt vom Orchestrator.
- Nur reservierte Beispiel-Adressen: IPs aus RFC 5737 (Geräte 192.0.2.x, Server 198.51.100.x, DNS 203.0.113.53),
  Namen unter `.example` (RFC 2606), z. B. `www.schule.example`. Ein Satz sagt, dass es sie absichtlich nicht gibt.
- Hauptsatz „Jedes Gerät im Netz braucht eine Adresse“; private Adressen (NAT) und IPv6 nur je ein Satz „Für
  Neugierige“ ohne Übung (Orchestrator).
- HTTP vereinfacht (`GET /klasse-7b/ausflug.html` → `200 OK`), echte Nachrichten sind länger; HTTPS nur
  „verschlüsselt“ (Orchestrator).
- Geschichte als Klassenchat der 7b in Zeilen „**Name:** …“ (wie #492, #495), keine Szenenbilder.
- `tasks: { start: first }`: Die ganze Klasse sieht zuerst Aufgabe 1; das erleichtert das Besprechen.
- Rechteinhaber in `LICENSE`: Oliver Jägle.
- Kein `scope`: keine `open-task` und kein Material eines Erstellers; der Tutor hat die Seiten selbst.

## Notes

**Strang:** `informatik/informatiksysteme` (Karte https://lernapps.net/apps/map/informatik.json, `explainerFocus:
strand`). Alle sechs Bausteine sind Lücken der Stufe 7-8.

**Kapitel `netz` · Ein Netz aus Netzen**
- Wiederholung: `hardware-und-software` (#490, informatik-computer)
- `internet-aufbau` (Schritt 1): „Ich kann erklären, dass das Internet ein Netz aus vielen Netzen ist, in dem Router
  Daten weiterleiten, und lokale und globale Netze unterscheiden.“
- `client-und-server` (Schritt 2): „Ich kann die Rollen von Client und Server beschreiben und Beispiele dafür nennen.“
- `ip-adresse-und-dns` (Schritt 2): „Ich kann erklären, dass jeder Rechner im Internet eine IP-Adresse hat und das DNS
  Namen wie schule.de in IP-Adressen übersetzt.“

**Kapitel `webseite` · Eine Webseite reist zu mir**
- Wiederholung: `dateipfad` (#492, informatik-dateien; Wurzel „Mias Tablet“, `Mias Tablet/Schule/Deutsch/notizen.txt`)
- `url-aufbau` (Schritt 3): „Ich kann die Bestandteile einer URL wie Protokoll, Domain und Pfad benennen.“
- `internetdienste` (Schritt 3): „Ich kann Dienste des Internets wie das World Wide Web und E-Mail unterscheiden und
  erklären, dass sie nach festen Regeln (Protokollen) kommunizieren.“
- `webseite-abrufen` (Schritt 4): „Ich kann beschreiben, was passiert, wenn ein Browser eine Webseite von einem
  Webserver abruft.“

**Wie Lernende hinkommen und welcher Fehler abgefangen wird**
- internet-aufbau: Die Karte wächst im Simulator (2 Rechner → Heimnetz mit Router → 3 Netze), Lernende legen selbst
  einen Weg über Router. Fehler: „Das Internet ist ein Kabel / ein großer Computer“; Weg über ein Gerät statt Router.
- client-und-server: Simulator mit Anfrage und Antwort; Rollen an Beispielen bestimmen. Fehler: „Server = großer
  Rechner“, Rolle nach Gerätegröße statt nach Fragen/Antworten.
- ip-adresse-und-dns: Briefumschlag-Spiel und Simulator mit DNS-Anfrage; Adressen prüfen, DNS-Tabelle nachschlagen.
  Fehler: Zahl über 255, nur drei Teile; „Router lesen den Namen“.
- url-aufbau: URL in Teile zerlegen, Pfad mit Mias Dateipfad vergleichen. Fehler: Pfad zeigt auf das eigene Gerät;
  Domain und Pfad vertauscht.
- internetdienste: E-Mail-Weg im Simulator gegen den Web-Weg; Dienst ↔ Protokoll. Fehler: „Internet = WWW“.
- webseite-abrufen: die ganze Reise Schritt für Schritt, Schritte ordnen, Störungen dem Schritt zuordnen. Fehler: DNS
  nach der Anfrage; „die Seite wandert vom Server weg“.

**Umfang:** IPv4-Adressen (vier Zahlen 0 bis 255) nur aus RFC 5737; Namen nur `.example`. Nicht hier: Pfade auf dem
eigenen Gerät (#492), HTML (#504), Kommunikation, Gefahren und Bewerten von Informationen (#505), Ports, Schichtenmodell,
Verschlüsselung im Detail. Sprachen: Deutsch (Ausgangssprache) und Englisch (vollständig, Begriffe wie im Computing
curriculum England).

**Quellen (selbst geöffnet):**
- GI: Bildungsstandards Informatik Sek I (2025), S. 19, IS-5.
- BY: LehrplanPLUS Gymnasium Natur und Technik 7, LB 2.1 „Vernetzte Informationsstrukturen“,
  https://www.lehrplanplus.bayern.de/fachlehrplan/gymnasium/7/nt_gym
- NRW: KLP Sek I Realschule, Wahlpflichtfach Informatik (2023), S. 19,
  https://lehrplannavigator.nrw.de/system/files/media/document/file/rs_wpif_klp_2023_06_01.pdf
- HE: KC Informatik Wahlunterricht Sek I gymnasial (2021), S. 16, Themenfeld „Internet und HTML“,
  https://kultus.hessen.de/sites/kultus.hessen.de/files/2021-08/kch_informatik.pdf
- RFC 5737 (Dokumentations-IPs), RFC 2606 (`.example`), RFC 791 (IPv4), RFC 1034 (DNS), RFC 1812 (Router), RFC 3986
  (URI), RFC 9110 (HTTP), RFC 5321 (SMTP), RFC 9051 (IMAP), RFC 3849/8200 (IPv6, nur am Rand).
- Nicht gelesen: das Repo von informatik-dateien (Zugriff abgelehnt); stattdessen die veröffentlichte Seite
  https://lernapps.net/informatik-dateien/ordnen/dateipfad/.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [x] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.
      Creator: Orchestrator: Einverstanden, weiter mit dem Plan. schule.example statt schule.de: ja. NAT und private Adressen: ja, ein Satz „Für Neugierige“ ohne Übung.

### Answers

- Goal: „Ich kann den Aufbau des Internets beschreiben und erklären, wie Client und Server sich über IP-Adressen und DNS finden.“ und „Ich kann eine URL zerlegen, Internetdienste und ihre Protokolle unterscheiden und den Abruf einer Webseite Schritt für Schritt erklären.“ (Auftrag #502)
- Learners: Informatik, Stufe 7-8; „Klasse 7b, alle 12, ein Jahr nach der 6b“; kennen #490 (Hardware/Software) und #492 (Dateipfad). (Auftrag)
- Model and focus: „Ein Netz-Simulator mit einer Reise als Bild“; Muster informatik-computer und informatik-dateien. (Auftrag)
- Hurdles: keine genannt; aus der Fachliteratur siehe Notes (guess).
- Content: Ich schreibe nach Karte, Auftrag und Primärquellen (RFCs). „Unplugged spielt die Klasse das Netz mit Briefumschlägen.“ (Auftrag)
- Amount: „Welle 2 (Stufe 7-8): beide Kapitel mit 6 Bausteinen“. (Auftrag)
- Languages: „Jede App in Deutsch und Englisch“. (Regeln #509)
- Look and feel: fixed by the archetype.
- Terms: „Englische Fachbegriffe wie im Computing curriculum in England (client, server, IP address, DNS, router, protocol, URL)“; deutsch nach GI 2025. (Regeln #509)
- Finding the app: offen bis zur Eintragung; Katalogeintrag macht der Orchestrator.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [x] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [x] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [x] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [x] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [x] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [x] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Orchestrator: Ja, so bauen, sobald init freigegeben ist. Musterseite netz/aufbau: ja. HTTP vereinfacht (GET → 200 OK), HTTPS nur verschlüsselt; gültige IP nur IPv4; Chat in Zeilen **Name:** …

### Content method

**Seiten** (Abschnitte `einstieg`, `idee`, `beispiel`, `uebung`; Wiederholungsseiten nur Selbstcheck + 1 Übung):
- `netz/das-brauchst-du`: recap `informatik/hardware-und-software`; Selbstcheck mit dem „Ich kann“-Satz; 1 true-false.
- `netz/aufbau` (internet-aufbau, **Musterseite**): Simulator in drei Stufen; unplugged „Zettel-Staffel“; NetzWeg,
  generated „lokal oder global?“ (`data/verbindungen.yaml`), true-false Router-Ausfall, matching Teil ↔ Aufgabe.
- `netz/client-server`: Simulator Anfrage/Antwort; Vergleich Schulkiosk mit Grenze; generated „Client oder Server?“
  (`data/rollen.yaml`), multiple-choice, ordering, true-false.
- `netz/ip-dns`: IPv4 (vier Zahlen 0 bis 255), DNS als Telefonbuch mit Grenze, Simulator mit DNS-Frage;
  Briefumschlag-Spiel; generated „gültige IP?“ (`data/adressen.yaml`), generated DNS-Tabelle (`data/dns.yaml`),
  ordering, single-choice „DNS fällt aus“.
- `webseite/das-brauchst-du`: recap `informatik/dateipfad`; Mias Pfad; 1 single-choice.
- `webseite/url`: Protokoll, Domain, Pfad; Pfad wie Dateipfad, Wurzel `/` auf dem Server; UrlZerleger, generated
  „In welchem Teil steht …?“ (`data/url-teile.yaml`), true-false, matching.
- `webseite/dienste`: Protokoll = feste Regeln; Tabelle Dienst | Protokoll; Simulator E-Mail-Weg; generated „Welcher
  Dienst?“ (`data/situationen.yaml`), matching Dienst ↔ Protokoll, ordering HTTP-Mini-Dialog, single-choice.
- `webseite/abruf`: Simulator mit der ganzen Reise (6 Schritte); Fehlersuche; ordering, NetzWeg hin und zurück,
  generated „Welcher Schritt ging schief?“ (`data/stoerungen.yaml`), multiple-choice; Abschnitt `rueckblick`.

**Engagement je Seite** (Einstieg · Wechsel · Lohn · Geschichte):
- aufbau: Ben: „Ist das Internet ein großes Kabel?“, Frage vor der Erklärung · Simulator klicken, lesen, Weg legen ·
  „Du hast ein Päckchen durch drei Netze geschickt“ · Projekttag startet, nächste Station: Wer fragt, wer antwortet?
- client-server: Lea: „Wo liegt die Ausflugsseite?“ · Simulator, Vergleich, Rollen bestimmen · Rollen im Chat
  benannt · nächste Station: Adressen.
- ip-dns: Jona schreibt „www.schule.example“ auf den Umschlag, Router lesen nur Zahlen · Spiel, Tabelle, Simulator ·
  das eigene Telefonbuch benutzt · Kapitelende: Rückblick auf das Netz, weiter zur Webseite.
- url: Frau Berg postet die URL; welcher Teil erinnert an Mias Pfad? · zerlegen, vergleichen · URL gelesen · nächste
  Station: Dienste.
- dienste: Selin mailt Fotos, Ben chattet · Tabelle, Simulator E-Mail · Dienste unterschieden · nächste Station: die
  ganze Reise.
- abruf: Ben tippt die URL ein · Simulator, ordnen, Fehler suchen · Bens Frage beantwortet; Rückblick auf beide
  Kapitel.

**Komponenten** (`src/components/`, zusammen höchstens 20 kB gzip, nur Farben der Laufzeit plus eigene Netzfarben
mit zweitem Merkmal):
- `NetzSimulator` (Anzeige, `nojs` = die nummerierte Schrittliste): Eine Karte mit Stationen (Gerät, Router, Server,
  DNS-Server; Form und Name als zweites Merkmal) und Kabeln. „Nächster Schritt“ schickt das Päckchen (Umschlag mit
  „an:“ und „von:“) über ein Kabel; die Liste darunter schreibt jeden Schritt als Satz mit, „Von vorn“ setzt zurück.
  Die Karte zeigt das Ganze (das Netz), die Schritte den Weg einer Nachricht; Lernende sehen, dass Router nur
  weiterreichen und jede Nachricht eine Adresse braucht. Keine echten Adressen, keine Anfragen ins Netz.
- `NetzWeg` (Übung): dieselbe Karte; Lernende wählen Station für Station den Weg vom Start zum Ziel. Richtig ist jeder
  Weg, der den Kabeln folgt, dazwischen nur Router nutzt und am Ziel endet. `reason`: Lücke (kein Kabel), Gerät oder
  Server als Zwischenstation, Station doppelt, Weg endet vor dem Ziel. Kann nicht prüfen, ob der Weg der kürzeste ist
  (fragt es auch nicht).
- `UrlZerleger` (Übung, nach `EvaSortierer` aus lernapps/informatik-computer): Teile einer URL je in Protokoll, Domain
  oder Pfad legen; `reason` nennt den ersten falsch gelegten Teil mit Grund, nie den richtigen Kasten.
- Gemeinsam: `Netz.ts` (Typen, Kabel-Test, Zufall).

**Voraussetzungen von außen:** hardware-und-software → Wiederholungsseite Kapitel 1; dateipfad → Wiederholungsseite
Kapitel 2. Sonst nichts.

**Neues Kapitel später:** Ordner mit `chapter.yaml`, je Baustein eine Seite mit den vier Abschnitten, Simulator mit
neuer Karte als Props, Beispiel-Adressen nur RFC 5737/2606.

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [x] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [x] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [x] Load skill `lernapps-explainer`.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Musterseite netz/aufbau in de und en: Komponenten NetzSimulator (drei Stufen) und NetzWeg mit Logik und Tests, Daten verbindungen.yaml, Zettel-Staffel, mindestens vier Übungen
<!-- tasks: pattern (1 added): the one page or screen that is the pattern for the others -->
- [x] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
      Creator: Orchestrator: Ja, die übrigen Seiten folgen diesem Muster. Lösung als „Ein möglicher Weg (es gibt mehrere)“, nach Richtig kurz „Jeder Weg über verbundene Router zählt“; Beschriftungen bei 360 px mindestens 12 px; Vorschau vor Veröffentlichen selbst ansehen.
- [x] netz/das-brauchst-du: Wiederholung hardware-und-software mit Selbstcheck und einer Übung
- [x] netz/client-server: Simulator Anfrage und Antwort, Daten rollen.yaml, vier Übungen
- [x] netz/ip-dns: IP-Adresse und DNS, Simulator mit DNS, Briefumschlag-Spiel, Daten adressen.yaml und dns.yaml
- [x] webseite/das-brauchst-du: Wiederholung dateipfad mit Mias Pfad und einer Übung
- [x] webseite/url: Komponente UrlZerleger mit Logik und Test, Daten url-teile.yaml, vier Übungen
- [x] webseite/dienste: Dienste und Protokolle, Simulator E-Mail-Weg, Daten situationen.yaml
- [x] webseite/abruf: ganze Reise im Simulator, Daten stoerungen.yaml, Rückblick auf beide Kapitel
<!-- tasks: pages (7 added): the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
