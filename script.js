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

  if (nav) {
    nav.classList.toggle('is-scrolled', window.scrollY > 18);
  }
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
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
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

const signalTrack = document.querySelector('.signal-track');
if (signalTrack && !prefersReducedMotion) {
  signalTrack.innerHTML += signalTrack.innerHTML;
}

const phoneCards = [...document.querySelectorAll('[data-phone-card]')];
const riskRing = document.querySelector('.risk-ring');
const scoreOutput = document.querySelector('[data-score-output]');
const phoneScores = [92, 86, 78];
let activePhoneCard = 0;

const setPhoneCard = (index) => {
  phoneCards.forEach((card, cardIndex) => {
    card.classList.toggle('is-active', cardIndex === index);
  });

  const score = phoneScores[index] ?? phoneScores[0];
  if (riskRing) {
    riskRing.style.setProperty('--score', `${score}%`);
  }
  if (scoreOutput) {
    scoreOutput.textContent = `${score}%`;
  }
};

if (phoneCards.length) {
  setPhoneCard(0);

  if (!prefersReducedMotion) {
    window.setInterval(() => {
      activePhoneCard = (activePhoneCard + 1) % phoneCards.length;
      setPhoneCard(activePhoneCard);
    }, 2700);
  }
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
      const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
      item.style.transform = `translate(${x}px, ${y}px)`;
    });

    item.addEventListener('pointerleave', () => {
      item.style.transform = '';
    });
  });
}
