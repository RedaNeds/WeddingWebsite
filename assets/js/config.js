// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ TOUTES VOS INFORMATIONS ICI
// ═══════════════════════════════════════════════════════════════════════════════
const CONFIG = {
    // Informations des mariés
    couple: {
        partner1: "Reda",
        partner2: "Rania",
    },

    // Date et heure
    event: {
        date: "16 mai 2026",
        dateFormatted: "Samedi 16 Mai 2026",
        time: "15h00",
    },

    // Lieu - À MODIFIER
    venue: {
        name: "[Nom du lieu]",
        address: "[Adresse complète]",
        city: "[Ville]",
        mapUrl: "https://maps.google.com/?q=Paris,France",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1635959562000!5m2!1sfr!2sfr",
    },

    // Programme - À MODIFIER
    program: [
        { time: "15h00", event: "Cérémonie", icon: "💒" },
        { time: "16h30", event: "Vin d'honneur & Photos", icon: "🥂" },
        { time: "18h00", event: "Cocktail", icon: "🍾" },
        { time: "20h00", event: "Dîner", icon: "🍽️" },
        { time: "23h00", event: "Soirée dansante", icon: "💃" },
    ],

    // Dress code - À MODIFIER
    dressCode: {
        title: "Tenue de soirée élégante",
        description: "Couleurs suggérées : tons neutres, pastels, or, champagne. Éviter le blanc.",
    },

    // Informations pratiques - À MODIFIER
    practical: [
        { icon: "🅿️", title: "Parking", text: "Parking gratuit sur place" },
        { icon: "🏨", title: "Hébergement", text: "[Hôtels recommandés à proximité]" },
        { icon: "🚌", title: "Transports", text: "[Informations transports]" },
        { icon: "👶", title: "Enfants", text: "Les enfants sont les bienvenus" },
    ],

    // Textes
    texts: {
        heroSubtitle: "Nous avons l'honneur de vous inviter à célébrer notre union",
        heroInvitation: "Avec joie et émotion, nous serions honorés de votre présence pour partager ce moment unique de nos vies.",
        rsvpDeadline: "Merci de répondre avant le 1er avril 2026",
    },

    // Google Sheets integration (optionnel)
    // Remplacez par votre URL de script Google Apps Script
    googleSheetsUrl: "",

    // Formspree integration (optionnel)
    // Créez un formulaire sur formspree.io et collez l'URL ici
    formspreeUrl: "",
};
