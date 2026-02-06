// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ TOUTES VOS INFORMATIONS ICI
// ═══════════════════════════════════════════════════════════════════════════════
const CONFIG = {
    // Informations des mariés
    couple: {
        partner1: {
            name: "Rania",
            photo: "assets/images/rania.jpg", // Placez votre photo dans assets/images/
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una orci auctor vitae nisl. Erat fringilla pellentesque amet tempus.",
            social: {
                instagram: "#",
                facebook: "#"
            }
        },
        partner2: {
            name: "Reda",
            photo: "assets/images/reda.jpg", // Placez votre photo dans assets/images/
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una orci auctor vitae nisl. Erat fringilla pellentesque amet tempus.",
            social: {
                instagram: "#",
                facebook: "#"
            }
        },
    },

    // Date et heure
    event: {
        date: "16 mai 2026",
        dateFormatted: "11H30. Samedi 16 Mai 2026",
        time: "11H30",
    },

    // Lieux
    ceremony: {
        name: "Mairie du 18ème Arrondissement",
        address: "1 Place Jules Joffrin",
        city: "75018 Paris",
        mapUrl: "https://www.google.com/maps?q=Mairie%20du%2018%C3%A8me%20Arrondissement",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.2667364536696!2d2.342188076510886!3d48.89131669837941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e6079c6d66b%3A0x6b2e1a3d3c7e0c0!2sMairie%20du%2018e%20Arrondissement!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr",
    },

    reception: {
        name: "Le Paradis D'Anjelina",
        address: "12 Av. de Paris, 91790",
        city: "Boissy-sous-Saint-Yon",
        mapUrl: "https://www.google.com/maps?q=Le%20Paradis%20d%20Anjelina",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.888093242678!2d2.2185260767422457!3d48.55453702204113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5d1eb88034751%3A0x58e8a27a5db5063!2sLe%20Paradis%20d'Anjelina!5e0!3m2!1sfr!2sfr!4v1770413269446!5m2!1sfr!2sfr",
    },

    // Programme - À MODIFIER
    program: [
        { time: "11h30", event: "Cérémonie Civile (Mairie du 18ème)", icon: "💒" },
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
    heroImage: "assets/images/header-bg.jpg", // Photo de fond du header (à ajouter)

    practicalInfo: [
        {
            title: "Dress Code",
            content: "Tenue de soirée élégante. Nous vous invitons à éviter le blanc, réservé à la mariée.",
            icon: "d" // Will be mapped to an icon class or character
        },
        {
            title: "Enfants",
            content: "Vos enfants sont les bienvenus. Une salle de jeux sera à leur disposition pour qu'ils puissent s'amuser en toute sécurité.",
            icon: "c"
        },
        {
            title: "Hébergement",
            content: "Une liste d'hôtels à proximité est disponible sur demande pour faciliter votre séjour.",
            icon: "h"
        }
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
