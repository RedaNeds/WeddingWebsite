// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ TOUTES VOS INFORMATIONS ICI
// ═══════════════════════════════════════════════════════════════════════════════
const CONFIG = {
    // Informations des mariés
    couple: {
        partner1: {
            name: "Rania",
            photo: "assets/images/rania.png", // Placez votre photo dans assets/images/
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una orci auctor vitae nisl. Erat fringilla pellentesque amet tempus.",
            social: {
                instagram: "#",
                facebook: "#"
            }
        },
        partner2: {
            name: "Reda",
            photo: "assets/images/reda.png", // Placez votre photo dans assets/images/
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
        colors: [
            { code: "#F5F5DC", name: "Beige" },
            { code: "#E6D7B9", name: "Champagne" },
            { code: "#D4B88A", name: "Or Doux" },
            { code: "#ECCFCF", name: "Rose Poudré" },
            { code: "#B0C4DE", name: "Bleu Acier" }
        ]
    },

    // Musique
    music: {
        enabled: true,
        autoplay: true, // Les navigateurs bloquent souvent l'autoplay
        source: "assets/music/bg-music.mp3", // Placez votre fichier mp3 ici
        volume: 0.5
    },

    // Notre Histoire
    story: [
        { year: "2018", title: "La Rencontre", text: "C'était un soir d'été à Paris...", icon: "💘" },
        { year: "2020", title: "Le Premier Voyage", text: "Notre première aventure ensemble à Rome.", icon: "✈️" },
        { year: "2023", title: "La Demande", text: "Un 'Oui' pour la vie sous les étoiles.", icon: "💍" }
    ],

    // Galerie Photo (placez vos photos dans assets/images/)
    gallery: [
        "assets/images/gallery-1.jpg",
        "assets/images/gallery-2.jpg",
        "assets/images/gallery-3.jpg",
        "assets/images/gallery-4.jpg"
    ],

    // FAQ
    faq: [
        { question: "Y a-t-il un parking ?", answer: "Oui, un parking privé et sécurisé est disponible gratuitement sur le lieu de réception." },
        { question: "Les enfants sont-ils invités ?", answer: "Absolument ! Une salle de jeux et une animatrice seront là pour s'occuper des plus petits." },
        { question: "Puis-je venir accompagné ?", answer: "L'invitation est valable pour le nombre de personnes indiqué sur votre faire-part." },
        { question: "Où puis-je dormir ?", answer: "Nous avons négocié des tarifs préférentiels à l'Hôtel du Château (à 5min). Code promo : MARIAGE2026." }
    ],

    // Informations pratiques
    heroImage: "assets/images/header-bg.jpg",

    practical: [
        { icon: "🅿️", title: "Parking", text: "Parking gratuit sur place" },
        { icon: "🚌", title: "Transports", text: "RER C : Arpajon puis VTC." },
        { icon: "👶", title: "Enfants", text: "Vos enfants sont les bienvenus. Une salle de jeux sera à leur disposition pour qu'ils puissent s'amuser en toute sécurité." },
        { icon: "🏨", title: "Hébergement", text: "Hôtels à proximité disponibles." }
    ],

    // Textes
    texts: {
        heroSubtitle: "Nous avons l'honneur de vous inviter à célébrer notre union",
        heroInvitation: "Avec joie et émotion, nous serions honorés de votre présence pour partager ce moment unique de nos vies.",
        rsvpDeadline: "Merci de répondre avant le 20 Février 2026",
    },

    // Google Sheets integration (optionnel)
    // Remplacez par votre URL de script Google Apps Script
    googleSheetsUrl: "https://script.google.com/macros/s/AKfycbwSztdbIiM56oi8Y0rYrBK1pA9yh4RmZ4jgzyFj5ZOSYndJ1we2LdaS0OF9h4cgj1JE/exec",

    // Formspree integration (optionnel)
    // Créez un formulaire sur formspree.io et collez l'URL ici
    formspreeUrl: "",
};
