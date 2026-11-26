# Skizzen der Komponenten

## NetzSimulator (Anzeige)

```
 [Mias Tablet]──(Router A)──(Router B)──[Webserver]
  192.0.2.17                         198.51.100.7
                 ✉ an: 198.51.100.7  von: 192.0.2.17
[ Nächster Schritt ]  [ Von vorn ]
1. Mias Tablet schickt das Päckchen an Router A.
2. Router A reicht es an Router B weiter.
```
- Start: Karte vollständig, Päckchen am Start, Liste leer mit Satz „Drück auf Nächster Schritt.“
- Nach jedem Klick: Päckchen eine Station weiter, benutztes Kabel dick, ein Satz mehr in der Liste.
- Letzter Schritt: Knopf aus, Satz „Angekommen.“; „Von vorn“ setzt zurück.
- Schmal (360 px): Karte skaliert (viewBox), Namen unter den Stationen.

## NetzWeg (Übung)

```
Aufgabe: Schick ein Päckchen von Mias Tablet zu Bens Handy.
Karte wie oben, mehrere Router.
Dein Weg: Mias Tablet → Router A → …
Nächste Station: [Router A] [Router B] [Router C] [Bens Handy] [Webserver]
[ Letzten Schritt zurück ] [ Von vorn ]
                (Prüfen zeichnet die Seite)
```
- Gewählte Stationen färben ihr Kabel; keine Markierung des Ziels über die Aufgabe hinaus.
- Nach „Prüfen“: richtig oder Grund (Lücke, kein Router, doppelt, Ziel fehlt).

## UrlZerleger (Übung)

```
https://  www.schule.example  /klasse-7b  /ausflug.html
je Teil: [Protokoll] [Domain] [Pfad]
Kästen darunter: Protokoll | Domain | Pfad mit den gelegten Teilen
[ Zurücksetzen ]
```
