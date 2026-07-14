const root = document.documentElement;
const header = document.querySelector('[data-header]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.lucide) {
  window.lucide.createIcons();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
let ticking = false;

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  root.style.setProperty('--progress', clamp(progress, 0, 1).toFixed(4));
  root.style.setProperty('--shift', `${Math.min(window.scrollY * 0.08, 90)}px`);
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
  ticking = false;
}

function requestScrollUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScrollState);
}

window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
updateScrollState();

const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(item);
  });
}

const examples = [
  {
    source: 'Text message',
    message: 'You won a free iPhone. Send your credit card details to claim.',
    label: 'Likely scam',
    title: 'It asks for private payment info.',
    copy: 'Real prizes do not need your credit card number in a text.',
  },
  {
    source: 'Phone call',
    message: 'Do not tell your family. Read me the six-digit code now.',
    label: 'High risk',
    title: 'Secrecy plus a code is a major warning.',
    copy: 'The safest move is to hang up and call a trusted person.',
  },
  {
    source: 'Payment request',
    message: 'Buy two gift cards and send photos of the numbers.',
    label: 'Likely scam',
    title: 'Gift cards are hard to reverse.',
    copy: 'Scammers prefer payments that are fast and final.',
  },
];

const nextExample = document.querySelector('[data-next-example]');
const messageCard = document.querySelector('[data-message-card]');
const resultCard = document.querySelector('[data-result-card]');
const sourceNode = document.querySelector('[data-example-source]');
const messageNode = document.querySelector('[data-example-message]');
const labelNode = document.querySelector('[data-risk-label]');
const titleNode = document.querySelector('[data-risk-title]');
const copyNode = document.querySelector('[data-risk-copy]');
let exampleIndex = 0;

function renderExample(index) {
  const example = examples[index % examples.length];
  messageCard?.classList.add('is-changing');
  resultCard?.classList.add('is-changing');

  window.setTimeout(
    () => {
      if (sourceNode) sourceNode.textContent = example.source;
      if (messageNode) messageNode.textContent = example.message;
      if (labelNode) labelNode.textContent = example.label;
      if (titleNode) titleNode.textContent = example.title;
      if (copyNode) copyNode.textContent = example.copy;
      messageCard?.classList.remove('is-changing');
      resultCard?.classList.remove('is-changing');
    },
    prefersReducedMotion ? 0 : 220,
  );
}

nextExample?.addEventListener('click', () => {
  exampleIndex = (exampleIndex + 1) % examples.length;
  renderExample(exampleIndex);
});

const lessons = {
  'Bank scam': {
    prompt: 'Your bank account is locked. Tap this link now to confirm your login.',
    answer: 'Suspicious link. Call the bank from the card.',
  },
  'Grandparent scam': {
    prompt: 'Grandma, I am in trouble. Please send money and do not tell Mom.',
    answer: 'Secrecy and urgent money pressure are the red flags.',
  },
  'Tech support': {
    prompt: 'Microsoft found a virus. Install this remote access app right now.',
    answer: 'Do not give remote access to someone who called you.',
  },
};

const lessonButtons = document.querySelectorAll('[data-lesson]');
const lessonPrompt = document.querySelector('[data-lesson-prompt]');
const lessonAnswer = document.querySelector('[data-lesson-answer]');

lessonButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const lesson = lessons[button.dataset.lesson];
    if (!lesson) return;

    lessonButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    if (lessonPrompt) lessonPrompt.textContent = lesson.prompt;
    if (lessonAnswer) lessonAnswer.textContent = lesson.answer;
  });
});
