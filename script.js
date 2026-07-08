const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.lucide) {
  window.lucide.createIcons();
}

const scrollLine = document.querySelector('.scroll-line');
const updateScrollLine = () => {
  if (!scrollLine) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollLine.style.width = `${Math.max(0, Math.min(1, progress)) * 100}%`;
};

window.addEventListener('scroll', updateScrollLine, { passive: true });
updateScrollLine();

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach((item) => {
  if (prefersReducedMotion) {
    item.classList.add('in-view');
  } else {
    revealObserver.observe(item);
  }
});

const stats = document.querySelectorAll('[data-count]');
const animateNumber = (node) => {
  const target = Number(node.dataset.count || 0);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 },
);

stats.forEach((stat) => {
  if (prefersReducedMotion) {
    stat.textContent = Number(stat.dataset.count || 0).toLocaleString();
  } else {
    statsObserver.observe(stat);
  }
});

const alertTrack = document.querySelector('.alert-track');
if (alertTrack) {
  alertTrack.innerHTML += alertTrack.innerHTML;
}
