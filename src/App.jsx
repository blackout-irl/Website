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
    text: "Open lagoon water at Nathaniel P. Reed Hobe Sound National Wildlife Refuge.",
  },
  {
    image: images.eauGallie,
    label: "Eau Gallie reach",
    text: "Indian River Lagoon water north toward Eau Gallie, close to the campaign geography.",
  },
  {
    image: images.tidal,
    label: "Tidal flats",
    text: "Exposed lagoon flats show how shallow, sensitive, and connected the system is.",
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
  { number: "01", title: "Street", text: "Rain picks up what is left on the ground.", x: 10.42, y: 48.88 },
  { number: "02", title: "Drain", text: "Water enters the inlet without being cleaned.", x: 34.36, y: 54.86 },
  { number: "03", title: "Pipe", text: "The pipe carries runoff through the neighborhood.", x: 49.22, y: 56.42 },
  { number: "04", title: "Outfall", text: "The water leaves the pipe near the shore.", x: 65.67, y: 62.82 },
  { number: "05", title: "Lagoon", text: "Street runoff reaches the lagoon.", x: 73.9, y: 70.22 },
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
    text: "Place curb markers where people already walk and park.",
    x: "5%",
    y: "18%",
  },
  {
    number: "02",
    verb: "Reach",
    title: "Reach nearby homes.",
    stat: "300-500 households",
    text: "Use door hangers and a short survey around marked drains.",
    x: "36%",
    y: "8%",
  },
  {
    number: "03",
    verb: "Show",
    title: "Show the water demo.",
    stat: "4-6 demos",
    text: "Let students compare clean water with polluted runoff.",
    x: "18%",
    y: "54%",
  },
  {
    number: "04",
    verb: "Test",
    title: "Test the sites.",
    stat: "3 rounds",
    text: "Sample campaign and control sites before, during, and after.",
    x: "58%",
    y: "43%",
  },
];

const fieldPanels = [
  {
    label: "Drain marking",
    image: images.marker,
    stat: "50-75",
    title: "The message starts at the curb.",
    text: "A marker turns a storm drain into a public reminder before the next rain.",
  },
  {
    label: "Neighborhood wave",
    image: images.eauGallie,
    stat: "300-500",
    title: "The block gets the same clue.",
    text: "Nearby homes get a door hanger and a quick survey. The goal is not noise. It is recognition.",
  },
  {
    label: "Classroom ripple",
    image: images.tidal,
    stat: "4-6",
    title: "Students see the runoff.",
    text: "The demo is direct: clean water, dirty runoff, and the question of where it goes.",
  },
  {
    label: "Water testing",
    image: images.shore,
    stat: "3 rounds",
    title: "Samples tell us what changed.",
    text: "Campaign sites and a control site are tested across the project.",
  },
];

const team = [
  ["Faizan Ahmed", "Project lead", "Keeps the campaign moving and the report clean."],
  ["Kairav Kumar", "Field lead", "Leads marking routes, site photos, and field logistics."],
  ["Sankeerth Reddy Keisreddy", "Outreach lead", "Runs door hangers, surveys, and household tracking."],
  ["Prithiv Ponnusamy", "Education lead", "Builds classroom demos and student-facing materials."],
  ["Aryan Pattu", "Data lead", "Handles water testing, charts, and the final handoff."],
];

const tests = ["nitrate", "phosphate", "pH", "temperature", "turbidity"];

const problemStats = [
  ["No treatment", "Storm drains move street water directly into canals, creeks, and lagoon outfalls."],
  ["Nutrients", "Fertilizer, grass clippings, and pet waste can add nitrogen and phosphorus to runoff."],
  ["Cloudy water", "Extra nutrients can feed algal blooms that reduce light reaching seagrass."],
  ["Local action", "The easiest intervention starts before the water enters the drain."],
];

const runoffChain = [
  ["01", "Rain starts", "A storm moves across streets, driveways, sidewalks, and lawns."],
  ["02", "Pollution loosens", "Fertilizer, oil, grass clippings, soil, and pet waste are picked up by flowing water."],
  ["03", "Drain collects", "The storm drain inlet captures the water but does not clean it."],
  ["04", "Pipe carries", "Underground pipes move the runoff through the neighborhood faster than people notice."],
  ["05", "Lagoon receives", "The Indian River Lagoon becomes the final stop for what was left on land."],
  ["06", "Ecosystem reacts", "Nutrients and sediment can affect clarity, algae growth, and seagrass habitat."],
];

const missionBlueprint = [
  ["Mark", "Install permanent markers on 50-75 storm drains so the message stays visible at the curb."],
  ["Inform", "Reach 300-500 nearby households with door hangers, QR links, and short survey prompts."],
  ["Educate", "Run classroom demos that show the difference between clean water and polluted runoff."],
  ["Measure", "Test campaign and control sites across baseline, mid-campaign, and final rounds."],
];

const stormDrainSpecs = [
  ["Marker target", "50-75 drains", "Priority drains near campaign streets and visible pedestrian/parking areas."],
  ["Documentation", "Photo + GPS", "Every marked drain gets a before/after photo and location entry."],
  ["Message", "No dumping", "Simple curb-level reminder: this drain connects to local waterways."],
  ["Field notes", "Condition log", "Crews record drain condition, visibility, and nearby runoff sources."],
];

const fieldDatabase = [
  ["drain_id", "string", "Unique ID for each marked storm drain."],
  ["lat / lon", "float", "GPS coordinates captured at the installation point."],
  ["photo_before", "file", "Reference image before the marker is installed."],
  ["photo_after", "file", "Reference image after the marker is installed."],
  ["route_zone", "string", "Neighborhood or route segment for grouping field work."],
  ["notes", "text", "Observed grass clippings, pet waste signs, clogged grates, or visibility issues."],
];

const campaignTimeline = [
  ["Baseline", "Survey households and test water before markers, lessons, or outreach begin."],
  ["Install", "Mark storm drains and document each site with GPS, photos, and field notes."],
  ["Outreach", "Deliver door hangers, run classroom demos, and keep the survey QR visible."],
  ["Midpoint", "Repeat field checks and collect the second water-testing round."],
  ["Final", "Run post-surveys, final testing, charts, and city/county handoff materials."],
];

const impactEvidence = [
  ["Survey dataset", "Pre/post responses show whether people learned where stormwater goes and what behavior changed."],
  ["Drain archive", "Marker photos, GPS coordinates, and notes create proof that field work happened."],
  ["Classroom record", "Lesson dates, demo photos, and student counts show education reach."],
  ["Water data", "Nitrate, phosphate, pH, temperature, and turbidity give the project a measurable science layer."],
  ["Handoff packet", "The final archive gives the city or county a repeatable model instead of a one-time school project."],
];

const surveyPlan = [
  ["Pre-survey", "Ask what residents know before door hangers, markers, and classroom work change the signal."],
  ["Post-survey", "Repeat the same core questions after outreach so improvement can be measured honestly."],
  ["QR access", "Keep the survey fast and phone-friendly so households can answer at the door hanger moment."],
  ["Result", "The headline metric is knowledge change: more people should know drains connect to the lagoon."],
];

const teamResponsibilities = [
  ["Project lead", "Keeps the campaign timeline, report, and final evidence package moving."],
  ["Field operations", "Plans route days, marks drains, captures GPS points, and logs photos."],
  ["Outreach", "Manages door hangers, QR tracking, household counts, and survey waves."],
  ["Education", "Builds classroom demos and turns runoff science into simple student-facing lessons."],
  ["Science & data", "Runs water testing, stores results, builds charts, and explains what changed."],
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

      prepPath(".runoff-curve");
      prepPath(".curb-route");
      prepPath(".route-path");
      prepPath(".mission-path");

      if (document.querySelector(".hero")) {
        gsap.from(".hero-word, .hero-lede, .hero-actions", {
          y: 42,
          autoAlpha: 0,
          stagger: 0.09,
          duration: 0.9,
          ease: "power3.out",
        });

        gsap.to(".hero-media img", {
          scale: 1.12,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      if (document.querySelector(".problem")) {
        const problemTl = gsap.timeline({
          scrollTrigger: { trigger: ".problem", start: "top top", end: "+=220%", scrub: true, pin: ".problem-frame" },
        });

        problemTl
          .fromTo(".problem-photo", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.75 }, 0)
          .fromTo(".problem-photo img", { scale: 1.04, xPercent: -2, yPercent: -2 }, { scale: 1.16, xPercent: 4, yPercent: 3, duration: 1.8, ease: "none" }, 0)
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

      if (document.querySelector(".trail")) {
        const trailTl = gsap.timeline({
          scrollTrigger: { trigger: ".trail", start: "top top", end: "+=410%", scrub: true, pin: ".trail-stage" },
        });
        const trailPins = gsap.utils.toArray(".trail-pin");
        const trailCards = gsap.utils.toArray(".trail-card");
        const trailStepTimes = [0.15, 0.88, 1.55, 2.34, 3.02];

        trailTl
          .set(trailPins, { autoAlpha: 0, scale: 0.78 }, 0)
          .set(trailCards, { autoAlpha: 0, y: 34 }, 0)
          .to(".route-path", { strokeDashoffset: 0, duration: 3.34, ease: "none" }, 0);

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

      if (document.querySelector(".mission")) {
        const missionTl = gsap.timeline({
          scrollTrigger: { trigger: ".mission", start: "top top", end: "+=300%", scrub: true, pin: ".mission-stage" },
        });

        missionTl
          .from(".mission-copy", { y: 58, duration: 0.55 }, 0)
          .to(".mission-path", { strokeDashoffset: 0, duration: 1.55, ease: "none" }, 0.12)
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
      if (track && window.innerWidth > 900) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 72),
          ease: "none",
          scrollTrigger: {
            trigger: ".impact",
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
            pin: true,
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
          y: 70,
          rotateX: -9,
          autoAlpha: 0,
          transformOrigin: "50% 100%",
        }, {
          y: 0,
          rotateX: 0,
          autoAlpha: 1,
          duration: 0.72,
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
          yPercent: index % 2 ? 14 : -10,
          rotate: index % 2 ? 1.8 : -1.8,
          autoAlpha: 0,
        }, {
          yPercent: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 82%" },
        });
      });

      if (document.querySelector(".impact")) {
        gsap.fromTo(".impact-panel", { y: 72, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.75,
          scrollTrigger: { trigger: ".impact", start: "top 72%" },
        });
      }

      if (document.querySelector(".dossiers")) {
        gsap.fromTo(".dossier-card", { y: 70, rotate: -4, autoAlpha: 0 }, {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".dossiers", start: "top 70%" },
        });
      }

      if (document.querySelector(".lab-section")) {
        const labTl = gsap.timeline({
          scrollTrigger: { trigger: ".lab-section", start: "top top", end: "+=180%", scrub: true, pin: ".lab-stage" },
        });

        labTl
          .set(".phase-word", { autoAlpha: 0, yPercent: 80 }, 0)
          .from(".lab-copy", { y: 48, duration: 0.45 }, 0)
          .fromTo(".lab-step", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.18, duration: 0.55 }, 0.12)
          .to(".phase-before", { autoAlpha: 1, yPercent: 0, duration: 0.28 }, 0.14)
          .to(".phase-before", { autoAlpha: 0, yPercent: -55, duration: 0.22 }, 0.52)
          .to(".phase-during", { autoAlpha: 1, yPercent: 0, duration: 0.28 }, 0.52)
          .to(".phase-during", { autoAlpha: 0, yPercent: -55, duration: 0.22 }, 0.82)
          .to(".phase-after", { autoAlpha: 1, yPercent: 0, duration: 0.34 }, 0.82)
          .fromTo(".jar-fill", { scaleY: 0.12 }, { scaleY: 1, stagger: 0.16, duration: 0.9, ease: "power3.out" }, 0.34)
          .fromTo(".lab-pulse", { scale: 0.2, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.65, duration: 0.8 }, 0.7)
          .fromTo(".test-chip", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.55 }, 0.92);
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
        <p className="hero-lede">A storm drain is a shortcut from our streets to the Indian River Lagoon. This project shows that path, then marks the places where people can help.</p>
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
    ["/problem", "The Problem", "The pipe exists. Awareness does not. See how street runoff reaches the lagoon."],
    ["/storm-drains", "Storm Drains", "Follow the water from neighborhood pavement to the Indian River Lagoon."],
    ["/mission", "Mission", "Mark drains, teach students, reach nearby homes, and test the water."],
    ["/impact", "Impact", "Track the field plan, classroom work, survey change, and water-quality results."],
    ["/team", "Team", "Meet the student field team behind the campaign."],
    ["/survey", "Survey", "Take the survey or get the app to help log what you notice before the next rain."],
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
          <span>Extra nutrients can feed cloudy water before anyone notices.</span>
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
          <h2>Simple work, real signal.</h2>
          <p>Mark the drains. Reach nearby homes. Teach the demo. Test the water before and after.</p>
        </div>
        <div className="mission-field" aria-label="Campaign sequence">
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
          <span className="mission-object object-sample">sample vial</span>
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

function WaterLab() {
  return (
    <section className="lab-section" id="testing">
      <div className="lab-stage">
        <div className="lab-copy">
          <h2>Track the water.</h2>
          <p>Use the same sites each round so the results can be compared.</p>
        </div>
        <div className="phase-reel" aria-hidden="true">
          <span className="phase-word phase-before">Before</span>
          <span className="phase-word phase-during">During</span>
          <span className="phase-word phase-after">After</span>
        </div>
        <div className="lab-timeline" aria-label="Water testing rounds">
          <article className="lab-step">
            <span>01</span>
            <h3>Baseline</h3>
            <p>Before outreach</p>
          </article>
          <article className="lab-step">
            <span>02</span>
            <h3>Midpoint</h3>
            <p>During outreach</p>
          </article>
          <article className="lab-step">
            <span>03</span>
            <h3>Final</h3>
            <p>After outreach</p>
          </article>
        </div>
        <div className="jar-stage" aria-label="Water testing preview">
          <span className="lab-pulse" />
          <div className="jar clean">
            <span className="jar-fill" />
            <p>campaign site</p>
          </div>
          <div className="jar runoff">
            <span className="jar-fill" />
            <p>control site</p>
          </div>
        </div>
        <div className="test-strip">
          {tests.map((test) => (
            <span className="test-chip" key={test}>{test}</span>
          ))}
        </div>
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
        <p>Help keep the work moving: log drains, answer the survey, and share what you notice before the next rain.</p>
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
        text="Rainwater moves fast here. Clearing the Way marks the drains, explains where the water goes, teaches the demo, and keeps proof of the work."
        dark
      >
        <StatGrid items={[
          ["50-75", "storm drains marked with permanent curb reminders."],
          ["300-500", "households reached through door hanger outreach."],
          ["3 rounds", "water testing before, during, and after the campaign."],
          ["1 handoff", "organized archive for the city or county to keep using."],
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
        title="The drain does not clean the water."
        text="Rain hits the street, picks up what we leave behind, and moves through storm drains toward the lagoon."
        actions={[["Follow the route", "/storm-drains"], ["See the mission", "/mission"]]}
      />
      <ContentBand
        kicker="Cause"
        title="What starts on land can end in the lagoon."
        text="If something is left on the street before rain, it can become part of the water after rain."
        dark
      >
        <StatGrid items={problemStats} />
      </ContentBand>
      <ContentBand
        kicker="Path"
        title="The route is shorter than people think."
        text="One storm can move material from a lawn, driveway, sidewalk, or curb into the water system."
      >
        <ChainList items={runoffChain} />
      </ContentBand>
      <ProblemScene />
      <ContentBand
        kicker="Shift"
        title="Stop the problem before it enters the drain."
        text="The project works at the curb, the home, the classroom, and the test site before the next storm."
        dark
      >
        <StoryCards items={[
          ["Visibility", "A marked drain reminds people that the street is connected to local water."],
          ["Timing", "Door hangers and lessons happen before habits become stormwater."],
          ["Evidence", "Surveys and water testing show whether the work moved beyond awareness."],
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
        text="Every marker starts with the same idea: make the invisible water path visible before the next storm."
        actions={[["See the mission", "/mission"], ["Track impact", "/impact"]]}
      />
      <Trail />
      <ContentBand
        kicker="Marker system"
        title="Every drain gets a record."
        text="The field run is not just installing markers. Each drain becomes a data point with location, photos, condition notes, and route context."
      >
        <StatGrid items={stormDrainSpecs} />
      </ContentBand>
      <ContentBand
        kicker="Field database"
        title="The archive has to be useful after the campaign."
        text="A clean database lets another team or city partner repeat the route, verify the work, and add new drains later."
        dark
      >
        <DataTable rows={fieldDatabase} />
      </ContentBand>
      <ContentBand
        kicker="Install sequence"
        title="The route day has a repeatable order."
      >
        <TimelineRows items={[
          ["Select", "Choose drains that are visible, connected to the route, and close to outreach streets."],
          ["Photograph", "Capture the drain before installation so the archive has a baseline."],
          ["Mark", "Install the marker and check that the message is readable from the curb."],
          ["Log", "Record GPS, photo reference, route zone, and any field notes before leaving the site."],
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
        title="Simple work. Real signal."
        text="This campaign is built around four actions: mark drains, reach nearby homes, teach students, and test the water before and after."
        actions={[["View impact", "/impact"], ["Meet the team", "/team"]]}
      />
      <MissionSequence />
      <ContentBand
        kicker="Blueprint"
        title="Four jobs make the project measurable."
        text="Each part of the campaign has a different audience, but the pieces work together: curb, home, classroom, and data."
        dark
      >
        <StoryCards items={missionBlueprint} />
      </ContentBand>
      <ContentBand
        kicker="Timeline"
        title="Before. During. After."
        text="The project is structured so the final result can compare what people knew and what the water showed before and after the campaign."
      >
        <TimelineRows items={campaignTimeline} />
      </ContentBand>
      <ContentBand
        kicker="Deliverables"
        title="The end product is more than a presentation."
        dark
      >
        <EvidenceRows items={[
          ["Drain route packet", "Map, route notes, marker photos, GPS points, and installation summary."],
          ["Outreach packet", "Door hanger design, household counts, QR link, and survey wave notes."],
          ["Education packet", "Lesson slides, demo instructions, photo evidence, and student reach."],
          ["Science packet", "Sampling schedule, water-quality results, charts, and interpretation."],
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
        title="Measure what changed."
        text="The goal is not just awareness. The goal is visible action, survey movement, and water-quality data that can be handed off."
        actions={[["Water testing", "/impact#testing"], ["Take the survey", "/survey"]]}
      />
      <ImpactRun />
      <ContentBand
        kicker="Evidence streams"
        title="Every activity produces something that can be checked."
        text="A stronger project does not just say it helped. It keeps proof from each part of the campaign."
        dark
      >
        <EvidenceRows items={impactEvidence} />
      </ContentBand>
      <WaterLab />
      <ContentBand
        kicker="Water testing"
        title="The science stays simple on purpose."
        text="The project compares campaign sites with a control site across the same testing rounds, using parameters that students can explain clearly."
      >
        <StatGrid items={[
          ["Site A", "campaign site near marked drains and outreach streets."],
          ["Site B", "second campaign site for comparison inside the work zone."],
          ["Control", "similar water access point outside the direct campaign area."],
          ["5 tests", "nitrate, phosphate, pH, temperature, and turbidity."],
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
        text="The project depends on a small team with clear roles: field routes, outreach, education, data, and final reporting."
        actions={[["See mission", "/mission"], ["Help out", "/survey"]]}
      />
      <DossierDeck />
      <ContentBand
        kicker="Responsibilities"
        title="The team is organized by evidence, not titles."
        text="Each role owns a deliverable that has to appear in the final archive."
        dark
      >
        <EvidenceRows items={teamResponsibilities} />
      </ContentBand>
      <ContentBand
        kicker="Workflow"
        title="How the work moves."
      >
        <TimelineRows items={[
          ["Plan", "Confirm the route, dates, classroom windows, and testing schedule."],
          ["Collect", "Run field days, outreach waves, demos, surveys, and water sampling."],
          ["Organize", "Name files clearly, store evidence, and update the master archive weekly."],
          ["Explain", "Turn photos, maps, survey results, and water data into a clear final story."],
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
        text="Help keep the work moving: log drains, answer the survey, and share what you notice before the next rain."
        actions={[["Back to home", "/"], ["See impact", "/impact"]]}
      />
      <ContentBand
        kicker="Survey design"
        title="The survey measures whether the message reached people."
        text="The survey is short because the goal is completion. It asks what residents know, what they remember seeing, and whether the campaign changed how they think about storm drains."
        dark
      >
        <StoryCards items={surveyPlan} />
      </ContentBand>
      <ContentBand
        kicker="How to help"
        title="Small actions matter before rain."
      >
        <TimelineRows items={[
          ["Scan", "Use the QR code on campaign materials to take the survey."],
          ["Notice", "Look at the drains near your home, school, or route to the lagoon."],
          ["Change", "Keep clippings, pet waste, fertilizer, and litter away from storm drains."],
          ["Share", "Tell someone that storm drains are not filters."],
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
