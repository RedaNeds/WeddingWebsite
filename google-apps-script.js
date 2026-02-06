/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT - STOCKAGE DES RÉPONSES RSVP DANS GOOGLE SHEETS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * INSTRUCTIONS D'INSTALLATION :
 * 
 * 1. Créez un nouveau Google Sheet avec ces en-têtes en ligne 1 :
 *    Date | Prénom | Nom | Email | Téléphone | Présent | Accompagnants | Noms accompagnants | Restrictions | Message
 * 
 * 2. Dans Google Sheets : Extensions → Apps Script
 * 
 * 3. Supprimez tout le contenu et collez ce script
 * 
 * 4. Remplacez VOTRE_SPREADSHEET_ID ci-dessous par l'ID de votre Sheet
 *    (L'ID se trouve dans l'URL : https://docs.google.com/spreadsheets/d/VOTRE_ID_ICI/edit)
 * 
 * 5. Sauvegardez (Ctrl+S)
 * 
 * 6. Déployer → Nouveau déploiement
 *    - Type : Application Web
 *    - Exécuter en tant que : Moi
 *    - Accès : Tout le monde
 * 
 * 7. Copiez l'URL du déploiement et ajoutez-la dans CONFIG.googleSheetsUrl
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// CONFIGURATION - Remplacez par l'ID de votre Google Sheet
const SPREADSHEET_ID = 'VOTRE_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1'; // Ou le nom de votre feuille

/**
 * Fonction principale qui reçoit les données du formulaire
 */
function doPost(e) {
  try {
    // Vérifier qu'on a des données
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse(false, 'Aucune donnée reçue');
    }

    // Parser les données JSON
    const data = JSON.parse(e.postData.contents);
    
    // Ouvrir le spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return createResponse(false, 'Feuille non trouvée');
    }

    // Vérifier les doublons
    if (checkDuplicate(sheet, data.email, data.phone)) {
      return createResponse(false, 'Une réponse existe déjà pour cet email ou téléphone');
    }

    // Formater la date
    const now = new Date();
    const dateStr = Utilities.formatDate(now, 'Europe/Paris', 'dd/MM/yyyy HH:mm');

    // Préparer la ligne de données
    const row = [
      dateStr,                                    // Date de soumission
      data.firstName || '',                       // Prénom
      data.lastName || '',                        // Nom
      data.email || '',                           // Email
      data.phone || '',                           // Téléphone
      data.attending ? 'Oui' : 'Non',            // Présent
      data.attending ? (data.guests || 0) : 0,   // Nombre d'accompagnants
      data.guestNames || '',                      // Noms des accompagnants
      data.dietary || '',                         // Restrictions alimentaires
      data.message || ''                          // Message
    ];

    // Ajouter la ligne
    sheet.appendRow(row);

    // Envoyer un email de notification (optionnel)
    // sendNotificationEmail(data);

    return createResponse(true, 'Réponse enregistrée avec succès');

  } catch (error) {
    console.error('Erreur:', error);
    return createResponse(false, 'Erreur serveur: ' + error.message);
  }
}

/**
 * Fonction pour les requêtes GET (test)
 */
function doGet(e) {
  return createResponse(true, 'Le service RSVP est opérationnel');
}

/**
 * Vérifie si une réponse existe déjà pour cet email ou téléphone
 */
function checkDuplicate(sheet, email, phone) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) { // Commence à 1 pour ignorer l'en-tête
    const rowEmail = data[i][3]; // Colonne Email
    const rowPhone = data[i][4]; // Colonne Téléphone
    
    if (email && rowEmail === email) {
      return true;
    }
    if (phone && rowPhone === phone) {
      return true;
    }
  }
  
  return false;
}

/**
 * Crée une réponse JSON avec les bons headers CORS
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * OPTIONNEL : Envoie un email de notification aux mariés
 * Décommentez la ligne sendNotificationEmail(data) dans doPost pour activer
 */
function sendNotificationEmail(data) {
  const NOTIFICATION_EMAIL = 'votre@email.com'; // Votre email
  
  const subject = data.attending 
    ? `🎉 Nouvelle confirmation RSVP : ${data.firstName} ${data.lastName}`
    : `😢 Déclin RSVP : ${data.firstName} ${data.lastName}`;
  
  let body = `
Nouvelle réponse RSVP reçue :

Nom : ${data.firstName} ${data.lastName}
Email : ${data.email || 'Non fourni'}
Téléphone : ${data.phone || 'Non fourni'}
Présent : ${data.attending ? 'Oui' : 'Non'}
`;

  if (data.attending) {
    body += `
Accompagnants : ${data.guests || 0}
${data.guestNames ? `Noms : ${data.guestNames}` : ''}
${data.dietary ? `Restrictions : ${data.dietary}` : ''}
`;
  }

  if (data.message) {
    body += `
Message : ${data.message}
`;
  }

  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Erreur envoi email:', error);
  }
}

/**
 * UTILITAIRE : Fonction pour obtenir toutes les réponses (pour export)
 * Exécutez cette fonction depuis l'éditeur Apps Script pour voir les stats
 */
function getStats() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let totalResponses = data.length - 1; // -1 pour l'en-tête
  let attending = 0;
  let notAttending = 0;
  let totalGuests = 0;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][5] === 'Oui') {
      attending++;
      totalGuests += 1 + (parseInt(data[i][6]) || 0); // +1 pour la personne + accompagnants
    } else {
      notAttending++;
    }
  }
  
  console.log('=== STATISTIQUES RSVP ===');
  console.log(`Total réponses : ${totalResponses}`);
  console.log(`Présents : ${attending}`);
  console.log(`Absents : ${notAttending}`);
  console.log(`Total invités (avec accompagnants) : ${totalGuests}`);
  console.log('========================');
  
  return {
    totalResponses,
    attending,
    notAttending,
    totalGuests
  };
}
