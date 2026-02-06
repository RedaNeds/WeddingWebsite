import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION - MODIFIEZ VOS INFORMATIONS ICI
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
    time: "15h00", // À modifier
    ceremonyTime: "15h00", // Heure de la cérémonie
    receptionTime: "18h00", // Heure du cocktail/réception
    dinnerTime: "20h00", // Heure du dîner
  },

  // Lieu
  venue: {
    name: "Le Paris D'Anjelina", // À modifier
    address: "12 Av. de Paris, 91790 Boissy-sous-Saint-Yon", // À modifier
    city: "Boissy-sous-Saint-Yon", // À modifier
    mapUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47e5d1eb88034751:0x58e8a27a5db5063?sa=X&ved=1t:8290&ictx=111", // À modifier avec les vraies coordonnées
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1635959562000!5m2!1sfr!2sfr", // À modifier
  },

  // Programme
  program: [
    { time: "11h30", event: "Cérémonie", icon: "💒" },
    { time: "17h30", event: "Vin d'honneur & Photos", icon: "🥂" },
    { time: "20h00", event: "Dîner", icon: "🍽️" },
    { time: "22h00", event: "Soirée dansante", icon: "💃" },
  ],

  // Dress code
  dressCode: {
    title: "Tenue de soirée élégante",
    description: "Couleurs suggérées : tons neutres, pastels, or, champagne. Éviter le blanc.",
  },

  // Informations pratiques
  practical: {
    parking: "Parking gratuit sur place",
    accommodation: "[Hôtels recommandés à proximité]", // À modifier
    transport: "[Informations transports]", // À modifier
    children: "Les enfants sont les bienvenus",
  },

  // Textes
  texts: {
    hero: {
      subtitle: "Nous avons l'honneur de vous inviter à célébrer notre union",
      invitation: "Avec joie et émotion, nous serions honorés de votre présence pour partager ce moment unique de nos vies.",
    },
    rsvp: {
      title: "Confirmez votre présence",
      subtitle: "Merci de répondre avant le 1er avril 2026",
      deadline: "1er avril 2026",
    },
  },

  // Couleurs du thème
  colors: {
    cream: '#FAF8F5',
    beige: '#E8E2D9',
    gold: '#C9A96E',
    goldLight: '#D4B88A',
    text: '#3D3D3D',
    textLight: '#6B6B6B',
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function WeddingInvitation() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attending: null,
    guests: 0,
    guestNames: '',
    dietary: '',
    message: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  const sectionsRef = {
    hero: useRef(null),
    info: useRef(null),
    rsvp: useRef(null),
  };

  // Charger les réponses existantes au démarrage
  useEffect(() => {
    loadResponses();
  }, []);

  // Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    Object.values(sectionsRef).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Fonctions de stockage
  const loadResponses = async () => {
    try {
      const result = await window.storage.get('wedding-responses');
      if (result && result.value) {
        setResponses(JSON.parse(result.value));
      }
    } catch (e) {
      console.log('No existing responses');
    }
  };

  const saveResponse = async (data) => {
    const newResponse = {
      ...data,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };

    const updatedResponses = [...responses, newResponse];

    try {
      await window.storage.set('wedding-responses', JSON.stringify(updatedResponses));
      setResponses(updatedResponses);
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      return false;
    }
  };

  const checkDuplicate = () => {
    const emailOrPhone = formData.email || formData.phone;
    return responses.some(r =>
      (r.email && r.email === formData.email) ||
      (r.phone && r.phone === formData.phone)
    );
  };

  const scrollToSection = (sectionId) => {
    sectionsRef[sectionId]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName) {
      setError('Veuillez entrer votre nom complet');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email && !formData.phone) {
      setError('Veuillez entrer un email ou un numéro de téléphone');
      setIsSubmitting(false);
      return;
    }

    if (formData.attending === null) {
      setError('Veuillez indiquer si vous serez présent(e)');
      setIsSubmitting(false);
      return;
    }

    // Vérifier les doublons
    if (checkDuplicate()) {
      setError('Une réponse a déjà été enregistrée avec cet email ou ce numéro de téléphone');
      setIsSubmitting(false);
      return;
    }

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Sauvegarder
    const success = await saveResponse(formData);

    if (success) {
      setSubmittedData(formData);
      setShowThankYou(true);
    } else {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }

    setIsSubmitting(false);
  };

  // ═══════════════════════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════════════════════
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      --cream: ${CONFIG.colors.cream};
      --beige: ${CONFIG.colors.beige};
      --gold: ${CONFIG.colors.gold};
      --gold-light: ${CONFIG.colors.goldLight};
      --text: ${CONFIG.colors.text};
      --text-light: ${CONFIG.colors.textLight};
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      background: var(--cream);
      color: var(--text);
      line-height: 1.6;
      overflow-x: hidden;
    }
    
    .wedding-container {
      min-height: 100vh;
      background: var(--cream);
    }
    
    /* Typography */
    .font-display {
      font-family: 'Cormorant Garamond', serif;
    }
    
    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .animate-fade-in {
      animation: fadeIn 1.2s ease-out forwards;
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out forwards;
    }
    
    .animate-delay-1 { animation-delay: 0.2s; }
    .animate-delay-2 { animation-delay: 0.4s; }
    .animate-delay-3 { animation-delay: 0.6s; }
    .animate-delay-4 { animation-delay: 0.8s; }
    
    .opacity-0 { opacity: 0; }
    
    /* Decorative Elements */
    .ornament {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    
    .ornament-line {
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
    }
    
    .ornament-diamond {
      width: 8px;
      height: 8px;
      background: var(--gold);
      transform: rotate(45deg);
    }
    
    /* Navigation */
    .nav-fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem 2rem;
      background: linear-gradient(to bottom, rgba(250, 248, 245, 0.95), transparent);
      transition: all 0.3s ease;
    }
    
    .nav-inner {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
    
    .nav-link {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-light);
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: color 0.3s ease;
      cursor: pointer;
    }
    
    .nav-link:hover {
      color: var(--gold);
    }
    
    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      position: relative;
      background: 
        radial-gradient(ellipse at top, rgba(201, 169, 110, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at bottom, rgba(232, 226, 217, 0.5) 0%, transparent 50%),
        var(--cream);
    }
    
    .hero-content {
      max-width: 700px;
    }
    
    .hero-date-top {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 2rem;
    }
    
    .hero-names {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 12vw, 7rem);
      font-weight: 300;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 0.5rem;
    }
    
    .hero-ampersand {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 8vw, 4rem);
      font-weight: 300;
      font-style: italic;
      color: var(--gold);
      display: block;
      margin: 0.5rem 0;
    }
    
    .hero-subtitle {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(1.1rem, 3vw, 1.4rem);
      font-weight: 400;
      font-style: italic;
      color: var(--text-light);
      margin: 2rem 0;
      line-height: 1.8;
    }
    
    .hero-invitation {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 300;
      color: var(--text-light);
      max-width: 500px;
      margin: 0 auto 3rem;
      line-height: 1.8;
    }
    
    .hero-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text);
      background: transparent;
      border: 1px solid var(--gold);
      padding: 1rem 2.5rem;
      cursor: pointer;
      transition: all 0.4s ease;
    }
    
    .hero-button:hover {
      background: var(--gold);
      color: white;
    }
    
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      animation: float 3s ease-in-out infinite;
    }
    
    .scroll-indicator span {
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-light);
    }
    
    .scroll-arrow {
      width: 20px;
      height: 20px;
      border-right: 1px solid var(--gold);
      border-bottom: 1px solid var(--gold);
      transform: rotate(45deg);
    }
    
    /* Info Section */
    .info-section {
      padding: 6rem 2rem;
      background: white;
      position: relative;
    }
    
    .info-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 80px;
      background: linear-gradient(to bottom, var(--gold), transparent);
    }
    
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 6vw, 3rem);
      font-weight: 400;
      text-align: center;
      color: var(--text);
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-align: center;
      color: var(--gold);
      margin-bottom: 3rem;
    }
    
    .info-grid {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 3rem;
    }
    
    .info-card {
      text-align: center;
      padding: 2rem;
      background: var(--cream);
      border-radius: 2px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .info-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(201, 169, 110, 0.1);
    }
    
    .info-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .info-card-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 0.75rem;
    }
    
    .info-card-content {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 300;
      color: var(--text-light);
      line-height: 1.8;
    }
    
    .info-card-content strong {
      color: var(--text);
      font-weight: 500;
    }
    
    /* Program Section */
    .program-section {
      padding: 4rem 2rem;
      background: var(--cream);
    }
    
    .program-timeline {
      max-width: 600px;
      margin: 0 auto;
      position: relative;
    }
    
    .program-timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    }
    
    .program-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 1.5rem 0;
      position: relative;
    }
    
    .program-time {
      flex: 1;
      text-align: right;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--gold);
    }
    
    .program-dot {
      width: 12px;
      height: 12px;
      background: var(--gold);
      border-radius: 50%;
      position: relative;
      z-index: 1;
    }
    
    .program-event {
      flex: 1;
      text-align: left;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--text);
    }
    
    /* Map Section */
    .map-section {
      padding: 4rem 2rem;
      background: white;
    }
    
    .map-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .map-embed {
      width: 100%;
      height: 300px;
      border: none;
      filter: grayscale(20%) contrast(95%);
      border-radius: 2px;
    }
    
    .map-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border: 1px solid var(--gold);
      transition: all 0.3s ease;
    }
    
    .map-button:hover {
      background: var(--gold);
      color: white;
    }
    
    /* Practical Info */
    .practical-section {
      padding: 4rem 2rem;
      background: var(--beige);
    }
    
    .practical-grid {
      max-width: 800px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    
    .practical-item {
      text-align: center;
      padding: 1.5rem;
    }
    
    .practical-icon {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }
    
    .practical-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 0.5rem;
    }
    
    .practical-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      font-weight: 300;
      color: var(--text-light);
    }
    
    /* RSVP Section */
    .rsvp-section {
      padding: 6rem 2rem;
      background: 
        radial-gradient(ellipse at center, rgba(201, 169, 110, 0.05) 0%, transparent 70%),
        var(--cream);
    }
    
    .rsvp-form {
      max-width: 500px;
      margin: 0 auto;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-label {
      display: block;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-light);
      margin-bottom: 0.5rem;
    }
    
    .form-input {
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      padding: 0.875rem 1rem;
      border: 1px solid var(--beige);
      background: white;
      color: var(--text);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      border-radius: 2px;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1);
    }
    
    .form-input::placeholder {
      color: #bbb;
    }
    
    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .attendance-options {
      display: flex;
      gap: 1rem;
    }
    
    .attendance-option {
      flex: 1;
      padding: 1rem;
      border: 1px solid var(--beige);
      background: white;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    
    .attendance-option:hover {
      border-color: var(--gold-light);
    }
    
    .attendance-option.selected {
      border-color: var(--gold);
      background: rgba(201, 169, 110, 0.05);
    }
    
    .attendance-option.selected.yes {
      border-color: #7CB342;
      background: rgba(124, 179, 66, 0.05);
    }
    
    .attendance-option.selected.no {
      border-color: #E57373;
      background: rgba(229, 115, 115, 0.05);
    }
    
    .attendance-icon {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }
    
    .attendance-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--text);
    }
    
    .guests-counter {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    
    .counter-btn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      border: 1px solid var(--beige);
      background: white;
      color: var(--text);
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 50%;
    }
    
    .counter-btn:hover:not(:disabled) {
      border-color: var(--gold);
      color: var(--gold);
    }
    
    .counter-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    
    .counter-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 500;
      color: var(--text);
      min-width: 50px;
      text-align: center;
    }
    
    .submit-button {
      width: 100%;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: white;
      background: var(--gold);
      border: none;
      padding: 1.25rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 2rem;
      border-radius: 2px;
    }
    
    .submit-button:hover:not(:disabled) {
      background: var(--text);
    }
    
    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .form-error {
      background: rgba(229, 115, 115, 0.1);
      border: 1px solid #E57373;
      color: #C62828;
      padding: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
      border-radius: 2px;
    }
    
    /* Thank You Section */
    .thankyou-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(250, 248, 245, 0.98);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.5s ease;
    }
    
    .thankyou-content {
      max-width: 500px;
      text-align: center;
    }
    
    .thankyou-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      animation: float 3s ease-in-out infinite;
    }
    
    .thankyou-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 6vw, 3rem);
      font-weight: 400;
      color: var(--text);
      margin-bottom: 1rem;
    }
    
    .thankyou-message {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.95rem;
      font-weight: 300;
      color: var(--text-light);
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    
    .thankyou-summary {
      background: white;
      padding: 2rem;
      border-radius: 2px;
      text-align: left;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    
    .summary-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.3rem;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--beige);
    }
    
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
    }
    
    .summary-label {
      color: var(--text-light);
      font-weight: 400;
    }
    
    .summary-value {
      color: var(--text);
      font-weight: 500;
    }
    
    .thankyou-close {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold);
      background: transparent;
      border: 1px solid var(--gold);
      padding: 0.75rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .thankyou-close:hover {
      background: var(--gold);
      color: white;
    }
    
    /* Footer */
    .footer {
      padding: 4rem 2rem;
      text-align: center;
      background: var(--text);
      color: white;
    }
    
    .footer-names {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    
    .footer-date {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
    }
    
    .footer-hearts {
      margin-top: 2rem;
      font-size: 1.5rem;
      opacity: 0.3;
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .nav-fixed {
        padding: 0.75rem 1rem;
      }
      
      .nav-inner {
        gap: 0.5rem;
      }
      
      .nav-link {
        font-size: 0.65rem;
        padding: 0.5rem;
        letter-spacing: 0.1em;
      }
      
      .hero-section {
        padding: 4rem 1.5rem;
      }
      
      .info-section,
      .rsvp-section {
        padding: 4rem 1.5rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .program-timeline::before {
        left: 20px;
      }
      
      .program-item {
        flex-direction: row;
        justify-content: flex-start;
        gap: 1rem;
        padding-left: 0;
      }
      
      .program-time {
        flex: none;
        width: 60px;
        text-align: left;
        font-size: 1rem;
      }
      
      .program-dot {
        flex: none;
      }
      
      .program-event {
        flex: 1;
      }
      
      .attendance-options {
        flex-direction: column;
      }
    }
    
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDU
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className="wedding-container">
      <style>{styles}</style>

      {/* Navigation */}
      <nav className="nav-fixed">
        <div className="nav-inner">
          <span className="nav-link" onClick={() => scrollToSection('hero')}>Accueil</span>
          <span className="nav-link" onClick={() => scrollToSection('info')}>Informations</span>
          <span className="nav-link" onClick={() => scrollToSection('rsvp')}>RSVP</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={sectionsRef.hero} id="hero" className="hero-section">
        <div className="hero-content">
          <div className={`hero-date-top animate-fade-in-up ${isVisible.hero ? '' : 'opacity-0'}`}>
            {CONFIG.event.dateFormatted}
          </div>

          <h1 className={`hero-names animate-fade-in-up animate-delay-1 ${isVisible.hero ? '' : 'opacity-0'}`}>
            {CONFIG.couple.partner1}
            <span className="hero-ampersand">&</span>
            {CONFIG.couple.partner2}
          </h1>

          <div className="ornament animate-fade-in-up animate-delay-2">
            <span className="ornament-line"></span>
            <span className="ornament-diamond"></span>
            <span className="ornament-line"></span>
          </div>

          <p className={`hero-subtitle animate-fade-in-up animate-delay-2 ${isVisible.hero ? '' : 'opacity-0'}`}>
            {CONFIG.texts.hero.subtitle}
          </p>

          <p className={`hero-invitation animate-fade-in-up animate-delay-3 ${isVisible.hero ? '' : 'opacity-0'}`}>
            {CONFIG.texts.hero.invitation}
          </p>

          <button
            className={`hero-button animate-fade-in-up animate-delay-4 ${isVisible.hero ? '' : 'opacity-0'}`}
            onClick={() => scrollToSection('info')}
          >
            Voir les détails
            <span>↓</span>
          </button>
        </div>

        <div className="scroll-indicator">
          <span>Défiler</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Info Section */}
      <section ref={sectionsRef.info} id="info" className="info-section">
        <h2 className="section-title">Notre Jour</h2>
        <div className="section-subtitle">Les détails de la célébration</div>

        <div className="ornament">
          <span className="ornament-line"></span>
          <span className="ornament-diamond"></span>
          <span className="ornament-line"></span>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3 className="info-card-title">Date</h3>
            <p className="info-card-content">
              <strong>{CONFIG.event.dateFormatted}</strong>
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3 className="info-card-title">Lieu</h3>
            <p className="info-card-content">
              <strong>{CONFIG.venue.name}</strong><br />
              {CONFIG.venue.address}<br />
              {CONFIG.venue.city}
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">👔</div>
            <h3 className="info-card-title">Dress Code</h3>
            <p className="info-card-content">
              <strong>{CONFIG.dressCode.title}</strong><br />
              {CONFIG.dressCode.description}
            </p>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="program-section">
        <h2 className="section-title">Programme</h2>
        <div className="section-subtitle">Déroulement de la journée</div>

        <div className="ornament">
          <span className="ornament-line"></span>
          <span className="ornament-diamond"></span>
          <span className="ornament-line"></span>
        </div>

        <div className="program-timeline">
          {CONFIG.program.map((item, index) => (
            <div key={index} className="program-item">
              <div className="program-time">{item.time}</div>
              <div className="program-dot"></div>
              <div className="program-event">
                {item.icon} {item.event}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2 className="section-title">Comment nous rejoindre</h2>
        <div className="section-subtitle">{CONFIG.venue.name}</div>

        <div className="map-container" style={{ textAlign: 'center' }}>
          <iframe
            className="map-embed"
            src={CONFIG.venue.mapEmbed}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lieu du mariage"
          />
          <a
            href={CONFIG.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
          >
            📍 Ouvrir dans Google Maps
          </a>
        </div>
      </section>

      {/* Practical Info */}
      <section className="practical-section">
        <h2 className="section-title">Informations Pratiques</h2>

        <div className="ornament">
          <span className="ornament-line"></span>
          <span className="ornament-diamond"></span>
          <span className="ornament-line"></span>
        </div>

        <div className="practical-grid">
          <div className="practical-item">
            <div className="practical-icon">🅿️</div>
            <h4 className="practical-title">Parking</h4>
            <p className="practical-text">{CONFIG.practical.parking}</p>
          </div>

          <div className="practical-item">
            <div className="practical-icon">🏨</div>
            <h4 className="practical-title">Hébergement</h4>
            <p className="practical-text">{CONFIG.practical.accommodation}</p>
          </div>

          <div className="practical-item">
            <div className="practical-icon">🚌</div>
            <h4 className="practical-title">Transports</h4>
            <p className="practical-text">{CONFIG.practical.transport}</p>
          </div>

          <div className="practical-item">
            <div className="practical-icon">👶</div>
            <h4 className="practical-title">Enfants</h4>
            <p className="practical-text">{CONFIG.practical.children}</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section ref={sectionsRef.rsvp} id="rsvp" className="rsvp-section">
        <h2 className="section-title">{CONFIG.texts.rsvp.title}</h2>
        <div className="section-subtitle">{CONFIG.texts.rsvp.subtitle}</div>

        <div className="ornament">
          <span className="ornament-line"></span>
          <span className="ornament-diamond"></span>
          <span className="ornament-line"></span>
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <div className="form-group form-row">
            <div>
              <label className="form-label">Prénom *</label>
              <input
                type="text"
                name="firstName"
                className="form-input"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="form-label">Nom *</label>
              <input
                type="text"
                name="lastName"
                className="form-input"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group form-row">
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="form-label">Téléphone</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="06 00 00 00 00"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Serez-vous présent(e) ? *</label>
            <div className="attendance-options">
              <div
                className={`attendance-option ${formData.attending === true ? 'selected yes' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, attending: true }))}
              >
                <div className="attendance-icon">🎉</div>
                <div className="attendance-text">Oui, avec joie !</div>
              </div>
              <div
                className={`attendance-option ${formData.attending === false ? 'selected no' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, attending: false, guests: 0, guestNames: '' }))}
              >
                <div className="attendance-icon">😢</div>
                <div className="attendance-text">Malheureusement non</div>
              </div>
            </div>
          </div>

          {formData.attending && (
            <>
              <div className="form-group">
                <label className="form-label">Nombre d'accompagnants</label>
                <div className="guests-counter">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(0, prev.guests - 1) }))}
                    disabled={formData.guests <= 0}
                  >
                    −
                  </button>
                  <span className="counter-value">{formData.guests}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(5, prev.guests + 1) }))}
                    disabled={formData.guests >= 5}
                  >
                    +
                  </button>
                </div>
              </div>

              {formData.guests > 0 && (
                <div className="form-group">
                  <label className="form-label">Noms des accompagnants</label>
                  <input
                    type="text"
                    name="guestNames"
                    className="form-input"
                    placeholder="Prénom et nom de chaque accompagnant"
                    value={formData.guestNames}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Restrictions alimentaires (optionnel)</label>
                <input
                  type="text"
                  name="dietary"
                  className="form-input"
                  placeholder="Allergies, régime végétarien, etc."
                  value={formData.dietary}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Un message pour les mariés (optionnel)</label>
            <textarea
              name="message"
              className="form-input form-textarea"
              placeholder="Écrivez un petit mot..."
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma réponse'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-names">
          {CONFIG.couple.partner1} & {CONFIG.couple.partner2}
        </div>
        <div className="footer-date">{CONFIG.event.dateFormatted}</div>
        <div className="footer-hearts">♥ ♥ ♥</div>
      </footer>

      {/* Thank You Overlay */}
      {showThankYou && submittedData && (
        <div className="thankyou-overlay">
          <div className="thankyou-content">
            <div className="thankyou-icon">
              {submittedData.attending ? '💕' : '💌'}
            </div>

            <h2 className="thankyou-title">
              {submittedData.attending ? 'Merci beaucoup !' : 'Merci pour votre réponse'}
            </h2>

            <p className="thankyou-message">
              {submittedData.attending
                ? `Nous sommes ravis de vous compter parmi nous pour célébrer notre union. Votre présence rendra cette journée encore plus spéciale.`
                : `Nous sommes désolés que vous ne puissiez pas être présent(e). Vous serez dans nos pensées ce jour-là.`
              }
            </p>

            <div className="thankyou-summary">
              <h3 className="summary-title">Récapitulatif de votre réponse</h3>

              <div className="summary-item">
                <span className="summary-label">Nom</span>
                <span className="summary-value">{submittedData.firstName} {submittedData.lastName}</span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Contact</span>
                <span className="summary-value">{submittedData.email || submittedData.phone}</span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Présence</span>
                <span className="summary-value">{submittedData.attending ? 'Oui' : 'Non'}</span>
              </div>

              {submittedData.attending && (
                <div className="summary-item">
                  <span className="summary-label">Accompagnants</span>
                  <span className="summary-value">{submittedData.guests}</span>
                </div>
              )}

              {submittedData.guestNames && (
                <div className="summary-item">
                  <span className="summary-label">Noms</span>
                  <span className="summary-value">{submittedData.guestNames}</span>
                </div>
              )}

              {submittedData.dietary && (
                <div className="summary-item">
                  <span className="summary-label">Restrictions</span>
                  <span className="summary-value">{submittedData.dietary}</span>
                </div>
              )}
            </div>

            <button
              className="thankyou-close"
              onClick={() => {
                setShowThankYou(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  attending: null,
                  guests: 0,
                  guestNames: '',
                  dietary: '',
                  message: '',
                });
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
