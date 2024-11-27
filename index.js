const bcrypt = require("bcrypt");
const readline = require("readline");

// Simuleert een database
let userData = {};

// CLI Interface instellen
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Functie voor wachtwoord hashing
async function hashPassword(password) {
  try {
    const saltRounds = 10; // Het aantal rondes
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Fout bij het hashen van het wachtwoord:", error.message);
    return null;
  }
}

// Functie om wachtwoord te verifiëren
async function verifyPassword(inputPassword, storedHash) {
  try {
    return await bcrypt.compare(inputPassword, storedHash);
  } catch (error) {
    console.error("Fout bij het verifiëren van het wachtwoord:", error.message);
    return false;
  }
}

// Registreren van een nieuwe gebruiker
async function registerUser() {
  rl.question("Voer je e-mail in: ", async (email) => {
    if (!email.includes("@") || !email.includes(".")) {
      console.log("Fout: Ongeldig e-mailadres.");
      return mainMenu();
    }

    if (userData[email]) {
      console.log("Fout: Dit e-mailadres is al geregistreerd.");
      return mainMenu();
    }

    rl.question("Voer een wachtwoord in: ", async (password) => {
      if (password.length < 8) {
        console.log("Fout: Het wachtwoord moet minimaal 8 tekens bevatten.");
        return mainMenu();
      }

      rl.question("Bevestig je wachtwoord: ", async (confirmPassword) => {
        if (password !== confirmPassword) {
          console.log("Fout: Wachtwoorden komen niet overeen.");
          return mainMenu();
        }

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
          console.log("Registratie mislukt door een fout.");
          return mainMenu();
        }

        userData[email] = hashedPassword;
        console.log(`Gebruiker met e-mail '${email}' succesvol geregistreerd!`);
        mainMenu();
      });
    });
  });
}

// Inloggen van een gebruiker
async function loginUser() {
  rl.question("Voer je e-mail in: ", async (email) => {
    if (!userData[email]) {
      console.log("Fout: Dit e-mailadres is niet geregistreerd.");
      return mainMenu();
    }

    rl.question("Voer je wachtwoord in: ", async (password) => {
      const isMatch = await verifyPassword(password, userData[email]);
      if (isMatch) {
        console.log("Inloggen succesvol! Welkom terug.");
      } else {
        console.log("Fout: Ongeldig wachtwoord.");
      }
      mainMenu();
    });
  });
}

// Hoofdmenu
function mainMenu() {
  console.log("\nKies een optie:");
  console.log("1. Registreren");
  console.log("2. Inloggen");
  console.log("3. Afsluiten");

  rl.question("Maak een keuze: ", (choice) => {
    if (choice === "1") {
      registerUser();
    } else if (choice === "2") {
      loginUser();
    } else if (choice === "3") {
      console.log("Programma afgesloten.");
      rl.close();
    } else {
      console.log("Ongeldige keuze. Probeer het opnieuw.");
      mainMenu();
    }
  });
}

// Start het programma
mainMenu();
