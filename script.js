const root = document.documentElement;
const header = document.querySelector('.site-header');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.lucide) {
  window.lucide.createIcons();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  root.style.setProperty('--progress', clamp(progress, 0, 1).toFixed(4));
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
}

window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);
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
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(item);
  });
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

const resultLabel = document.querySelector('[data-result-label]');
const resultTitle = document.querySelector('[data-result-title]');
const resultCopy = document.querySelector('[data-result-copy]');
const resultNext = document.querySelector('[data-result-next]');
let exampleIndex = 0;

function showExample(index) {
  const example = examples[index % examples.length];
  if (resultLabel) resultLabel.textContent = example.label;
  if (resultTitle) resultTitle.textContent = example.title;
  if (resultCopy) resultCopy.textContent = example.copy;
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

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
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
