/**
 * WOBlISK LUMINAIRE — Reusable UI Components Module
 * Common UI patterns used across all instruments
 */

// Create a scientific card component
function createScientificCard(title, contentHtml) {
  const card = document.createElement('div');
  card.className = 'rounded border border-[var(--border)] bg-[var(--bg-card)] p-4';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'font-display text-xl font-semibold uppercase tracking-wider mb-3';
  cardHeader.style.color = 'var(--accent-primary)';
  cardHeader.textContent = title;

  card.appendChild(cardHeader);

  if (contentHtml) {
    const cardContent = document.createElement('div');
    cardContent.innerHTML = contentHtml;
    card.appendChild(cardContent);
  }

  return card;
}

// Create a data label pair
function createDataLabelPair(label, value, labelClass = 'text-[var(--text-secondary)] uppercase tracking-wider text-xs', valueClass = 'text-[var(--text-primary)] font-mono text-sm') {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-1 sm-grid-cols-2 gap-2 mb-2';

  const labelEl = document.createElement('div');
  labelEl.className = labelClass;
  labelEl.textContent = label;

  const valueEl = document.createElement('div');
  valueEl.className = valueClass;
  valueEl.textContent = value;

  container.appendChild(labelEl);
  container.appendChild(valueEl);

  return container;
}

// Create a threshold control
function createThresholdControl(defaultValue = 30, onChange) {
  const container = document.createElement('div');
  container.className = 'mb-3';

  const label = document.createElement('div');
  label.className = 'text-[var(--text-secondary)] uppercase tracking-wider text-sm mb-1';
  label.textContent = 'Threshold';

  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0';
  input.max = '255';
  input.value = defaultValue;
  input.className = 'w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded py-2';
  input.addEventListener('input', (e) => {
    onChange && onChange(parseInt(e.target.value));
  });

  const valueDisplay = document.createElement('div');
  valueDisplay.className = 'text-[var(--text-secondary)] text-xs mt-1';
  valueDisplay.textContent = defaultValue;

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(valueDisplay);

  return { container, input, valueDisplay };
}

// Create a status badge
function createStatusBadge(text, isGood = true) {
  const badge = document.createElement('span');
  badge.className = `px-2 py-1 rounded text-xs uppercase tracking-wider ${
    isGood ? 'bg-[var(--success)] text-[var(--bg-primary)]' : 'bg-[var(--error)] text-[var(--bg-primary)]'
  }`;
  badge.textContent = text;
  return badge;
}

// Create a progress bar
function createProgressBar(value, max = 100, showText = true) {
  const container = document.createElement('div');
  container.className = 'mb-3';

  const barContainer = document.createElement('div');
  barContainer.className = 'w-full bg-[var(--bg-primary)] rounded-full h-2 overflow-hidden';

  const bar = document.createElement('div');
  bar.className = `h-full bg-[var(--accent-primary)] transition-width`;
  bar.style.width = `${(value / max * 100)}%`;

  barContainer.appendChild(bar);

  if (showText) {
    const text = document.createElement('span');
    text.className = 'text-[var(--text-secondary)] text-xs ml-2';
    text.textContent = `${value}/${max}`;
    container.appendChild(text);
  }

  container.appendChild(barContainer);
  return container;
}

// Export reusable functions
export { createScientificCard, createDataLabelPair, createThresholdControl, createStatusBadge, createProgressBar };