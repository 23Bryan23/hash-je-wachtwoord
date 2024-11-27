<!-- # Login- en Registratiesysteem in Node.js -->

Dit project implementeert een eenvoudig login- en registratiesysteem met veilige wachtwoordhashing. Gebruikers kunnen zich registreren en inloggen, waarbij wachtwoorden gehasht en opgeslagen worden.

 <!-- Installatie -->

1. Installeer [Node.js](https://nodejs.org) als dit nog niet op je computer staat.
2. Clone dit project of download de bestanden.
3. Open een terminal en voer de volgende commando's uit:
   ```bash
   npm install
   npm start
   ```

<!-- (uitbreiding) -->

### **Hoe werkt dit?**

1. Gebruikers voeren hun e-mail en wachtwoord in.
2. Bij registratie wordt het wachtwoord gehasht met een unieke salt.
3. Bij inloggen wordt het ingevoerde wachtwoord vergeleken met de hash.
4. Het systeem geeft duidelijke foutmeldingen bij problemen zoals:
   - Ongeldige e-mails
   - Ongeldige wachtwoorden
   - Niet-bestaande accounts
   - Mislukte verificatie

Start je programma door `npm start` uit te voeren. 🚀
