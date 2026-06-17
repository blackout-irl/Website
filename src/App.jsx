import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const images = {
  algae: "/images/algae-bloom-hero.png",
  map: "/images/melbourne-runoff-map.png",
  lagoon: "/images/irl-hobe-sound-fws.jpg",
  tidal: "/images/irl-blowing-rocks-usgs.jpg",
  shore: "/images/irl-peaceful-shore-nara.jpg",
  eauGallie: "/images/irl-eau-gallie-usgs.jpg",
  drain: "/images/storm-drain-rain.png",
  curb: "/images/hero-street-drain.png",
  marker: "/images/field-marker-drain.png",
};

const lagoonPhotos = [
  {
    image: images.lagoon,
    label: "Hobe Sound refuge",
    text: "Open Indian River Lagoon water.",
  },
  {
    image: images.eauGallie,
    label: "Eau Gallie reach",
    text: "A lagoon reach near Melbourne.",
  },
  {
    image: images.tidal,
    label: "Tidal flats",
    text: "Shallow water, sensitive habitat.",
  },
];

const pollutants = ["fertilizer", "pet waste", "grass clippings", "oil and dirt", "extra nutrients", "algae growth"];

const pollutantPositions = [
  { left: "8%", top: "15%", transform: "rotate(-2deg)" },
  { left: "32%", top: "10%", transform: "rotate(3deg)" },
  { left: "50%", top: "18%", transform: "rotate(-3deg)" },
  { left: "15%", top: "35%", transform: "rotate(-2deg)" },
  { left: "39%", top: "39%", transform: "rotate(2deg)" },
  { left: "53%", top: "31%", transform: "rotate(-4deg)" },
];

const trailSteps = [
  { number: "01", title: "Street", text: "Rain lifts debris.", x: 10.42, y: 48.88 },
  { number: "02", title: "Drain", text: "No filter.", x: 34.36, y: 54.86 },
  { number: "03", title: "Pipe", text: "Underground flow.", x: 49.22, y: 56.42 },
  { number: "04", title: "Outfall", text: "Shoreline exit.", x: 65.67, y: 62.82 },
  { number: "05", title: "Lagoon", text: "The water arrives.", x: 73.9, y: 70.22 },
];

const pageLinks = [
  ["/", "Home"],
  ["/problem", "Runoff"],
  ["/storm-drains", "Route"],
  ["/mission", "Plan"],
  ["/impact", "Impact"],
  ["/team", "Team"],
  ["/survey", "Survey"],
];

const missionSteps = [
  {
    number: "01",
    verb: "Mark",
    title: "Mark storm drains.",
    stat: "50-75 drains",
    text: "Put the message at the curb.",
    x: "5%",
    y: "18%",
  },
  {
    number: "02",
    verb: "Reach",
    title: "Reach homes.",
    stat: "300-500 households",
    text: "Door hangers and a quick survey.",
    x: "36%",
    y: "8%",
  },
  {
    number: "03",
    verb: "Show",
    title: "Show the demo.",
    stat: "4-6 demos",
    text: "Clean water vs. runoff.",
    x: "18%",
    y: "54%",
  },
  {
    number: "04",
    verb: "Log",
    title: "Log the work.",
    stat: "1 archive",
    text: "Photos, locations, notes.",
    x: "58%",
    y: "43%",
  },
];

const fieldPanels = [
  {
    label: "Drain marking",
    image: images.marker,
    stat: "50-75",
    title: "Mark the drain.",
    text: "Make the connection visible.",
  },
  {
    label: "Neighborhood wave",
    image: images.eauGallie,
    stat: "300-500",
    title: "Reach homes.",
    text: "One clear message.",
  },
  {
    label: "Classroom ripple",
    image: images.tidal,
    stat: "4-6",
    title: "Teach the demo.",
    text: "Show where runoff goes.",
  },
  {
    label: "App archive",
    image: images.shore,
    stat: "1 handoff",
    title: "Leave a trail.",
    text: "Map, photos, survey.",
  },
];

const team = [
  ["Faizan Ahmed", "Project lead", "Report and timeline."],
  ["Kairav Kumar", "Field lead", "Routes and photos."],
  ["Sankeerth Reddy Keisreddy", "Outreach lead", "Door hangers and surveys."],
  ["Prithiv Ponnusamy", "Education lead", "Classroom demo."],
  ["Aryan Pattu", "App/data lead", "App log and charts."],
];

const problemStats = [
  ["No treatment", "Street water moves through."],
  ["Nutrients", "Fertilizer feeds runoff."],
  ["Cloudy water", "Algae blocks light."],
  ["Local action", "Start before the drain."],
];

const runoffChain = [
  ["01", "Rain starts", "Across lawn and street."],
  ["02", "Runoff forms", "It carries what is there."],
  ["03", "Drain collects", "The inlet is not a filter."],
  ["04", "Lagoon receives", "The path ends in water."],
];

const missionBlueprint = [
  ["Mark", "50-75 drains."],
  ["Inform", "300-500 households."],
  ["Educate", "Classroom demos."],
  ["Log", "App and archive."],
];

const stormDrainSpecs = [
  ["Target", "50-75 drains", "Neighborhood drains."],
  ["Proof", "Photo + GPS", "Before and after."],
  ["Message", "No dumping", "This drain connects to water."],
];

const fieldDatabase = [
  ["drain_id", "ID", "Marked drain."],
  ["lat / lon", "GPS", "Location."],
  ["photo", "file", "Before and after."],
  ["notes", "text", "Field notes."],
];

const campaignTimeline = [
  ["Before", "Pick drains and prep survey."],
  ["During", "Mark, teach, reach."],
  ["After", "Archive and hand off."],
];

const impactEvidence = [
  ["Surveys", "What people learned."],
  ["Drain archive", "Photos and GPS."],
  ["Classroom proof", "Demo photos and counts."],
  ["App log", "Reports in one place."],
  ["Handoff", "Files the next group can use."],
];

const surveyPlan = [
  ["Pre-survey", "Before outreach."],
  ["Post-survey", "After outreach."],
  ["QR access", "Fast on a phone."],
  ["Result", "Knowledge change."],
];

const teamResponsibilities = [
  ["Project lead", "Timeline and report."],
  ["Field operations", "Routes and photos."],
  ["Outreach", "Door hangers and surveys."],
  ["Education", "Classroom demo."],
  ["App & data", "Survey and archive."],
];

function Cursor() {
  return (
    <div className="cursor-dot" aria-hidden="true">
      <span className="cursor-ring" />
    </div>
  );
}

function OceanFluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false });
    if (!canvas || !gl || reduced) return undefined;

    const vertexSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform float uTime;
      uniform float uPointerActive;
      uniform float uScroll;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amp * noise(p);
          p = p * 2.02 + vec2(17.4, 9.2);
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        float t = uTime * 0.22;
        float scroll = uScroll * 0.0012;

        vec2 drift = vec2(
          fbm(uv * 2.15 + vec2(t * 0.62 + scroll, -t * 0.24)),
          fbm(uv * 2.55 + vec2(-t * 0.28, t * 0.5 + scroll * 0.8))
        ) - 0.5;

        vec2 flowUv = uv + drift * 0.18;
        float broad = fbm(flowUv * 1.65 + vec2(t * 0.9, -t * 0.56 + scroll));
        float fine = fbm(flowUv * 6.8 + vec2(-t * 1.5, t * 1.14));
        float vein = sin((flowUv.x * 6.2 + flowUv.y * 13.5) + broad * 4.4 + t * 5.4);
        float silk = sin((flowUv.y + broad * 0.3) * 31.0 + t * 7.2 + sin(flowUv.x * 11.0) * 0.6);
        float surface = smoothstep(0.16, 0.9, broad * 0.58 + fine * 0.28 + silk * 0.1);

        vec2 pointer = vec2(uPointer.x, 1.0 - uPointer.y);
        vec2 mp = vec2((uv.x - pointer.x) * aspect, uv.y - pointer.y);
        float d = length(mp);
        float wake = sin(d * 74.0 - uTime * 8.4) * exp(-d * 10.0) * uPointerActive;
        float splat = smoothstep(0.28, 0.0, d) * uPointerActive;
        float current = smoothstep(0.18, 0.92, surface + vein * 0.08 + max(wake, 0.0) * 0.35);

        vec3 abyss = vec3(0.005, 0.04, 0.075);
        vec3 ocean = vec3(0.02, 0.22, 0.34);
        vec3 cyan = vec3(0.05, 0.62, 0.68);
        vec3 foam = vec3(0.78, 0.94, 0.9);
        vec3 algae = vec3(0.42, 0.65, 0.38);
        vec3 color = mix(abyss, ocean, broad);
        color = mix(color, cyan, current * 0.58);
        color = mix(color, algae, max(0.0, vein) * 0.055);
        color += foam * max(wake, 0.0) * 0.42;
        color += cyan * splat * 0.24;

        float edgeVignette = smoothstep(0.95, 0.26, distance(uv, vec2(0.5)));
        float alpha = 0.46 + current * 0.25 + max(wake, 0.0) * 0.28 + splat * 0.14;
        alpha *= 0.72 + edgeVignette * 0.28;
        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.86));
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointerUniform = gl.getUniformLocation(program, "uPointer");
    const timeUniform = gl.getUniformLocation(program, "uTime");
    const pointerActiveUniform = gl.getUniformLocation(program, "uPointerActive");
    const scrollUniform = gl.getUniformLocation(program, "uScroll");

    const pointer = { x: 0.5, y: 0.5, active: 0 };
    let frame = 0;
    let lastPaint = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.2);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr * 0.58));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr * 0.58));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const move = (event) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1);
      pointer.y = event.clientY / Math.max(window.innerHeight, 1);
      pointer.active = 1;
    };

    const leave = () => {
      pointer.active = 0;
    };

    const render = (now) => {
      if (now - lastPaint < 32) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastPaint = now;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointerUniform, pointer.x, pointer.y);
      gl.uniform1f(timeUniform, now * 0.001);
      gl.uniform1f(pointerActiveUniform, pointer.active);
      gl.uniform1f(scrollUniform, window.scrollY || 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <div className="ocean-fluid" aria-hidden="true">
      <div className="ocean-fluid-photo" />
      <canvas className="fluid-background" ref={canvasRef} />
      <div className="ocean-fluid-shade" />
    </div>
  );
}

function PavelFluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const lowPower = (navigator.hardwareConcurrency || 4) < 4;
    if (!canvas || reduced || !finePointer || window.innerWidth < 900 || lowPower) {
      document.documentElement.classList.add("fluid-static");
      return () => document.documentElement.classList.remove("fluid-static");
    }

    window.ga = window.ga || (() => {});

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener("load", resolve, { once: true });
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    let cancelled = false;
    const startFluid = () => {
      loadScript("/fluid/dat.gui.min.js")
        .then(() => {
          if (cancelled || window.__pavelFluidLoaded) return undefined;
          window.__pavelFluidLoaded = true;
          return loadScript("/fluid/script.js");
        })
        .catch(() => {});
    };
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(startFluid, { timeout: 1200 })
      : window.setTimeout(startFluid, 500);

    const forward = (type, event) => {
      if (!canvas) return;
      canvas.dispatchEvent(new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
      }));
    };

    let dragging = false;
    let queuedMove = null;
    let moveFrame = 0;

    const down = (event) => {
      dragging = true;
      document.documentElement.classList.add("fluid-dragging");
      window.getSelection()?.removeAllRanges();
      forward("mousedown", event);
    };
    const move = (event) => {
      if (!dragging) return;
      event.preventDefault();
      window.getSelection()?.removeAllRanges();
      queuedMove = event;
      if (moveFrame) return;
      moveFrame = window.requestAnimationFrame(() => {
        moveFrame = 0;
        if (queuedMove) forward("mousemove", queuedMove);
      });
    };
    const up = () => {
      dragging = false;
      queuedMove = null;
      document.documentElement.classList.remove("fluid-dragging");
      window.getSelection()?.removeAllRanges();
      window.dispatchEvent(new MouseEvent("mouseup"));
    };

    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      if (moveFrame) window.cancelAnimationFrame(moveFrame);
      document.documentElement.classList.remove("fluid-dragging");
      document.documentElement.classList.remove("fluid-static");
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="pavel-fluid" aria-hidden="true">
      <div className="lagoon-photo-reel">
        <span style={{ "--bg": `url("${images.lagoon}")` }} />
        <span style={{ "--bg": `url("${images.eauGallie}")` }} />
        <span style={{ "--bg": `url("${images.tidal}")` }} />
        <span style={{ "--bg": `url("${images.shore}")` }} />
      </div>
      <canvas ref={canvasRef} className="pavel-fluid-canvas" />
      <div className="promo">
        <span className="promo-close">x</span>
        <span id="apple_link">Apple</span>
        <span id="google_link">Google</span>
      </div>
    </div>
  );
}

function TopNavigation({ path }) {
  return (
    <header className="top-nav">
      <nav className="top-nav-inner" aria-label="Primary navigation">
        <a className="brand-lockup" href="/">
          <span>Brevard Co.</span>
          <strong>Clearing the Way</strong>
        </a>
        <div className="top-nav-links">
          {pageLinks.map(([href, label]) => (
            <a className={path === href ? "active" : ""} href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function useMotion() {
  const root = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches;
    let cleanupCursor = () => {};
    let cleanupHash = () => {};

    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        target.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
      }, 120);
    };

    window.addEventListener("hashchange", scrollToHash);
    cleanupHash = () => window.removeEventListener("hashchange", scrollToHash);
    window.setTimeout(scrollToHash, 320);

    if (reduced) return cleanupHash;

    const ctx = gsap.context(() => {
      const immersive = false;
      const cursor = document.querySelector(".cursor-dot");
      if (cursor && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
        const move = (event) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        window.addEventListener("pointermove", move);
        cleanupCursor = () => window.removeEventListener("pointermove", move);
      }

      const prepPath = (selector) => {
        const path = document.querySelector(selector);
        if (!path) return null;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return path;
      };

      prepPath(".route-path");
      prepPath(".mission-path");

      if (!compact) {
        prepPath(".runoff-curve");
        prepPath(".curb-route");
      }

      if (document.querySelector(".hero")) {
        gsap.from(".hero-word, .hero-lede, .hero-actions", {
          y: 42,
          autoAlpha: 0,
          stagger: 0.09,
          duration: 0.9,
          ease: "power3.out",
        });

        if (!compact) {
          gsap.to(".hero-media img", {
            scale: 1.12,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
          });
        }
      }

      if (immersive && !compact && document.querySelector(".problem")) {
        const problemTl = gsap.timeline({
          scrollTrigger: { trigger: ".problem", start: "top top", end: "+=220%", scrub: true, pin: ".problem-frame" },
        });

        problemTl
          .fromTo(".problem-photo", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.75 }, 0)
          .fromTo(".problem-photo img", { scale: 1.04, xPercent: -2, yPercent: -2 }, { scale: 1.16, xPercent: 4, yPercent: 3, duration: 1.8, ease: "none" }, 0)
          .fromTo(".storm-scan", { xPercent: -125, autoAlpha: 0 }, { xPercent: 125, autoAlpha: 0.72, duration: 1.15, ease: "none" }, 0.08)
          .fromTo(".street-slice", { xPercent: -120, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6 }, 0.08)
          .fromTo(".rain-streak", { y: -130, autoAlpha: 0 }, { y: 140, autoAlpha: 0.52, stagger: 0.025, duration: 0.95 }, 0.08)
          .to(".curb-route", { strokeDashoffset: 0, duration: 1.05, ease: "none" }, 0.24)
          .fromTo(".runoff-item", { y: -42, autoAlpha: 0, rotate: -2 }, { y: 0, autoAlpha: 1, rotate: 0, stagger: 0.08, duration: 0.55 }, 0.22)
          .fromTo(".flow-drop", { autoAlpha: 0, scale: 0.35 }, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.18 }, 0.44)
          .to(".flow-drop", {
            motionPath: { path: ".curb-route", align: ".curb-route", alignOrigin: [0.5, 0.5] },
            stagger: 0.07,
            duration: 1.25,
            ease: "none",
          }, 0.54)
          .to(".runoff-item", { x: 230, y: 230, scale: 0.55, rotate: 9, autoAlpha: 0.72, stagger: 0.07, duration: 0.9 }, 0.66)
          .fromTo(".drain-mouth", { scale: 0.7, rotate: -8, autoAlpha: 0.72 }, { scale: 1.1, rotate: 0, autoAlpha: 1, duration: 0.6 }, 0.8)
          .to(".flow-drop", { autoAlpha: 0, scale: 0.25, stagger: 0.04, duration: 0.35 }, 1.42)
          .fromTo(".lagoon-plume", { scale: 0.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.86, duration: 0.9 }, 1.28)
          .fromTo(".bloom-warning", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.48);
      }

      if (immersive && !compact && document.querySelector(".trail")) {
        const trailTl = gsap.timeline({
          scrollTrigger: { trigger: ".trail", start: "top top", end: "+=410%", scrub: true, pin: ".trail-stage" },
        });
        const trailPins = gsap.utils.toArray(".trail-pin");
        const trailCards = gsap.utils.toArray(".trail-card");
        const trailStepTimes = [0.15, 0.88, 1.55, 2.34, 3.02];

        trailTl
          .set(".route-runner", { autoAlpha: 0, scale: 0.5 }, 0)
          .set(trailPins, { autoAlpha: 0, scale: 0.78 }, 0)
          .set(trailCards, { autoAlpha: 0, y: 34 }, 0)
          .to(".route-path", { strokeDashoffset: 0, duration: 3.34, ease: "none" }, 0)
          .to(".route-runner", { autoAlpha: 1, scale: 1, duration: 0.12 }, 0.08)
          .to(".route-runner", {
            motionPath: { path: ".route-path", align: ".route-path", alignOrigin: [0.5, 0.5] },
            duration: 3.34,
            ease: "none",
          }, 0.02)
          .to(".route-runner", { scale: 1.45, autoAlpha: 0, duration: 0.22 }, 3.18);

        trailCards.forEach((card, index) => {
          const start = trailStepTimes[index];
          if (index > 0) {
            trailTl.to(trailCards[index - 1], { autoAlpha: 0, y: -18, duration: 0.18 }, start - 0.1);
            trailTl.to(trailPins[index - 1], { scale: 0.88, opacity: 0.76, duration: 0.18 }, start - 0.08);
          }

          trailTl
            .to(trailPins[index], { autoAlpha: 1, scale: 1.08, opacity: 1, duration: 0.22, ease: "power2.out" }, start)
            .to(trailPins[index], { scale: 1, duration: 0.22, ease: "power2.out" }, start + 0.22)
            .to(card, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, start + 0.03);
        });
      }

      if (immersive && !compact && document.querySelector(".mission")) {
        const missionTl = gsap.timeline({
          scrollTrigger: { trigger: ".mission", start: "top top", end: "+=300%", scrub: true, pin: ".mission-stage" },
        });

        missionTl
          .from(".mission-copy", { y: 58, duration: 0.55 }, 0)
          .to(".mission-path", { strokeDashoffset: 0, duration: 1.55, ease: "none" }, 0.12)
          .fromTo(".mission-scanline", { xPercent: -130, autoAlpha: 0 }, { xPercent: 130, autoAlpha: 0.8, duration: 1.4, ease: "none" }, 0.1)
          .fromTo(".mission-card", {
            y: 190,
            x: (index) => (index % 2 ? 120 : -120),
            rotate: (index) => (index % 2 ? 10 : -10),
            scale: 0.82,
            autoAlpha: 0,
          }, {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.16,
            duration: 0.8,
            ease: "power3.out",
          }, 0.28)
          .fromTo(".mission-object", { y: 90, autoAlpha: 0, rotate: -12 }, {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            stagger: 0.1,
            duration: 0.65,
          }, 0.72)
          .to(".mission-count", { innerText: 4, snap: { innerText: 1 }, duration: 1.1 }, 0.48)
          .to(".mission-card", { y: (index) => (index % 2 ? -18 : 18), stagger: 0.1, duration: 0.7 }, 1.35);
      }

      const track = document.querySelector(".impact-track");
      if (immersive && track && window.innerWidth > 900) {
        const impactScroll = {
          trigger: ".impact",
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        };
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 72),
          ease: "none",
          scrollTrigger: impactScroll,
        });
        gsap.fromTo(".impact-progress span", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".impact",
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 56, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      gsap.utils.toArray(".page-hero").forEach((section) => {
        gsap.fromTo(section.querySelectorAll(".eyebrow, h1, p, .page-actions"), {
          y: 38,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" },
        });
      });

      gsap.utils.toArray(".stat-card, .story-card, .overview-card").forEach((card) => {
        gsap.fromTo(card, {
          y: 34,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".chain-row, .timeline-row, .evidence-row, .data-row").forEach((row) => {
        gsap.fromTo(row, {
          x: -42,
          autoAlpha: 0,
          "--row-line": "0%",
        }, {
          x: 0,
          autoAlpha: 1,
          "--row-line": "100%",
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });
      });

      gsap.utils.toArray(".photo-panel").forEach((panel, index) => {
        gsap.fromTo(panel, {
          y: 36,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 82%" },
        });
      });

      if (document.querySelector(".impact")) {
        gsap.fromTo(".impact-panel", { y: 34, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.58,
          scrollTrigger: { trigger: ".impact", start: "top 72%" },
        });
      }

      if (document.querySelector(".trail-map")) {
        gsap.to(".route-path", {
          strokeDashoffset: 0,
          duration: compact ? 1.1 : 1.35,
          ease: "power2.out",
          scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
        });

        if (!compact) {
          gsap.fromTo(".route-runner", { autoAlpha: 0, scale: 0.65 }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.15,
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
          gsap.to(".route-runner", {
            motionPath: { path: ".route-path", align: ".route-path", alignOrigin: [0.5, 0.5] },
            duration: 1.35,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
          gsap.to(".route-runner", {
            autoAlpha: 0,
            scale: 1.25,
            duration: 0.25,
            delay: 1.15,
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
        }

        gsap.fromTo(".trail-pin", { autoAlpha: 0, scale: 0.5 }, {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".trail-map", start: "top 70%" },
        });
      }

      if (compact) {
        [
          [".trail-card", ".trail"],
          [".mission-card", ".mission"],
        ].forEach(([items, trigger]) => {
          if (!document.querySelector(trigger)) return;
          gsap.fromTo(items, {
            y: 36,
            autoAlpha: 0,
          }, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.07,
            duration: 0.58,
            ease: "power3.out",
            scrollTrigger: { trigger, start: "top 82%" },
          });
        });
      }

      if (document.querySelector(".dossiers")) {
        gsap.fromTo(".dossier-card", { y: 34, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: { trigger: ".dossiers", start: "top 70%" },
        });
      }

      if (document.querySelector(".final img")) {
        gsap.to(".final img", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => {
      cleanupCursor();
      cleanupHash();
      ctx.revert();
    };
  }, []);

  return root;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <img src={images.lagoon} alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <h1>
          <span className="hero-word">This water</span>
          <span className="hero-word">is ours.</span>
        </h1>
        <p className="hero-lede">Storm drains are shortcuts to the lagoon. We make that shortcut visible.</p>
        <div className="hero-actions">
          <a className="button light" href="/storm-drains">Start the trail</a>
          <a className="button quiet light" href="/survey">Help out</a>
        </div>
      </div>
      <div className="hero-facts" aria-label="Problem summary">
        <span>No filter</span>
        <span>No treatment</span>
        <span>Direct to water</span>
      </div>
    </section>
  );
}

function PageHeader({ kicker, title, text, actions = [] }) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {actions.length > 0 ? (
          <div className="page-actions">
            {actions.map(([label, href], index) => (
              <a className={`button light ${index > 0 ? "quiet" : ""}`} href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OverviewGrid() {
  const cards = [
    ["/problem", "Runoff", "Street water has a route."],
    ["/storm-drains", "Route", "Follow the path to the lagoon."],
    ["/mission", "Plan", "Mark. Teach. Log."],
    ["/impact", "Impact", "What we did."],
    ["/team", "Team", "The students behind it."],
    ["/survey", "Survey", "Help before rain."],
  ];

  return (
    <section className="overview-grid" aria-label="Website pages">
      {cards.map(([href, title, text], index) => (
        <a className="overview-card" href={href} key={href}>
          <span>0{index + 1}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </a>
      ))}
    </section>
  );
}

function LagoonPhotoEssay() {
  return (
    <section className="photo-essay" aria-label="Indian River Lagoon photo record">
      <div className="photo-essay-head" data-reveal>
        <p className="eyebrow">Lagoon record</p>
        <h2>Real water. Real places.</h2>
      </div>
      <div className="photo-panels">
        {lagoonPhotos.map((photo, index) => (
          <figure className="photo-panel" key={photo.label}>
            <img src={photo.image} alt={photo.text} />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")} / {photo.label}</span>
              <p>{photo.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ContentBand({ kicker, title, text, children, dark = false }) {
  return (
    <section className={`content-band ${dark ? "dark" : "light"}`} data-reveal>
      <div className="content-shell">
        <div className="content-heading">
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function StatGrid({ items }) {
  return (
    <div className="stat-grid">
      {items.map(([value, label]) => (
        <article className="stat-card" key={value}>
          <strong>{value}</strong>
          <p>{label}</p>
        </article>
      ))}
    </div>
  );
}

function ChainList({ items }) {
  return (
    <div className="chain-list">
      {items.map(([number, title, text]) => (
        <article className="chain-row" key={number}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function StoryCards({ items }) {
  return (
    <div className="story-cards">
      {items.map(([title, text], index) => (
        <article className="story-card" key={title} style={{ "--i": index }}>
          <span>0{index + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <div className="data-table">
      {rows.map(([field, type, desc]) => (
        <div className="data-row" key={field}>
          <code>{field}</code>
          <span>{type}</span>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}

function TimelineRows({ items }) {
  return (
    <div className="timeline-rows">
      {items.map(([phase, text], index) => (
        <article className="timeline-row" key={phase}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{phase}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function EvidenceRows({ items }) {
  return (
    <div className="evidence-rows">
      {items.map(([title, text], index) => (
        <article className="evidence-row" key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProblemScene() {
  return (
    <section className="problem" id="problem">
      <div className="problem-frame">
        <div className="problem-copy">
          <h2>Rain turns streets into streams.</h2>
          <p>Grass clippings, fertilizer, oil, and pet waste can move from a curb to the lagoon in the same storm.</p>
        </div>
        <div className="runoff-field runoff-field-v2" aria-hidden="true">
          <figure className="problem-photo">
            <img src={images.drain} alt="" />
          </figure>
          <span className="storm-scan" />
          <div className="street-slices">
            <span className="street-slice" />
            <span className="street-slice" />
            <span className="street-slice" />
          </div>
          <div className="rain-sheet">
            {Array.from({ length: 22 }).map((_, index) => (
              <span className="rain-streak" key={index} style={{ "--i": index }} />
            ))}
          </div>
          <div className="curb-edge" />
          <svg className="runoff-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="runoff-curve" d="M8 21 C19 30 31 35 42 47 C55 61 66 72 83 79" />
            <path className="curb-route" d="M8 28 C21 35 31 46 44 55 C58 65 74 72 91 80" />
          </svg>
          {Array.from({ length: 9 }).map((_, index) => (
            <span className="flow-drop" key={index} />
          ))}
          {pollutants.map((item, index) => (
            <span className="runoff-item" key={item} style={{ "--i": index, ...pollutantPositions[index] }}>
              {item}
            </span>
          ))}
          <div className="drain-mouth">
            <b>storm drain</b>
            <i />
            <i />
            <i />
          </div>
          <div className="lagoon-plume" />
        </div>
        <div className="bloom-warning">
          <strong>Algae blooms</strong>
          <span>Extra nutrients can turn clear water cloudy.</span>
        </div>
      </div>
    </section>
  );
}

function Trail() {
  return (
    <section className="trail" id="trail">
      <div className="trail-stage">
        <div className="trail-map">
          <img src={images.map} alt="Map route from a Melbourne neighborhood to the Indian River Lagoon." />
          <svg className="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="route-path" d="M10.42 48.88 C11.58 47.56 12.42 47.42 12.82 47.92 C13.36 48.72 13.05 51.08 13.42 52.82 C14.04 55.12 16.35 53.92 18.2 53 C20.68 51.78 23.38 50.9 25.9 52.02 C28.55 53.15 31.2 54.72 34.36 54.86 C38.8 54.64 43.45 54.2 49.22 56.42 C54.82 57.86 60.26 60.84 65.67 62.82 C68.62 63.92 68.58 65.82 70.72 66.98 C72.12 67.78 72.88 69.38 73.9 70.22" />
          </svg>
          <span className="route-runner" />
          {trailSteps.map((step) => (
            <span className="trail-pin" key={step.number} style={{ left: `${step.x}%`, top: `${step.y}%` }}>
              {step.number}
            </span>
          ))}
        </div>
        <div className="trail-copy">
          <h2>Street to lagoon.</h2>
          <div className="trail-cards">
            {trailSteps.map((step) => (
              <article className="trail-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSequence() {
  return (
    <section className="mission" id="actions">
      <div className="mission-stage">
        <div className="mission-shade" aria-hidden="true" />
        <div className="mission-copy">
          <h2>The work.</h2>
          <p>Mark drains. Talk to homes. Teach the demo. Save the proof.</p>
        </div>
        <div className="mission-field" aria-label="Campaign sequence">
          <span className="mission-scanline" />
          <svg className="mission-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="mission-path" d="M4 78 C18 50 29 36 43 49 C55 60 57 22 72 28 C86 35 82 70 96 56" />
          </svg>
          <div className="mission-counter">
            <span className="mission-count">0</span>
            <p>project steps</p>
          </div>
          {missionSteps.map((step) => (
            <article className="mission-card" key={step.number} style={{ left: step.x, top: step.y }}>
              <span>{step.number} / {step.verb}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <strong>{step.stat}</strong>
            </article>
          ))}
          <span className="mission-object object-marker">marker</span>
          <span className="mission-object object-hanger">door hanger</span>
          <span className="mission-object object-log">app log</span>
        </div>
      </div>
    </section>
  );
}

function ImpactRun() {
  return (
    <section className="impact" id="app">
      <div className="impact-head">
        <h2>The field plan.</h2>
        <div className="impact-progress" aria-hidden="true"><span /></div>
      </div>
      <div className="impact-track">
        {fieldPanels.map((panel) => (
          <article className="impact-panel" key={panel.label}>
            <figure>
              <img src={panel.image} alt="" />
            </figure>
            <div>
              <p className="eyebrow">{panel.label}</p>
              <strong>{panel.stat}</strong>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DossierDeck() {
  return (
    <section className="dossiers" id="team">
      <div className="dossier-head">
        <h2>Our team.</h2>
      </div>
      <div className="dossier-grid">
        {team.map(([name, role, text], index) => (
          <article className="dossier-card" key={name} style={{ "--i": index }}>
            <span>field id 0{index + 1}</span>
            <h3>{name}</h3>
            <p>{role}</p>
            <small>{text}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="final" id="final">
      <img src={images.lagoon} alt="" aria-hidden="true" />
      <div>
        <h2>
          The lagoon was never disconnected from us.
          <span>We were just disconnected from it.</span>
        </h2>
        <p>Take the survey or log a drain.</p>
        <div className="final-actions">
          <a className="button light" href="#app">Get our app</a>
          <a className="button quiet light" href="#final">Take our survey</a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <LagoonPhotoEssay />
      <ContentBand
        kicker="Field brief"
        title="Make the shortcut visible."
        text="Mark drains. Teach the route. Collect responses."
        dark
      >
        <StatGrid items={[
          ["50-75", "drains marked."],
          ["300-500", "homes reached."],
          ["survey", "before and after."],
          ["1 handoff", "usable archive."],
        ]} />
      </ContentBand>
      <OverviewGrid />
      <Final />
    </>
  );
}

function ProblemPage() {
  return (
    <>
      <PageHeader
        kicker="Runoff"
        title="The drain is not a filter."
        text="Rain picks up what we leave outside."
        actions={[["Follow the route", "/storm-drains"], ["See the mission", "/mission"]]}
      />
      <ContentBand
        kicker="Cause"
        title="What starts on the street can reach the lagoon."
        text="What sits on the street can enter the water."
        dark
      >
        <StatGrid items={problemStats} />
      </ContentBand>
      <ContentBand
        kicker="Path"
        title="Street. Drain. Lagoon."
        text="The path is short."
      >
        <ChainList items={runoffChain} />
      </ContentBand>
      <ProblemScene />
      <ContentBand
        kicker="Shift"
        title="Act before rain."
        text="The fix starts at the curb."
        dark
      >
        <StoryCards items={[
          ["Mark", "Make the route visible."],
          ["Teach", "Show the water path."],
          ["Log", "Keep proof."],
        ]} />
      </ContentBand>
    </>
  );
}

function StormDrainsPage() {
  return (
    <>
      <PageHeader
        kicker="Field work"
        title="Street to lagoon."
        text="Follow the water."
        actions={[["See the mission", "/mission"], ["Track impact", "/impact"]]}
      />
      <Trail />
      <ContentBand
        kicker="Marker system"
        title="Every drain gets a record."
        text="Photo, GPS, and notes."
      >
        <StatGrid items={stormDrainSpecs} />
      </ContentBand>
      <ContentBand
        kicker="Field database"
        title="A simple archive."
        text="Enough for the next team to continue."
        dark
      >
        <DataTable rows={fieldDatabase} />
      </ContentBand>
      <ContentBand
        kicker="Install sequence"
        title="Route day."
      >
        <TimelineRows items={[
          ["Select", "Pick visible drains."],
          ["Photo", "Capture before and after."],
          ["Mark", "Place the curb reminder."],
          ["Log", "Save GPS and notes."],
        ]} />
      </ContentBand>
    </>
  );
}

function MissionPage() {
  return (
    <>
      <PageHeader
        kicker="Mission"
        title="The plan."
        text="Mark drains, reach homes, teach students, and save the results."
        actions={[["View impact", "/impact"], ["Meet the team", "/team"]]}
      />
      <MissionSequence />
      <ContentBand
        kicker="Blueprint"
        title="Four jobs."
        text="Each job has something to show."
        dark
      >
        <StoryCards items={missionBlueprint} />
      </ContentBand>
      <ContentBand
        kicker="Timeline"
        title="Before. During. After."
        text="Set up. Do it. Hand it off."
      >
        <TimelineRows items={campaignTimeline} />
      </ContentBand>
      <ContentBand
        kicker="Deliverables"
        title="What we hand off."
        dark
      >
        <EvidenceRows items={[
          ["Drain packet", "Map, photos, GPS."],
          ["Outreach packet", "Door hanger, QR, survey notes."],
          ["Education packet", "Slides and demo proof."],
          ["Archive packet", "App log, survey, handoff."],
        ]} />
      </ContentBand>
    </>
  );
}

function ImpactPage() {
  return (
    <>
      <PageHeader
        kicker="Impact"
        title="What changed?"
        text="Marked drains, survey responses, and classroom proof."
        actions={[["Take the survey", "/survey"], ["Meet the team", "/team"]]}
      />
      <ImpactRun />
      <ContentBand
        kicker="Evidence streams"
        title="What we can show."
        text="Photos, surveys, and the archive."
        dark
      >
        <EvidenceRows items={impactEvidence} />
      </ContentBand>
      <ContentBand
        kicker="What changed"
        title="Did people get it?"
        text="The survey shows whether the message landed."
      >
        <StatGrid items={[
          ["Pre", "Before outreach."],
          ["Post", "After outreach."],
          ["QR", "Fast on a phone."],
          ["Result", "More people know the route."],
        ]} />
      </ContentBand>
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageHeader
        kicker="Field team"
        title="Students doing the work."
        text="Five roles. One campaign."
        actions={[["See mission", "/mission"], ["Help out", "/survey"]]}
      />
      <DossierDeck />
      <ContentBand
        kicker="Responsibilities"
        title="Our roles."
        text="Each role owns one piece."
        dark
      >
        <EvidenceRows items={teamResponsibilities} />
      </ContentBand>
      <ContentBand
        kicker="Workflow"
        title="Workflow."
      >
        <TimelineRows items={[
          ["Plan", "Route, dates, survey."],
          ["Collect", "Field days and demos."],
          ["Organize", "Keep the archive clean."],
          ["Explain", "Turn proof into the final story."],
        ]} />
      </ContentBand>
    </>
  );
}

function SurveyPage() {
  return (
    <>
      <PageHeader
        kicker="Help out"
        title="Take the survey. Get the app."
        text="Answer the survey or use the app."
        actions={[["Back to home", "/"], ["See impact", "/impact"]]}
      />
      <ContentBand
        kicker="Survey design"
        title="Quick survey."
        text="Before and after outreach."
        dark
      >
        <StoryCards items={surveyPlan} />
      </ContentBand>
      <ContentBand
        kicker="How to help"
        title="Help before rain."
      >
        <TimelineRows items={[
          ["Scan", "Take the survey."],
          ["Notice", "Check nearby drains."],
          ["Change", "Keep waste away."],
          ["Share", "Tell one person."],
        ]} />
      </ContentBand>
      <Final />
    </>
  );
}

function NotFoundPage() {
  return (
    <PageHeader
      kicker="404"
      title="Page not found."
      text="That route is not part of the field file yet."
      actions={[["Return home", "/"]]}
    />
  );
}

function getRoute(pathname) {
  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/problem":
      return <ProblemPage />;
    case "/storm-drains":
      return <StormDrainsPage />;
    case "/mission":
      return <MissionPage />;
    case "/impact":
      return <ImpactPage />;
    case "/team":
      return <TeamPage />;
    case "/survey":
      return <SurveyPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const root = useMotion();
  const path = window.location.pathname;

  return (
    <main ref={root}>
      <PavelFluidBackground />
      <Cursor />
      <TopNavigation path={path} />
      {getRoute(path)}
    </main>
  );
}
