const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.lab-header');
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
    body.classList.add('is-ready', 'story-started');
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

function startExperience() {
  body.classList.add('story-started');
}

document.querySelector('[data-start-button]')?.addEventListener('click', startExperience);
document.querySelector('[data-start-gate]')?.addEventListener('click', (event) => {
  if (event.target.closest('button')) return;
  startExperience();
});

let ticking = false;

function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  const sceneShift = Math.min(window.scrollY * 0.1, 82);
  root.style.setProperty('--progress', clamp(progress, 0, 1).toFixed(4));
  root.style.setProperty('--scene-shift', `${sceneShift}px`);
  root.style.setProperty('--scene-scale', `${1.05 + Math.min(window.scrollY / 11000, 0.035)}`);
  root.style.setProperty('--float-y', `${Math.sin(window.scrollY / 390) * 16}px`);
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
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
    { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
}

const chapters = [...document.querySelectorAll('[data-chapter]')];
const chapterLinks = [...document.querySelectorAll('[data-chapter-link]')];
const currentKicker = document.querySelector('[data-current-kicker]');
const currentRoman = document.querySelector('[data-current-roman]');
const currentTitle = document.querySelector('[data-current-title]');

function activateChapter(chapter) {
  if (!chapter) return;
  const chapterId = chapter.dataset.chapter;
  chapterLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.chapterLink === chapterId));
  if (currentKicker) currentKicker.textContent = chapter.dataset.kicker || '';
  if (currentRoman) currentRoman.textContent = chapter.dataset.roman || '';
  if (currentTitle) currentTitle.textContent = chapter.dataset.title || '';
  body.dataset.activeChapter = chapterId;
}

if (chapters.length) {
  activateChapter(chapters[0]);

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visible) activateChapter(visible.target);
    },
    { threshold: [0.22, 0.38, 0.56], rootMargin: '-18% 0px -28% 0px' },
  );

  chapters.forEach((chapter) => chapterObserver.observe(chapter));
}

const examples = [
  {
    title: 'Very likely scam',
    copy: 'Prize claim asks for credit card details.',
  },
  {
    title: 'Stop and verify',
    copy: 'Caller asked for a code and said not to tell anyone.',
  },
  {
    title: 'High risk',
    copy: 'Payment request uses gift cards and urgency.',
  },
];

const caseNext = document.querySelector('[data-case-next]');
const resultTitle = document.querySelector('[data-result-title]');
const resultCopy = document.querySelector('[data-result-copy]');
const phoneReadout = document.querySelector('.phone-readout');
let exampleIndex = 0;

function showExample(index) {
  const example = examples[index % examples.length];
  phoneReadout?.classList.add('is-changing');

  window.setTimeout(() => {
    if (resultTitle) resultTitle.textContent = example.title;
    if (resultCopy) resultCopy.textContent = example.copy;
    phoneReadout?.classList.remove('is-changing');
  }, prefersReducedMotion ? 0 : 170);
}

caseNext?.addEventListener('click', () => {
  exampleIndex = (exampleIndex + 1) % examples.length;
  showExample(exampleIndex);
});

const soundToggle = document.querySelector('[data-sound-toggle]');
soundToggle?.addEventListener('click', () => {
  const isQuiet = soundToggle.getAttribute('aria-pressed') !== 'false';
  soundToggle.setAttribute('aria-pressed', String(!isQuiet));
  soundToggle.textContent = isQuiet ? 'Ambient off' : 'Quiet mode';
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
