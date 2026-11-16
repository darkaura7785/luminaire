/**
 * WOBlISK LUMINAIRE — Navigation Module
 * Persistent header, instrument switching, breadcrumb management
 */

// Instrument directory configuration (number, name, icon, page)
const INSTRUMENT_DIRECTORY = [
  { number: '00', name: 'KEPLER ORRERY', icon: 'corner-up-left', page: 'orrery.html' },
  { number: '01', name: 'ANOMALY HUNTER', icon: 'scan-search', page: 'anomaly.html' },
  { number: '02', name: 'MISSION SURVIVAL', icon: 'shield-check', page: 'mission.html' },
  { number: '03', name: 'LANDING SITES', icon: 'map-pin', page: 'landing.html' },
  { number: '04', name: 'DISCOVERY ENGINE', icon: 'microscope', page: 'discovery.html' },
  { number: '05', name: 'TONIGHT\'S SKY', icon: 'star', page: 'sky.html' },
  { number: '06', name: 'MARSWALK PLANNER', icon: 'map', page: 'marswalk.html' }
];

// Set the current instrument indicator in the header
function setCurrentInstrument(instrumentNumber) {
  // Update the highlighted pill in the header
  const pillsContainer = document.getElementById('instrument-pills');
  if (pillsContainer) {
    // Remove existing pill highlights
    pillsContainer.querySelectorAll('.instrument-pill').forEach(pill => {
      pill.classList.remove('font-bold', 'accent-primary');
      pill.classList.add('text-secondary');
    });
  }

  // Highlight current instrument
  const currentPill = document.querySelector(`[data-instrument="${instrumentNumber}"]`);
  if (currentPill) {
    currentPill.classList.remove('text-secondary');
    currentPill.classList.add('font-bold', 'accent-primary');
  }

  // Update breadcrumb
  const breadcrumbLinks = document.querySelectorAll('nav a');
  const currentIndex = INSTRUMENT_DIRECTORY.findIndex(inst => inst.number === instrumentNumber);

  breadcrumbLinks.forEach((link, index) => {
    if (index === 0) {
      // Home link
      link.classList.toggle('text-primary', index === 0 && instrumentNumber !== 'home');
    } else if (index === breadcrumbLinks.length - 1) {
      // Current instrument
      const isCurrent = index - 1 === currentIndex;
      link.classList.toggle('text-primary', isCurrent);
      link.classList.toggle('text-secondary', !isCurrent);
    }
  });
}

// Generate instrument pills navigation
function generateInstrumentPills() {
  const container = document.getElementById('instrument-pills');
  if (!container) return;

  container.innerHTML = '';

  INSTRUMENT_DIRECTORY.forEach((inst, index) => {
    const pill = document.createElement('span');
    pill.className = `text-sm font-mono px-2 py-1 rounded bg-[var(--bg-card)] text-[var(--text-secondary)] transition-colors cursor-pointer ${index === 0 ? 'font-bold accent-primary' : 'text-secondary'}`;
    pill.setAttribute('data-instrument', inst.number);
    pill.dataset.page = inst.page;
    pill.textContent = `${inst.number} — ${inst.name}`;

    pill.addEventListener('click', () => {
      // Navigate to the instrument page
      const newPage = inst.page;
      // Remove .html extension for relative link, or keep as is
      window.location.href = newPage;
    });

    container.appendChild(pill);
  });
}

// Update breadcrumb based on current page
function updateBreadcrumb() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const instrumentNumber = INSTRUMENT_DIRECTORY.find(inst => inst.page === path)?.number;

  if (instrumentNumber) {
    setCurrentInstrument(instrumentNumber);
  } else {
    // Default to home state
    document.querySelectorAll('[data-instrument]').forEach(pill => {
      pill.classList.remove('font-bold', 'accent-primary');
      pill.classList.add('text-secondary');
    });
  }
}

// Initialize navigation on DOM load
document.addEventListener('DOMContentLoaded', () => {
  generateInstrumentPills();
  updateBreadcrumb();

  // Handle instrument pill clicks for non-active pages
  // (On initial load, clicking a pill navigates to that instrument)
  document.querySelectorAll('[data-instrument]').forEach(pill => {
    pill.addEventListener('click', (e) => {
      // Allow navigation - the click handler on the pill already does this
    });
  });
});

// Export for use in other modules
export { INSTRUMENT_DIRECTORY, setCurrentInstrument, generateInstrumentPills, updateBreadcrumb };