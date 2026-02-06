// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ TOUTES VOS INFORMATIONS ICI
// ═══════════════════════════════════════════════════════════════════════════════
const CONFIG = {
    // Informations des mariés
    couple: {
        partner1: "Rania",
        partner2: "Reda",
    },

    // Date et heure
    event: {
        date: "16 mai 2026",
        dateFormatted: "Samedi 16 Mai 2026",
        time: "11H30",
    },

    // Lieu - À MODIFIER
    venue: {
        name: "Le Paradis D'Anjelina",
        address: "12 Av. de Paris, 91790",
        city: "Boissy-sous-Saint-Yon",
        mapUrl: "https://www.google.com/maps?q=Le%20Paradis%20d%20Anjelina",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.888093242678!2d2.2185260767422457!3d48.55453702204113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5d1eb88034751%3A0x58e8a27a5db5063!2sLe%20Paradis%20d&#39;Anjelina!5e0!3m2!1sfr!2sfr!4v1770413269446!5m2!1sfr!2sfr",
    },

    // Programme - À MODIFIER
    program: [
        { time: "11h30", event: "Cérémonie", icon: "💒" },
        { time: "17h30", event: "Atay d'honneur & Photos", icon: "📸" },
        { time: "20h00", event: "Dîner", icon: "🍽️" },
        { time: "22h00", event: "Soirée dansante", icon: "💃" },
    ],

    // Dress code - À MODIFIER
    dressCode: {
        title: "Tenue de soirée élégante",
        description: "Couleurs suggérées : tons neutres, pastels, or, champagne. Éviter le blanc.",
    },

    // Informations pratiques - À MODIFIER
    practical: [
        { icon: "🅿️", title: "Parking", text: "Parking gratuit sur place" },
        { icon: "🚌", title: "Transports", text: "RER C : Arpajon puis VTC." },
        { icon: "👶", title: "Enfants", text: "Vos enfants sont les bienvenus" },
    ],

    // Textes
    texts: {
        heroSubtitle: "Nous avons l'honneur de vous inviter à célébrer notre union",
        heroInvitation: "Avec joie et émotion, nous serions honorés de votre présence pour partager ce moment unique de nos vies.",
        rsvpDeadline: "Merci de répondre avant le 20 Février 2026",
    },

    // Google Sheets integration (optionnel)
    // Remplacez par votre URL de script Google Apps Script
    googleSheetsUrl: "",

    // Formspree integration (optionnel)
    // Créez un formulaire sur formspree.io et collez l'URL ici
    formspreeUrl: "",
};
