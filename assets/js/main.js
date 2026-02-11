// ═══════════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════════
let responses = [];
let formState = {
    attending: null,
    adults: 1,
    children: 0,
    babies: 0
};
let musicState = {
    isPlaying: false,
    audio: null
};

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initializeContent();
    initializeCoupleSection();
    initializeScrollReveal();
    initializeNavbar();
    loadResponses();

    // New Features
    initializeMusic();
    initializeCalendar();
    initializeStory();
    initializeGallery();
    initializeFAQ();
});

function initializeContent() {
    // Hero
    document.getElementById('hero-date').textContent = CONFIG.event.dateFormatted;
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

    // Dress Code with Colors
    let colorDots = '';
    if (CONFIG.dressCode.colors) {
        colorDots = CONFIG.dressCode.colors.map(color => `
            <div class="color-swatch" style="background-color: ${color.code}" title="${color.name}"></div>
        `).join('');
    }

    const dressCodeContainer = document.getElementById('dresscode-colors');
    if (dressCodeContainer) {
        dressCodeContainer.innerHTML = colorDots;
    }

    // Start Countdown
    startCountdown();

    // Program
    const programHTML = CONFIG.program.map(item => `
    <div class="program-item reveal">
      <div class="program-time">${item.time}</div>
      <div class="program-dot"></div>
      <div class="program-event">${item.icon} ${item.event}</div>
    </div>
  `).join('');
    document.getElementById('program-timeline').innerHTML = programHTML;

    // Maps
    document.getElementById('ceremony-address').innerHTML = `
    <strong>${CONFIG.ceremony.name}</strong><br>
    ${CONFIG.ceremony.address}<br>${CONFIG.ceremony.city}
  `;
    document.getElementById('map-ceremony-embed').src = CONFIG.ceremony.mapEmbed;
    document.getElementById('map-ceremony-link').href = CONFIG.ceremony.mapUrl;

    document.getElementById('reception-address').innerHTML = `
    <strong>${CONFIG.reception.name}</strong><br>
    ${CONFIG.reception.address}<br>${CONFIG.reception.city}
  `;
    document.getElementById('map-reception-embed').src = CONFIG.reception.mapEmbed;
    document.getElementById('map-reception-link').href = CONFIG.reception.mapUrl;

    // Practical
    if (CONFIG.practical) {
        const practicalHTML = CONFIG.practical.map(item => `
    <div class="practical-item reveal">
      <div class="practical-icon">${item.icon}</div>
      <h4 class="practical-title">${item.title}</h4>
      <p class="practical-text">${item.text}</p>
    </div>
  `).join('');
        document.getElementById('practical-grid').innerHTML = practicalHTML;
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
        container.innerHTML = '';
        Object.entries(socialConfig).forEach(([platform, url]) => {
            if (url) {
                const a = document.createElement('a');
                a.href = url;
                a.className = 'social-link';
                a.target = '_blank';
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

    // Photos Animation
    const photoContainer = document.querySelector('.couple-photos-container');
    const p1Photo = document.getElementById('photo-partner1');
    const p2Photo = document.getElementById('photo-partner2');

    window.addEventListener('scroll', () => {
        if (!photoContainer) return;
        const rect = photoContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const centerOffset = (windowHeight / 2) - (rect.top + rect.height / 2);
            const moveAmount = Math.min(50, Math.max(-50, centerOffset * 0.2));
            p1Photo.style.transform = `translateX(${-moveAmount}px) rotate(3deg)`;
            p2Photo.style.transform = `translateX(${moveAmount}px) rotate(-3deg)`;
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW FEATURES
// ═══════════════════════════════════════════════════════════════════════════════

function initializeMusic() {
    if (!CONFIG.music || !CONFIG.music.enabled) return;

    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    const container = document.getElementById('music-control');

    if (!audio || !btn) return;

    audio.src = CONFIG.music.source;
    audio.volume = CONFIG.music.volume || 0.5;
    musicState.audio = audio;

    // Show button
    container.style.display = 'flex';

    btn.addEventListener('click', () => {
        if (musicState.isPlaying) {
            audio.pause();
            musicState.isPlaying = false;
            btn.innerHTML = '🎵';
            btn.classList.remove('playing');
        } else {
            audio.play().then(() => {
                musicState.isPlaying = true;
                btn.innerHTML = '⏸';
                btn.classList.add('playing');
            }).catch(e => console.log('Playback failed', e));
        }
    });

    if (CONFIG.music.autoplay) {
        // Try autoplay (might be blocked)
        audio.play().catch(() => {
            console.log('Autoplay blocked');
        });
    }
}

function initializeCalendar() {
    const btn = document.getElementById('addToCalendarBtn');
    const dropdown = document.getElementById('calendarDropdown');

    if (!btn || !dropdown) return;

    // Google Calendar Link
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    // Needs proper parsing of config date strings which is hard without a library
    // For now using a placeholder logic or assuming the user sets ISO dates in a real app
    // Here we will use a generic link structure
    const eventParams = new URLSearchParams({
        action: 'TEMPLATE',
        text: `Mariage ${CONFIG.couple.partner1.name} & ${CONFIG.couple.partner2.name}`,
        dates: '20260516T113000/20260517T020000', // Hardcoded date based on config
        details: CONFIG.texts.heroInvitation,
        location: CONFIG.venue ? CONFIG.venue.address : CONFIG.ceremony.address,
    });

    const googleLink = `https://calendar.google.com/calendar/render?${eventParams.toString()}`;

    dropdown.innerHTML = `
        <a href="${googleLink}" target="_blank">Google Calendar</a>
        <a href="#" onclick="downloadICS(event)">Apple / Outlook (.ics)</a>
    `;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('visible');
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('visible');
    });
}

// Global scope for onclick
window.downloadICS = function (e) {
    e.preventDefault();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:20260516T113000
DTEND:20260517T020000
SUMMARY:Mariage ${CONFIG.couple.partner1.name} & ${CONFIG.couple.partner2.name}
DESCRIPTION:${CONFIG.texts.heroInvitation}
LOCATION:${CONFIG.ceremony.address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'mariage.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function initializeStory() {
    const container = document.getElementById('story-timeline');
    if (!container || !CONFIG.story) return;

    const html = CONFIG.story.map((item, index) => `
        <div class="story-item reveal ${index % 2 === 0 ? 'left' : 'right'}">
            <div class="story-content">
                <div class="story-year">${item.year}</div>
                <div class="story-icon">${item.icon}</div>
                <h3 class="story-title">${item.title}</h3>
                <p class="story-text">${item.text}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

function initializeGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !CONFIG.gallery) return;

    const html = CONFIG.gallery.map(img => `
        <div class="gallery-item reveal">
            <img src="${img}" alt="Gallery Image" loading="lazy">
        </div>
    `).join('');

    container.innerHTML = html;
}

function initializeFAQ() {
    const container = document.getElementById('faq-container');
    if (!container || !CONFIG.faq) return;

    const html = CONFIG.faq.map(item => `
        <div class="faq-item reveal">
            <div class="faq-question">
                <span>${item.question}</span>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;

    // Event listeners for accordion
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle');
            toggle.textContent = parent.classList.contains('active') ? '-' : '+';
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// UI & UTILS
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

function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    // Simplified parsing assuming "16 mai 2026"
    const months = { 'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11 };

    const dateParts = CONFIG.event.date.toLowerCase().split(' ');
    const day = parseInt(dateParts[0]);
    const month = months[dateParts[1]];
    const year = parseInt(dateParts[2]);
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
      <div class="countdown-item"><span class="countdown-value">${days}</span><span class="countdown-label">Jours</span></div>
      <div class="countdown-item"><span class="countdown-value">${hours}</span><span class="countdown-label">Heures</span></div>
      <div class="countdown-item"><span class="countdown-value">${minutes}</span><span class="countdown-label">Minutes</span></div>
      <div class="countdown-item"><span class="countdown-value">${seconds}</span><span class="countdown-label">Secondes</span></div>
    `;
    }

    update();
    setInterval(update, 1000);
}

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
// FORM LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

function setAttending(value) {
    if (formState.attending === value) return;
    formState.attending = value;
    document.getElementById('attending').value = value;

    document.getElementById('attending-yes').classList.toggle('selected', value === true);
    document.getElementById('attending-yes').classList.toggle('yes', value === true);
    document.getElementById('attending-no').classList.toggle('selected', value === false);
    document.getElementById('attending-no').classList.toggle('no', value === false);

    document.getElementById('guests-section').classList.toggle('visible', value === true);
    document.getElementById('guest-names-section').classList.toggle('visible', value === true);

    if (!value) {
        document.getElementById('adults').value = 1;
        document.getElementById('children').value = 0;
        document.getElementById('babies').value = 0;
    }
}

function loadResponses() {
    try {
        const saved = localStorage.getItem('wedding-responses');
        if (saved) responses = JSON.parse(saved);
    } catch (e) { console.log('No saved responses'); }
}

function saveResponse(data) {
    const newResponse = { ...data, id: Date.now(), submittedAt: new Date().toISOString() };
    responses.push(newResponse);
    try { localStorage.setItem('wedding-responses', JSON.stringify(responses)); }
    catch (e) { console.error('Storage error:', e); }
    return newResponse;
}

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');

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

    if (!formData.firstName || !formData.lastName) { showError('Veuillez entrer votre nom complet'); return; }
    if (!formData.email && !formData.phone) { showError('Veuillez entrer un email ou un numéro de téléphone'); return; }
    if (formData.attending === null) { showError('Veuillez indiquer si vous serez présent(e)'); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    hideError();

    try {
        saveResponse(formData);
        if (CONFIG.formspreeUrl) {
            await fetch(CONFIG.formspreeUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        }
        if (CONFIG.googleSheetsUrl) {
            await fetch(CONFIG.googleSheetsUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(formData) });
        }
        showThankYou(formData);
    } catch (error) {
        console.error('Submission error:', error);
        showThankYou(formData);
    }
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer ma réponse';
});

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

    let html = `<div class="summary-item"><span class="summary-label">Nom</span><span class="summary-value">${data.firstName} ${data.lastName}</span></div>`;
    if (data.attending) {
        html += `<div class="summary-item"><span class="summary-label">Présence</span><span class="summary-value">Oui</span></div>
                 <div class="summary-item"><span class="summary-label">Adultes</span><span class="summary-value">${data.adults}</span></div>`;
    } else {
        html += `<div class="summary-item"><span class="summary-label">Présence</span><span class="summary-value">Non</span></div>`;
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
