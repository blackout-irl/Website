const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.site-header');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

body.classList.add('is-loading');

if (window.lucide) {
  window.lucide.createIcons();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const loadCount = document.querySelector('[data-load-count]');
let loadComplete = false;

function finishLoading() {
  if (loadComplete) return;
  loadComplete = true;

  if (prefersReducedMotion) {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    if (loadCount) loadCount.textContent = '100';
    return;
  }

  const started = performance.now();
  const duration = 900;

  function tick(now) {
    const progress = clamp((now - started) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    if (loadCount) loadCount.textContent = String(Math.round(eased * 100)).padStart(2, '0');

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      body.classList.remove('is-loading');
      body.classList.add('is-ready');
    }
  }

  requestAnimationFrame(tick);
}

window.addEventListener('load', finishLoading, { once: true });
window.setTimeout(finishLoading, 1400);

let ticking = false;

function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  const heroShift = Math.min(window.scrollY * 0.12, 70);
  root.style.setProperty('--progress', clamp(progress, 0, 1).toFixed(4));
  root.style.setProperty('--hero-y', `${heroShift}px`);
  root.style.setProperty('--hero-scale', `${1.04 + Math.min(window.scrollY / 8000, 0.035)}`);
  root.style.setProperty('--float-y', `${Math.sin(window.scrollY / 420) * 14}px`);
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updatePageState);
    ticking = true;
  }
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
updatePageState();

const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    revealObserver.observe(item);
  });
}

const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack && !prefersReducedMotion) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

const stepNodes = [...document.querySelectorAll('[data-step]')];
const statusLabel = document.querySelector('[data-status-label]');
const statusTitle = document.querySelector('[data-status-title]');
const phoneStatus = document.querySelector('.phone-status');
let statusTimer = 0;

function activateStep(step) {
  stepNodes.forEach((node) => node.classList.toggle('is-active', node === step));

  if (!step || !statusLabel || !statusTitle) return;

  const nextLabel = step.dataset.label || '';
  const nextTitle = step.dataset.title || '';
  phoneStatus?.classList.add('is-changing');
  window.clearTimeout(statusTimer);

  statusTimer = window.setTimeout(() => {
    statusLabel.textContent = nextLabel;
    statusTitle.textContent = nextTitle;
    phoneStatus?.classList.remove('is-changing');
  }, prefersReducedMotion ? 0 : 170);
}

if (stepNodes.length) {
  const stepObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visible) activateStep(visible.target);
    },
    { threshold: [0.36, 0.54, 0.72], rootMargin: '-20% 0px -34% 0px' },
  );

  stepNodes.forEach((step) => stepObserver.observe(step));
}

const examples = [
  {
    label: 'Message check',
    title: 'Very likely scam',
    copy: 'Prize claim asks for credit card details.',
  },
  {
    label: 'Call check',
    title: 'Stop and verify',
    copy: 'Caller asked for a code and said not to tell anyone.',
  },
  {
    label: 'Payment check',
    title: 'High risk',
    copy: 'Gift cards and crypto are hard to reverse.',
  },
];

const resultStrip = document.querySelector('.result-strip');
const resultLabel = document.querySelector('[data-result-label]');
const resultTitle = document.querySelector('[data-result-title]');
const resultCopy = document.querySelector('[data-result-copy]');
const resultNext = document.querySelector('[data-result-next]');
let exampleIndex = 0;

function showExample(index) {
  const example = examples[index % examples.length];
  resultStrip?.classList.add('is-changing');

  window.setTimeout(() => {
    if (resultLabel) resultLabel.textContent = example.label;
    if (resultTitle) resultTitle.textContent = example.title;
    if (resultCopy) resultCopy.textContent = example.copy;
    resultStrip?.classList.remove('is-changing');
  }, prefersReducedMotion ? 0 : 160);
}

resultNext?.addEventListener('click', () => {
  exampleIndex = (exampleIndex + 1) % examples.length;
  showExample(exampleIndex);
});

const statNodes = document.querySelectorAll('[data-count]');

function animateNumber(node) {
  const target = Number(node.dataset.count || 0);
  const started = performance.now();
  const duration = 1000;

  function tick(now) {
    const progress = clamp((now - started) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased).toLocaleString();

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (prefersReducedMotion) {
  statNodes.forEach((node) => {
    node.textContent = Number(node.dataset.count || 0).toLocaleString();
  });
} else {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 },
  );

  statNodes.forEach((node) => statObserver.observe(node));
}
