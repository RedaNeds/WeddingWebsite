# 💒 Site d'Invitation de Mariage - Reda & Rania

Un site d'invitation de mariage élégant, minimaliste et entièrement responsive avec formulaire RSVP et stockage des réponses.

## ✨ Fonctionnalités

- **Design Premium** : Typographies élégantes, couleurs douces (blanc cassé, beige, or)
- **100% Responsive** : Optimisé mobile-first
- **Animations Légères** : Fade-in, scroll reveal, micro-interactions
- **Formulaire RSVP Complet** : Nom, contact, présence, accompagnants, restrictions alimentaires
- **Stockage des Réponses** : LocalStorage + intégration Google Sheets/Formspree
- **Anti-doublons** : Vérifie les emails/téléphones déjà soumis
- **Page de Confirmation** : Récapitulatif après soumission
- **Accessible** : Respect des normes d'accessibilité, reduced-motion

---

## 📁 Structure des Fichiers

wedding-site/
├── index.html              # Point d'entrée
├── assets/
│   ├── css/
│   │   └── style.css      # Styles CSS
│   ├── js/
│   │   ├── config.js      # Configuration (Mariés, Dates, Lieux)
│   │   └── main.js        # Logique de l'application
│   └── images/            # Images et favicons
├── google-apps-script.js   # Script pour Google Sheets
├── qr-code-generator.html  # Générateur de QR code
└── README.md               # Ce fichier

---

## 🚀 Déploiement Rapide

### Option 1 : Netlify (Recommandé - 2 minutes)

1. **Créez un compte** sur [netlify.com](https://netlify.com)
2. **Glissez-déposez** le dossier contenant `index.html` dans Netlify
3. **C'est en ligne !** Netlify vous donne une URL comme `random-name.netlify.app`
4. **Personnalisez l'URL** : Allez dans Site settings → Domain management

### Option 2 : Vercel (2 minutes)

1. **Créez un compte** sur [vercel.com](https://vercel.com)
2. **Nouveau projet** → Importez depuis votre ordinateur
3. **Uploadez** le fichier `index.html`
4. **Déployez** → URL instantanée

### Option 3 : GitHub Pages (Gratuit)

1. **Créez un repository** sur GitHub
2. **Uploadez** `index.html` (renommez-le si besoin)
3. **Settings** → Pages → Source: main branch
4. **URL** : `votre-username.github.io/nom-repo`

---

## ⚙️ Configuration

### Modifier les informations du mariage

Ouvrez `assets/js/config.js` et modifiez l'objet `CONFIG` :

```javascript
const CONFIG = {
  // Informations des mariés
  couple: {
    partner1: "Reda",      // Prénom 1
    partner2: "Rania",     // Prénom 2
  },
  
  // Date et heure
  event: {
    date: "16 mai 2026",
    dateFormatted: "Samedi 16 Mai 2026",
    time: "15h00",
  },
  
  // Lieu - À MODIFIER
  venue: {
    name: "Château de Versailles",           // Nom du lieu
    address: "Place d'Armes",                // Adresse
    city: "78000 Versailles",                // Ville
    mapUrl: "https://maps.google.com/?q=...", // Lien Maps
    mapEmbed: "https://www.google.com/maps/embed?pb=...", // Embed Maps
  },
  
  // Programme
  program: [
    { time: "15h00", event: "Cérémonie", icon: "💒" },
    { time: "16h30", event: "Vin d'honneur", icon: "🥂" },
    // ... ajoutez vos horaires
  ],
  
  // Dress code
  dressCode: {
    title: "Tenue de soirée élégante",
    description: "Couleurs suggérées : tons neutres, pastels...",
  },
  
  // Informations pratiques
  practical: [
    { icon: "🅿️", title: "Parking", text: "Parking gratuit sur place" },
    { icon: "🏨", title: "Hébergement", text: "Hôtel du Château - 01 23 45 67 89" },
    // ... ajoutez vos infos
  ],
};
```

### Obtenir l'URL Google Maps Embed

1. Allez sur [Google Maps](https://maps.google.com)
2. Recherchez votre lieu
3. Cliquez sur **Partager** → **Intégrer une carte**
4. Copiez le `src="..."` de l'iframe
5. Collez-le dans `CONFIG.venue.mapEmbed`

---

## 📊 Stockage des Réponses

### Option 1 : LocalStorage (Par défaut)

Les réponses sont sauvegardées dans le navigateur. Pour les exporter :

1. Ouvrez la console du navigateur (F12)
2. Tapez : `JSON.parse(localStorage.getItem('wedding-responses'))`
3. Copiez les données

### Option 2 : Google Sheets (Recommandé)

#### Étape 1 : Créer le Google Sheet

1. Créez un nouveau Google Sheet
2. Ajoutez ces en-têtes en ligne 1 :
   ```
   Date | Prénom | Nom | Email | Téléphone | Présent | Accompagnants | Noms accompagnants | Restrictions | Message
   ```

#### Étape 2 : Créer le Script

1. Dans Google Sheets : **Extensions** → **Apps Script**
2. Supprimez le contenu et collez le code de `google-apps-script.js`
3. Remplacez `VOTRE_SPREADSHEET_ID` par l'ID de votre Sheet (dans l'URL)
4. **Déployer** → **Nouveau déploiement**
5. Type : **Application Web**
6. Accès : **Tout le monde**
7. Copiez l'URL du déploiement

#### Étape 3 : Configurer le site

Dans `assets/js/config.js`, ajoutez l'URL dans CONFIG :
```javascript
googleSheetsUrl: "https://script.google.com/macros/s/VOTRE_ID/exec",
```

### Option 3 : Formspree (Simple)

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Copiez l'URL de l'endpoint
4. Dans `assets/js/config.js` :
```javascript
formspreeUrl: "https://formspree.io/f/VOTRE_ID",
```

---

## 🎨 Personnalisation du Design

### Couleurs

Modifiez les variables CSS au début du fichier `assets/css/style.css` :

```css
:root {
  --cream: #FAF8F5;      /* Fond principal */
  --beige: #E8E2D9;      /* Fond secondaire */
  --gold: #C9A96E;       /* Accent doré */
  --gold-light: #D4B88A; /* Or clair */
  --text: #3D3D3D;       /* Texte principal */
  --text-light: #6B6B6B; /* Texte secondaire */
}
```

### Polices

Les polices utilisées sont :
- **Cormorant Garamond** : Titres et noms (élégante, mariage)
- **Montserrat** : Corps de texte (moderne, lisible)

Pour changer, modifiez le lien Google Fonts en haut du fichier.

---

## 📱 QR Code

Utilisez le fichier `qr-code-generator.html` ou :

1. Allez sur [qrcode-monkey.com](https://www.qrcode-monkey.com)
2. Entrez l'URL de votre site
3. Personnalisez le design (couleur dorée #C9A96E)
4. Téléchargez en haute résolution

---

## 🔧 Fonctionnalités Avancées

### Ajouter une musique de fond

Ajoutez dans le HTML :
```html
<audio id="bgMusic" loop>
  <source src="votre-musique.mp3" type="audio/mpeg">
</audio>
<button onclick="document.getElementById('bgMusic').play()" class="music-btn">
  🎵 Activer la musique
</button>
```

### Compte à rebours

Ajoutez ce code JavaScript :
```javascript
function updateCountdown() {
  const wedding = new Date('2026-05-16T15:00:00');
  const now = new Date();
  const diff = wedding - now;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  document.getElementById('countdown').textContent = `${days} jours et ${hours} heures`;
}
setInterval(updateCountdown, 60000);
updateCountdown();
```

---

## 📋 Checklist de Déploiement

- [ ] Modifier les noms des mariés
- [ ] Mettre à jour la date et l'heure
- [ ] Ajouter le lieu exact avec Maps
- [ ] Personnaliser le programme
- [ ] Définir le dress code
- [ ] Ajouter les infos pratiques (parking, hôtels, transport)
- [ ] Configurer Google Sheets ou Formspree
- [ ] Tester le formulaire RSVP
- [ ] Générer le QR code
- [ ] Déployer sur Netlify/Vercel
- [ ] Personnaliser l'URL (domaine)
- [ ] Tester sur mobile

---

## 🆘 Support

### Le formulaire ne sauvegarde pas ?
- Vérifiez la console du navigateur (F12) pour les erreurs
- Testez avec un autre navigateur
- Vérifiez que Google Sheets URL est correcte

### Les polices ne s'affichent pas ?
- Vérifiez votre connexion internet
- Google Fonts peut être bloqué dans certains pays

### Le site est lent ?
- Les images doivent être optimisées (< 500KB)
- Utilisez [tinypng.com](https://tinypng.com) pour compresser

---

## 📄 Licence

Ce code est fourni pour un usage personnel. Vous êtes libre de le modifier et l'utiliser pour votre mariage.

---

💕 **Félicitations pour votre mariage !** 💕
