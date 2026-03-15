// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ TOUTES VOS INFORMATIONS ICI
// ═══════════════════════════════════════════════════════════════════════════════
const CONFIG = {
    // Informations des mariés
    couple: {
        partner1: {
            name: "Rania",
            photo: "assets/images/rania.png", // Placez votre photo dans assets/images/
            description: "Gentille, brillante, et pleine de vie. Elle transforme tout en quelque chose de beau."
        },
        partner2: {
            name: "Reda",
            photo: "assets/images/reda.png", // Placez votre photo dans assets/images/
            description: "Sociable, déterminé, et toujours partant pour faire rire. Surtout quand Rania est là."
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
        name: "Mairie du 18ème arrondissement",
        address: "1 Place Jules Joffrin",
        city: "75018 Paris",
        mapUrl: "https://www.google.com/maps?q=Mairie%20du%2018%C3%A8me%20Arrondissement",
        mapEmbed: "https://maps.google.com/maps?q=Mairie+du+18eme+Arrondissement+1+Place+Jules+Joffrin+75018+Paris&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },

    reception: {
        name: "Royal Riaz 77",
        address: "15 All. Jean Image",
        city: "77200 Torcy",
        mapUrl: "https://www.google.com/maps?q=Royal%20Riaz%2077",
        mapEmbed: "https://maps.google.com/maps?q=Royal+Riaz+77+15+All+Jean+Image+77200+Torcy&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },

    // Programme - À MODIFIER
    program: [
        { time: "11h30", event: "Cérémonie civile (Mairie du 18ème)", icon: "💒" },
        { time: "17h45", event: "Arrivée des invités à la salle", icon: "👩👨" },
        { time: "18h30", event: "Ouverture du Atay d'honneur par les mariés", icon: "👰🤵" },
        { time: "20h00", event: "Dîner", icon: "🍽️" },
        { time: "22h00", event: "Soirée dansante", icon: "💃" },
    ],

    // Dress code - À MODIFIER
    dressCode: {
        title: "Venez comme vous êtes, évitez juste le blanc.",
        description: "",

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
        { year: "1995", title: "Les origines", text: "Deux bébés nés en 1995. Même génération, même énergie… juste pas encore au même endroit.", icon: "👶" },
        { year: "2024", title: "Mektoub", text: "Pendant que tout le monde était concentré sur Maroc - Tanzanie, Reda lui… a surtout eu un coup de foudre pour Rania.", icon: "⚽" },
        { year: "2025", title: "La demande", text: "Un \"Oui\" pour la vie. Validé par les parents et probablement même par le destin.", icon: "💍" },
        { year: "2026", title: "Le mariage", text: "Le jour où notre histoire devient officiellement une grande famille (et une très belle fête Inchallah).", icon: "💐" }
    ],
    // Galerie Photo (placez vos photos dans assets/images/)
    gallery: [
        "assets/images/gallery-1.jpeg",
        "assets/images/gallery-2.jpeg",
        "assets/images/gallery-3.jpeg",
        "assets/images/gallery-4.jpeg"
    ],

    // FAQ
    faq: [
        { question: "Y a-t-il un parking ?", answer: "Oui, un parking privé et sécurisé est disponible gratuitement sur le lieu de réception." },
        { question: "Un covoiturage est-il organisé ?", answer: "Nous n'avons pas de navette officielle, mais si vous cherchez ou proposez un covoiturage, contactez-nous !" },
        { question: "À quelle heure se termine la soirée ?", answer: "La fête se poursuivra jusqu'au bout de la nuit (environ 3h du matin)." },
        { question: "Peut-on quitter la réception et revenir ?", answer: "Oui, bien sûr, l'accès est libre tout au long de la soirée." },
        { question: "Y a-t-il une liste de mariage ou une cagnotte ?", answer: "Votre présence est notre plus beau cadeau. Vous pouvez nous faire un virement bancaire, où offrir le cadeau le jour J." },
        { question: "Peut-on offrir un cadeau le jour J ?", answer: "Oui, une table et une urne seront prévues à cet effet sur le lieu de réception." }
    ],

    // Informations pratiques
    heroImage: "assets/images/new-header-bg.jpg",

    practical: [
        { icon: "🅿️", title: "Parking", text: "Parking gratuit sur place" },
        { icon: "🚌", title: "Transports", text: "Cérémonie : Métro 12 Jules Joffrin.<br>Réception : RER A Gare de Torcy.<br>Si besoin de covoiturage, prenez contact avec nous !" },
        { icon: "👶", title: "Enfants", text: "Vos enfants sont les bienvenus." },

    ],

    // Textes
    texts: {
        heroSubtitle: "Nous avons l'honneur de vous inviter à célébrer notre union",
        heroInvitation: "Avec joie et émotion, nous serions honorés de votre présence pour partager ce moment unique de nos vies.",
        rsvpDeadline: "Merci de répondre avant le 25 Mars 2026",
    },

    // Google Sheets integration (optionnel)
    // Remplacez par votre URL de script Google Apps Script
    googleSheetsUrl: "https://script.google.com/macros/s/AKfycbwSztdbIiM56oi8Y0rYrBK1pA9yh4RmZ4jgzyFj5ZOSYndJ1we2LdaS0OF9h4cgj1JE/exec",

    // Formspree integration (optionnel)
    // Créez un formulaire sur formspree.io et collez l'URL ici
    formspreeUrl: "",
};
