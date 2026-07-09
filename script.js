const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const nav = document.querySelector('.site-nav');

if (window.lucide) {
  window.lucide.createIcons();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const updateScrollState = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  root.style.setProperty('--progress', clamp(progress, 0, 1).toFixed(4));
  nav?.classList.toggle('is-scrolled', window.scrollY > 18);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState);
updateScrollState();

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
    item.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
    revealObserver.observe(item);
  });
}

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack && !prefersReducedMotion) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

const demos = [
  {
    title: 'Very likely scam',
    copy: 'Prize claim asks for credit card details.',
  },
  {
    title: 'Stop and verify',
    copy: 'Caller asked for a code and secrecy.',
  },
  {
    title: 'High-risk payment',
    copy: 'Gift cards and crypto are common scam requests.',
  },
];

const demoTitle = document.querySelector('[data-demo-title]');
const demoCopy = document.querySelector('[data-demo-copy]');
const demoButton = document.querySelector('[data-demo-button]');
let demoIndex = 0;

const setDemo = (index) => {
  const demo = demos[index % demos.length];
  if (demoTitle) demoTitle.textContent = demo.title;
  if (demoCopy) demoCopy.textContent = demo.copy;
};

demoButton?.addEventListener('click', () => {
  demoIndex = (demoIndex + 1) % demos.length;
  setDemo(demoIndex);
});

if (!prefersReducedMotion) {
  window.setInterval(() => {
    demoIndex = (demoIndex + 1) % demos.length;
    setDemo(demoIndex);
  }, 3600);
}

const stats = document.querySelectorAll('[data-count]');

const animateNumber = (node) => {
  const target = Number(node.dataset.count || 0);
  const duration = 1150;
  const start = performance.now();

  const tick = (now) => {
    const progress = clamp((now - start) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if (prefersReducedMotion) {
  stats.forEach((stat) => {
    stat.textContent = Number(stat.dataset.count || 0).toLocaleString();
  });
} else {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.46 },
  );

  stats.forEach((stat) => statsObserver.observe(stat));
}

const tiltItems = document.querySelectorAll('[data-tilt]');

if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  tiltItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      item.style.setProperty('--ry', `${clamp(x * 7, -7, 7)}deg`);
      item.style.setProperty('--rx', `${clamp(y * -7, -7, 7)}deg`);
    });

    item.addEventListener('pointerleave', () => {
      item.style.setProperty('--ry', '0deg');
      item.style.setProperty('--rx', '0deg');
    });
  });
}

const magneticItems = document.querySelectorAll('.magnetic');

if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  magneticItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });

    item.addEventListener('pointerleave', () => {
      item.style.transform = '';
    });
  });
}
