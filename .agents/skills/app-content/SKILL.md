---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Wie das Internet funktioniert“ (lernapps/apps#502, Epic Informatik lernapps/apps#509). Strang
`informatik/informatiksysteme`, Stufe 7-8, Sprachen Deutsch (Ausgangssprache) und Englisch (vollständige Übersetzung).

## Curriculum

- Ordnung und Bausteine: Lernlandkarte Informatik, <https://lernapps.net/apps/map/informatik.json>, Strang
  `informatiksysteme`, Richtstufe 7-8. Die Karte gibt die Reihenfolge (`requires`).
- Orientierung (gelesen):
  - GI: Bildungsstandards Informatik Sek I (2025), S. 19, IS-5 („erläutern die Kommunikation in Netzwerken …“).
  - Bayern: LehrplanPLUS Gymnasium Natur und Technik 7, Lernbereich 2.1 „Vernetzte Informationsstrukturen“ (Client,
    Server, Router, Dienste, IP-Adresse, URL).
  - NRW: Kernlehrplan Realschule, Wahlpflichtfach Informatik (MSB 2023), S. 19 (bis Klasse 8).
  - Hessen: Kerncurriculum Informatik Wahlunterricht Sek I gymnasial (HKM 2021), S. 16, Themenfeld „Internet und
    HTML“ (lokale und globale Netze, Client und Webserver, Dienste und Protokolle, URL, DNS).
- Kein Material eines Erstellers; der Auftrag ist das Issue lernapps/apps#502.

## Competencies

Kapitel `netz` – Ein Netz aus Netzen:
- Wiederholung `informatik/hardware-und-software` (#490) → `src/netz/das-brauchst-du.yaml`
- `internet-aufbau`: „Ich kann erklären, dass das Internet ein Netz aus vielen Netzen ist, in dem Router Daten
  weiterleiten, und lokale und globale Netze unterscheiden.“ → `src/netz/aufbau.yaml` (Musterseite)
- `client-und-server`: „Ich kann die Rollen von Client und Server beschreiben und Beispiele dafür nennen.“ →
  `src/netz/client-server.yaml`
- `ip-adresse-und-dns`: „Ich kann erklären, dass jeder Rechner im Internet eine IP-Adresse hat und das DNS Namen wie
  schule.de in IP-Adressen übersetzt.“ → `src/netz/ip-dns.yaml` (die App sagt „Jedes Gerät im Netz braucht eine
  Adresse“ und nimmt `schule.example` statt schule.de)

Kapitel `webseite` – Eine Webseite reist zu mir:
- Wiederholung `informatik/dateipfad` (#492) → `src/webseite/das-brauchst-du.yaml`
- `url-aufbau`: „Ich kann die Bestandteile einer URL wie Protokoll, Domain und Pfad benennen.“ → `src/webseite/url.yaml`
- `internetdienste`: „Ich kann Dienste des Internets wie das World Wide Web und E-Mail unterscheiden und erklären,
  dass sie nach festen Regeln (Protokollen) kommunizieren.“ → `src/webseite/dienste.yaml`
- `webseite-abrufen`: „Ich kann beschreiben, was passiert, wenn ein Browser eine Webseite von einem Webserver
  abruft.“ → `src/webseite/abruf.yaml`

Übungs-ids stehen in den Seiten; jede Seite außer den Wiederholungen hat mindestens vier Übungen.

## Content structure

- Geschichte: Klassenchat der 7b (alle 12, ein Jahr nach der 6b aus #490/#492). Frau Berg kündigt den Projekttag
  „Wir spielen das Internet“ an. Bens Frage trägt die App: „Wie kommt die Seite vom Klassenausflug auf mein Handy?“
  Die Seite liegt unter `https://www.schule.example/klasse-7b/ausflug.html`. Jede Seite ist eine Station des
  Projekttags. Weitere: Jona, Selin, Mia, Lea, Tom, Ali.
- Chat als Text, eine Zeile je Nachricht: `**Ben:** Ist das Internet eigentlich ein riesiges Kabel?` (wie #492, #495).
  2 bis 4 Nachrichten am Anfang, eine am Ende mit dem nächsten Schritt.
- Abschnitte jeder Seite, ids fest, Titel passend zur Seite:
  1. `einstieg` – Chat, Ziel der Seite („Auf dieser Seite lernst du …“), eine erste leichte Aufgabe vor der Erklärung.
  2. `idee` – Simulator oder Bild, höchstens zwei kurze Texte am Stück, `definition` für jedes neue Fachwort, ein
     Kasten `note` „Merke“ zum typischen Fehler.
  3. `beispiel` – Kasten `example` oder Spiel ohne Computer als `note` „Zum Mitmachen ohne Computer“.
  4. `uebung` – mindestens vier Übungen, von leicht zu schwer; am Ende eine Chat-Zeile mit dem Lohn und dem nächsten
     Schritt.
  5. Nur `webseite/abruf`: `rueckblick` über beide Kapitel.
- Wiederholungsseiten: Selbstcheck mit dem Namen und dem „Ich kann“-Satz des Bausteins, Link zur Schwester-App,
  ein kurzes Beispiel, genau eine Übung.
- Länge: höchstens 350 Wörter zum Lesen und 350 in Aufgaben und Rückmeldungen, höchstens 4 Textblöcke hintereinander.

## Terminology

- Deutsch in einfacher Sprache (ISO 24495), kurze Sätze, „du“. Englisch: plain English, „you“.
- Fachwörter beim ersten Auftreten als `definition` (de / en, Computing curriculum England):
  - Netz (Netzwerk) / network, lokales Netz / local network (LAN), Internet / internet, Router / router
  - Client / client, Server / server, Anfrage / request, Antwort / response
  - IP-Adresse / IP address, DNS / DNS, Domain / domain name
  - URL / URL, Protokoll / protocol, Pfad / path
  - Internetdienst / internet service, World Wide Web (WWW) / World Wide Web, E-Mail / email
- Das Päckchen heißt immer **Päckchen** (en **packet**); „Datenpaket“ nur einmal als Fachwort daneben.
- Adressen nur aus den Beispielbereichen: Geräte der Klasse `192.0.2.x` (RFC 5737), Server `198.51.100.x`, der
  DNS-Server `203.0.113.53`. Namen nur unter `.example` (RFC 2606): `www.schule.example`, `mail.schule.example`,
  `spiele.example`. Ein Satz sagt einmal: „.example gibt es absichtlich nicht, es ist für Beispiele reserviert.“
- Hauptsatz zu Adressen: „Jedes Gerät im Netz braucht eine Adresse.“ Private Adressen (Router übersetzt) und IPv6
  je ein Satz „Für Neugierige“, ohne Übung.
- HTTP vereinfacht: `GET /klasse-7b/ausflug.html` → `200 OK`, mit dem Satz, dass echte Nachrichten länger sind.
  HTTPS heißt nur „verschlüsselt“, keine Schlüssel. E-Mail: SMTP zum Senden, IMAP zum Abholen.
- Keine Marken: „Browser“, „Messenger“, „Suchmaschine“.
- Nicht hier: Ports, Schichtenmodell, HTML (#504), Gefahren und Kommunikation (#505).

## Exercise patterns

- **Weg über Router legen** (`internet-aufbau` Übung `weg-legen` auf Karte 4, `webseite-abrufen` Übung
  `antwort-weg` auf Karte 9): Komponente `NetzWeg`. Karte als Props (`stations`, `cables`, `zones`), Fahrten `trips`
  (Start, Ziel; Aufgabe n ist die n-te Fahrt, nie zwei Stationen mit direktem Kabel). Richtig ist jeder Weg über
  Kabel, dazwischen nur Router, keine Station doppelt, Ende am Ziel. Gründe als Props: `gap` ({from}, {to}),
  `noRouter` ({name}), `twice`, `short` ({name}, {goal}), `empty`; `anyWay` erscheint nach einem richtigen Weg.
  „Lösung“ zeigt „Ein möglicher Weg (es gibt mehrere)“. `NetzWeg.test.ts` probiert jede Karte mit allen Antworten
  bis sechs Stationen gegen eine unabhängige Regel durch: eine neue Karte dort eintragen.
- **Lokal oder global** (`internet-aufbau`, Übung `lokal-oder-global`): `generated` `pick: 1` aus
  `data/verbindungen.yaml` (`fall`, `antwort` lokal/global, `gegenteil`, `grund`), `compare: { choice: [lokal, global] }`
  (en local/global).
- **Client oder Server** (`client-und-server`): `generated` aus `data/rollen.yaml` (`fall`, `teil`, `antwort`,
  `gegenteil`, `grund`), `choice` [Client, Server].
- **Gültige IP-Adresse** (`ip-adresse-und-dns`): `generated` aus `data/adressen.yaml` (`adresse`, `antwort` ja/nein,
  `gegenteil`, `grund`); nur IPv4, Fehler: Zahl über 255, drei Teile, Buchstaben.
- **DNS nachschlagen** (`ip-adresse-und-dns`, Übung `dns-nachschlagen`): `generated` aus `data/dns.yaml` (`name`,
  `adresse`, `falsch`); das ganze Telefonbuch steht im Aufgabentext (die Übung muss allein verständlich sein),
  `choice` aus den fünf Adressen.
- **Teile einer URL** (`url-aufbau`): Komponente `UrlZerleger` (nach `EvaSortierer` aus lernapps/informatik-computer),
  URLs aus `data/urls.yaml` (`teile`, `arten` 0 Protokoll, 1 Domain, 2 Pfad; Aufgaben der Reihe nach), Props `rules`
  je Kasten für die Rückmeldung; dazu `generated` aus `data/url-teile.yaml` (`url`, `stueck`, `antwort`, `falsch`,
  `grund`), `choice` [Protokoll, Domain, Pfad].
- **Welcher Dienst** (`internetdienste`): `generated` aus `data/situationen.yaml` (`fall`, `antwort`, `falsch`,
  `grund`), `choice` [WWW, E-Mail, Chat] (en web, email, chat).
- **Welcher Teil ging schief** (`webseite-abrufen`): `generated` aus `data/stoerungen.yaml` (`stoerung`, `antwort`,
  `falsch`, `grund`), `choice` [DNS-Abfrage, Weg durchs Netz, Datei auf dem Webserver]; 404 heißt: der Webserver hat
  geantwortet.
- Dazu je Seite Fragen (`single-choice`, `multiple-choice`, `true-false`, `ordering`, `matching`); jede falsche
  Option sagt im `info`, warum sie nicht passt. Höchstens drei von fünf Übungen sind reine Auswahl.

## Figures

- **NetzSimulator** (Anzeige-Komponente, Texte als Props je Sprache, `nojs` = Kartenbeschreibung und nummerierte
  Schrittliste): sichtbarer Titel `title` („Karte n: …“, fortlaufend über die App: 1–3 aufbau, 4 Übung aufbau, 5
  client-server, 6 ip-dns, 7 dienste, 8 und 9 abruf), `label` für Screenreader, Netze als gestrichelte Zonen
  (`zones`, Name oben links). Karte im Raster x 0 bis 100, y 0 bis etwa 52; Stationen mit Form und Farbe als doppeltem
  Merkmal:
  - Gerät: abgerundetes Rechteck, blau `#2f5fb3`
  - Router: Kreis mit Pfeilen, grün `#23704a`
  - Server: hohes Rechteck mit Linien, orange `#a4500f`
  - DNS-Server: Buch, lila `#7b4fb8`
  - Päckchen: Umschlag gelb `#f2c14e` mit dunklem Rand, darunter „an: …“ und „von: …“
  - Kabel grau, benutzte Kabel dick in `--page-accent`.
  - Beschriftungen mindestens 12 px bei 360 px (Schrift 4,2 Einheiten, Zonen 4); Namen über 8 Zeichen in zwei
    Zeilen. Stationen mit Adresse mindestens 26 Einheiten auseinander. Eine Station oben, zu der Kabel von unten
    kommen, bekommt `above: true` (Beschriftung über dem Symbol).
  - Ein Päckchen trägt `packet` als Text („an 198.51.100.7, von 192.0.2.25: …“); er bleibt, bis ein Schritt einen
    neuen setzt.
  Knöpfe „Nächster Schritt“ und „Von vorn“; die Seite nennt beide und sagt, worauf man schaut.
- **NetzWeg**: dieselbe Karte, Knöpfe der Stationen darunter, gewählter Weg als Pfeilkette.
- Kein Text im SVG außer Props (Namen, Adressen). Eigene Zeichnung, `CC-BY-4.0`.
- Personen erscheinen nicht als Bild; die Geschichte steht im Chat.
- `alt` sagt, was das Bild zeigt, `caption`, worauf man schaut; beides nennt nie die Lösung.

## Sources

- Lernlandkarte, GI 2025, Lehrpläne BY/NRW/HE (siehe Curriculum), selbst geöffnet.
- RFC 5737 (IPv4-Adressen für Dokumentation), RFC 2606 (reservierte Namen `.example`), RFC 791 (IPv4), RFC 1034
  (DNS), RFC 1812 (Router), RFC 3986 (URI), RFC 9110 (HTTP), RFC 5321 (SMTP), RFC 9051 (IMAP); in `sources` von
  `src/app.yaml`. Im Seitentext nur RFC 5737 und RFC 2606 verlinkt.
- Keine Videos, keine fremden Bilder.

## Adding a chapter or round

1. Bausteine der Karte holen (ids, „Ich kann …“), Reihenfolge nach `requires`.
2. Ordner `src/<kapitel>/` mit `chapter.yaml`, je Baustein eine Seite mit `einstieg`, `idee`, `beispiel`, `uebung`;
   `competencies: [<id>]`. Voraussetzungen von außen: eine Seite `das-brauchst-du` mit `recap`.
3. Kapitel in `chapters` von `src/app.yaml` eintragen, beide Sprachen schreiben.
4. Netz-Bilder über `NetzSimulator` mit eigener Karte als Props; nur Beispiel-Adressen (RFC 5737, `.example`).
5. 1 bis 3 Übungen je Seite in `selfAssessment` im `chapter.yaml`.
6. `npx vp build`, `npx --no -- lernapps check`, Commit.

## Rules learned from mistakes

- Jede Netzkarte hat einen sichtbaren Titel („Karte 3: drei Netze“) und zeichnet ihre Netze als gestrichelte Zonen
  mit Namen (`zones`); sonst sehen Lernende nicht, welche „drei Netze“ der Text meint (Lernenden-Prüfung Musterseite).
- Ein Wort wie „Station“ vor der ersten Übung erklären, die es nutzt (Lernenden-Prüfung).
- Wenn der Text „mehr als ein Weg“ sagt, nennt er den zweiten Weg auf der Karte (Lernenden-Prüfung).
- `explanation` einer `true-false`-Frage beginnt nicht mit „Falsch.“, sondern mit „Die Aussage stimmt nicht.“: Nach
  „Richtig!“ verwirrt ein „Falsch.“ (Lernenden-Prüfung).
- `matching` wiederholt nicht die Definitionen, sondern wendet sie auf Fälle an (Lernenden-Prüfung).
- Tipp (`hint`) verrät die Antwort nicht; er zeigt, wo man nachsieht.
- Englisch: „route“ für den Weg eines Päckchens, „wireless (Wi-Fi)“ für Funk, „Start again“ für „Von vorn“.
- Keine zwei Kabel, die durch die Beschriftung einer Station laufen; lieber ein Kabel weglassen.
