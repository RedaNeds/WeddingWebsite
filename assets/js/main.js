// ═══════════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════════
// formState is now defined in the RSVP Form Handling section
let responses = [];

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initializeContent();
    initializeCoupleSection();
    initializeScrollReveal();
    initializeNavbar();
    loadResponses();
});

function initializeContent() {
    // Hero
    document.getElementById('hero-date').textContent = CONFIG.event.dateFormatted;
    // Names now handled in initializeCoupleSection for details, but kept here for Hero if needed
    // Assuming Hero uses CONFIG.couple.partner1.name
    // Check Config structure update: partner1 is now an object!
    document.getElementById('partner1').textContent = CONFIG.couple.partner1.name;
    document.getElementById('partner2').textContent = CONFIG.couple.partner2.name;
    document.getElementById('hero-subtitle').textContent = CONFIG.texts.heroSubtitle;
    document.getElementById('hero-invitation').textContent = CONFIG.texts.heroInvitation;

    // Footer Names
    document.getElementById('footer-names').textContent = `${CONFIG.couple.partner1.name} & ${CONFIG.couple.partner2.name}`;


    // Info
    document.getElementById('event-date').textContent = CONFIG.event.dateFormatted;
    document.getElementById('venue-info').innerHTML = `
    <div style="margin-bottom: 2rem">
        <strong style="color: var(--gold); display: block; margin-bottom: 0.5rem">💒 Cérémonie</strong>
        <strong>${CONFIG.ceremony.name}</strong><br>
        <span style="font-size: 0.9em">${CONFIG.ceremony.address}<br>${CONFIG.ceremony.city}</span>
    </div>
    <div>
        <strong style="color: var(--gold); display: block; margin-bottom: 0.5rem">🎉 Réception</strong>
        <strong>${CONFIG.reception.name}</strong><br>
        <span style="font-size: 0.9em">${CONFIG.reception.address}<br>${CONFIG.reception.city}</span>
    </div>
  `;
    document.getElementById('dresscode-info').innerHTML = `
    <strong>${CONFIG.dressCode.title}</strong><br>
    ${CONFIG.dressCode.description}
  `;

    // Start Countdown
    startCountdown();

    // Program
    const programHTML = CONFIG.program.map(item => `
    <div class="program-item">
      <div class="program-time">${item.time}</div>
      <div class="program-dot"></div>
      <div class="program-event">${item.icon} ${item.event}</div>
    </div>
  `).join('');
    document.getElementById('program-timeline').innerHTML = programHTML;

    // Maps - Split
    // Ceremony
    document.getElementById('ceremony-address').innerHTML = `
    <strong>${CONFIG.ceremony.name}</strong><br>
    ${CONFIG.ceremony.address}<br>${CONFIG.ceremony.city}
  `;
    document.getElementById('map-ceremony-embed').src = CONFIG.ceremony.mapEmbed;
    document.getElementById('map-ceremony-link').href = CONFIG.ceremony.mapUrl;

    // Reception
    document.getElementById('reception-address').innerHTML = `
    <strong>${CONFIG.reception.name}</strong><br>
    ${CONFIG.reception.address}<br>${CONFIG.reception.city}
  `;
    document.getElementById('map-reception-embed').src = CONFIG.reception.mapEmbed;
    document.getElementById('map-reception-link').href = CONFIG.reception.mapUrl;

    // Practical Info
    const practicalContainer = document.getElementById('practical-grid');
    if (practicalContainer && CONFIG.practicalInfo) { // Updated to practicalInfo
        practicalContainer.innerHTML = CONFIG.practicalInfo.map(item => `
      <div class="practical-card">
        <div class="practical-icon">${item.icon}</div>
        <h3 class="practical-title">${item.title}</h3>
        <p class="practical-content">${item.content}</p>
      </div>
    `).join('');
    }

    // RSVP
    document.getElementById('rsvp-deadline').textContent = CONFIG.texts.rsvpDeadline;

    // Footer
    document.getElementById('footer-date').textContent = CONFIG.event.dateFormatted;
}

function initializeCoupleSection() {
    // Populate Partner 1
    document.getElementById('partner1-name').textContent = CONFIG.couple.partner1.name;
    document.getElementById('partner1-desc').textContent = CONFIG.couple.partner1.description;
    document.getElementById('partner1-img').src = CONFIG.couple.partner1.photo;

    // Populate Partner 2
    document.getElementById('partner2-name').textContent = CONFIG.couple.partner2.name;
    document.getElementById('partner2-desc').textContent = CONFIG.couple.partner2.description;
    document.getElementById('partner2-img').src = CONFIG.couple.partner2.photo;

    // Helper to create social links
    const createSocialLinks = (containerId, socialConfig) => {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear existing
        Object.entries(socialConfig).forEach(([platform, url]) => {
            if (url) {
                const a = document.createElement('a');
                a.href = url;
                a.className = 'social-link';
                a.target = '_blank';
                // Simple mapping for icons, can be expanded
                const iconMap = {
                    instagram: '<i class="fab fa-instagram"></i>',
                    facebook: '<i class="fab fa-facebook"></i>',
                    twitter: '<i class="fab fa-twitter"></i>'
                };
                a.innerHTML = iconMap[platform] || platform;
                container.appendChild(a);
            }
        });
    };

    createSocialLinks('partner1-social', CONFIG.couple.partner1.social);
    createSocialLinks('partner2-social', CONFIG.couple.partner2.social);

    // Scroll Animation for Photos
    const photoContainer = document.querySelector('.couple-photos-container');
    const p1Photo = document.getElementById('photo-partner1');
    const p2Photo = document.getElementById('photo-partner2');

    window.addEventListener('scroll', () => {
        if (!photoContainer) return;

        const rect = photoContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress (0 when entering view, 1 when centered)
        if (rect.top < windowHeight && rect.bottom > 0) {
            const centerOffset = (windowHeight / 2) - (rect.top + rect.height / 2);
            // Move items closer as they reach center
            // Max movement: 50px
            const moveAmount = Math.min(50, Math.max(-50, centerOffset * 0.2));

            p1Photo.style.transform = `translateX(${moveAmount}px) rotate(-3deg)`;
            p2Photo.style.transform = `translateX(${-moveAmount}px) rotate(3deg)`;
        }
    });
}


// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════
function initializeScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════════════════════════════════════
// COUNTDOWN
// ═══════════════════════════════════════════════════════════════════════════════
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    // Combine date and time properly (assuming format "16 mai 2026" and "11h30")
    // Need to parse standard french date or hardcode for simplicity using ISO format if avail, but here we construct it.
    // Ideally CONFIG should have an ISO date string, but we can parse "16 mai 2026"

    const months = {
        'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
        'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
    };

    const dateParts = CONFIG.event.date.toLowerCase().split(' ');
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1]];
    const year = parseInt(dateParts[2]);

    // Parse time (e.g. "11h30")
    const timeParts = CONFIG.event.time.toLowerCase().split('h');
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1] || 0);

    const targetDate = new Date(year, month, day, hour, minute);

    function update() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff < 0) {
            countdownEl.innerHTML = '<div class="countdown-value">C\'est aujourd\'hui !</div>';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
      <div class="countdown-item">
        <span class="countdown-value">${days}</span>
        <span class="countdown-label">Jours</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${hours}</span>
        <span class="countdown-label">Heures</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${minutes}</span>
        <span class="countdown-label">Minutes</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${seconds}</span>
        <span class="countdown-label">Secondes</span>
      </div>
    `;
    }

    update();
    setInterval(update, 1000); // Update every second
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════════════════════════════════════════
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// RSVP FORM HANDLING
// ═══════════════════════════════════════════════════════════════════════════════
let formState = {
    attending: null,
    adults: 1,
    children: 0,
    babies: 0
};

function setAttending(value) {
    // Stop if already set to same value to avoid resetting inputs unnecessarily
    if (formState.attending === value) return;

    formState.attending = value;
    document.getElementById('attending').value = value;

    // Update UI
    document.getElementById('attending-yes').classList.toggle('selected', value === true);
    document.getElementById('attending-yes').classList.toggle('yes', value === true);
    document.getElementById('attending-no').classList.toggle('selected', value === false);
    document.getElementById('attending-no').classList.toggle('no', value === false);

    // Show/hide guests section
    document.getElementById('guests-section').classList.toggle('visible', value === true);
    document.getElementById('guest-names-section').classList.toggle('visible', value === true);

    if (!value) {
        // Reset values if not attending
        document.getElementById('adults').value = 1;
        document.getElementById('children').value = 0;
        document.getElementById('babies').value = 0;
    }
}

function updateGuests(delta) {
    formState.guests = Math.max(0, Math.min(5, formState.guests + delta));
    document.getElementById('guests').value = formState.guests;
    document.getElementById('guests-value').textContent = formState.guests;

    // Update buttons
    document.getElementById('guests-minus').disabled = formState.guests <= 0;
    document.getElementById('guests-plus').disabled = formState.guests >= 5;

    // Show/hide guest names
    document.getElementById('guest-names-section').classList.toggle('visible', formState.guests > 0);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════════════════════════
function loadResponses() {
    try {
        const saved = localStorage.getItem('wedding-responses');
        if (saved) {
            responses = JSON.parse(saved);
        }
    } catch (e) {
        console.log('No saved responses');
    }
}

function saveResponse(data) {
    const newResponse = {
        ...data,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
    };
    responses.push(newResponse);

    try {
        localStorage.setItem('wedding-responses', JSON.stringify(responses));
    } catch (e) {
        console.error('Storage error:', e);
    }

    return newResponse;
}

function checkDuplicate(email, phone) {
    return responses.some(r =>
        (email && r.email === email) ||
        (phone && r.phone === phone)
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════════════════════
document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        attending: formState.attending,
        adults: parseInt(document.getElementById('adults').value) || 0,
        children: parseInt(document.getElementById('children').value) || 0,
        babies: parseInt(document.getElementById('babies').value) || 0,
        guestNames: document.getElementById('guestNames').value.trim(),
        dietary: document.getElementById('dietary')?.value.trim() || '',
        message: document.getElementById('message').value.trim(),
    };

    // Validation
    if (!formData.firstName || !formData.lastName) {
        showError('Veuillez entrer votre nom complet');
        return;
    }

    if (!formData.email && !formData.phone) {
        showError('Veuillez entrer un email ou un numéro de téléphone');
        return;
    }

    if (formData.attending === null) {
        showError('Veuillez indiquer si vous serez présent(e)');
        return;
    }

    if (formData.attending && formData.adults < 1) {
        showError('Il faut au moins 1 adulte');
        return;
    }

    // Checking duplicates can be re-enabled if needed, but keeping simple for now
    // if (checkDuplicate(formData.email, formData.phone)) {
    //     showError('Une réponse a déjà été enregistrée avec cet email ou ce numéro de téléphone');
    //     return;
    // }

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    hideError();

    try {
        // Save locally
        saveResponse(formData);

        // Send to external service if configured
        if (CONFIG.formspreeUrl) {
            await fetch(CONFIG.formspreeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        }

        if (CONFIG.googleSheetsUrl) {
            await fetch(CONFIG.googleSheetsUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
        }

        // Show thank you
        showThankYou(formData);

    } catch (error) {
        console.error('Submission error:', error);
        // Still show thank you since we saved locally
        showThankYou(formData);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer ma réponse';
});

// UI Helpers
// ═══════════════════════════════════════════════════════════════════════════════

function showError(message) {
    const errorDiv = document.getElementById('form-error');
    errorDiv.textContent = message;
    errorDiv.classList.add('visible');
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideError() {
    const errorDiv = document.getElementById('form-error');
    errorDiv.classList.remove('visible');
}

function showThankYou(data) {
    const overlay = document.getElementById('thankyou-overlay');
    const summaryContent = document.getElementById('summary-content');

    // Build summary
    let html = `
    <div class="summary-item">
      <span class="summary-label">Nom</span>
      <span class="summary-value">${data.firstName} ${data.lastName}</span>
    </div>
  `;

    if (data.attending) {
        html += `
      <div class="summary-item">
        <span class="summary-label">Présence</span>
        <span class="summary-value">Oui</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Adultes</span>
        <span class="summary-value">${data.adults}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Enfants</span>
        <span class="summary-value">${data.children}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Bébés</span>
        <span class="summary-value">${data.babies}</span>
      </div>
    `;
    } else {
        html += `
      <div class="summary-item">
        <span class="summary-label">Présence</span>
        <span class="summary-value">Non</span>
      </div>
    `;
    }

    summaryContent.innerHTML = html;
    overlay.classList.add('visible');
}

function closeThankYou() {
    document.getElementById('thankyou-overlay').classList.remove('visible');
    document.getElementById('rsvp-form').reset();
    formState = { attending: null, adults: 1, children: 0, babies: 0 };
    setAttending(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
