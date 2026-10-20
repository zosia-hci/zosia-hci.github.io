/* ── My digital sport-activity temperature blanket ──
   One crocheted row per day since START, worn by a little me as a scarf. Zoom 0 shows the whole
   figure; zoom 1 is a month close-up of the flat blanket. Both share one scene and one camera.

   Blanket.load(url)              -> Promise<{ until, sports, sample }>
   Blanket.mount(root, data, opt) -> { zoomTo(level, iso), wave(), level }
     root holds [data-bl="stage"] plus optional controls (levels, prev, next, range, nav, hint,
     stats, stats-title, key). opt.compact: just the figure, clicks go to opt.onScarfClick /
     opt.onFigureClick. opt.padTop: pixels kept free above the figure. opt.grow: rows fade in one by one
     on first draw (default true). Blanket.legend() -> a tiny colour key for the preview card. */
(function () {
  "use strict";

  const START = "2026-08-01";
  const TIMES = ["early morning", "midday", "afternoon", "late"]; // same buckets as the extractor
  const YARN = {
    bouldering: { label: "Bouldering", unit: ["session", "sessions"], shades: ["#fbeed2", "#f4d27f", "#e6ad48", "#c98a2e"] },
    biking: { label: "Biking", unit: null, shades: ["#a9c6f0", "#6f9de0", "#3b6fb0", "#1f4580"] },
  };
  const SPORTS = Object.keys(YARN);
  const REST = "#d0463f"; // the scarf's red base yarn, the same red as the hat
  const MAIN = (s) => YARN[s].shades[2];

  const W = 10;       // stitch width
  const H = 9;        // row height
  const COLS = 40;    // stitches per row
  const BW = COLS * W;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // The little me is drawn this much bigger than the scarf hanging from her neck, so she feels closer
  // while the crocheted part keeps its size (1 = the original proportions)
  const BODY_SCALE = 1.45;
  const SCARF_W = 70;  // width of the scarf's crocheted part (the blanket hanging from the neck), kept centred
  const HAT_TOP = 158; // the hat's peak in the drawing (before BODY_SCALE); the framing follows it
  const ZOOM_MS = REDUCED ? 0 : 2400;  // scarf <-> month: slow, to sink into it
  const FRAME_MS = REDUCED ? 0 : 1300; // whole me <-> head and scarf
  const LEVELS = ["all", "scarf", "month"];
  const GLIDE_MS = REDUCED ? 0 : 1400; // month -> month

  const DAY = 86400000;
  const toDate = (iso) => new Date(`${iso}T00:00:00Z`);
  const toIso = (d) => d.toISOString().slice(0, 10);
  const fmt = (d, o) => d.toLocaleDateString("en", { ...o, timeZone: "UTC" });
  const short = (d) => fmt(d, { month: "short", day: "numeric" });
  const mondayIndex = (d) => (d.getUTCDay() + 6) % 7;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const NS = "http://www.w3.org/2000/svg";
  let uid = 0;

  function formatDuration(min) {
    const h = Math.floor(min / 60);
    return h ? `${h}h ${min % 60}m` : `${min % 60}m`;
  }

  // Days exported before time-of-day existed have no bucket yet; show them as afternoon
  const shadeFor = (sport, entry) => YARN[sport].shades[entry[2] ?? 2];

  function mix(hex, other, t) {
    const a = parseInt(hex.slice(1), 16), b = parseInt(other.slice(1), 16);
    const ch = (v, s) => (v >> s) & 255;
    const c = [16, 8, 0].map((s) => Math.round(ch(a, s) * (1 - t) + ch(b, s) * t));
    return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }

  /* Small deterministic noise so every stitch is a little different, but the same on every load */
  function noise(i, c, k) {
    const x = Math.sin(i * 127.1 + c * 311.7 + k * 74.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function el(name, attrs = {}, parent) {
    const e = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ── Data ── */
  function sample(until) {
    const out = { bouldering: {}, biking: {} };
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let d = toDate(START); toIso(d) <= until; d = new Date(+d + DAY)) {
      const wd = mondayIndex(d), iso = toIso(d);
      if ((wd === 1 || wd === 4 || wd === 6) && rand() < 0.7) {
        const r = rand();
        out.bouldering[iso] = [1, Math.round(50 + rand() * 110), r < 0.12 ? 0 : r < 0.3 ? 1 : r < 0.55 ? 2 : 3];
      }
      if (wd < 5 && rand() < 0.55) {
        const r = rand();
        out.biking[iso] = [1 + (rand() < 0.5 ? 1 : 0), Math.round(15 + rand() * 65), r < 0.45 ? 0 : r < 0.55 ? 1 : r < 0.85 ? 2 : 3];
      }
    }
    return out;
  }

  /* Real data if there is any; with { sample: true }, made-up data otherwise (for the prototype) */
  function load(url, { sample: allowSample = false } = {}) {
    return fetch(url, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((real) => {
        if (real && real.until) return { until: real.until, sports: real.sports, sample: false };
        if (!allowSample) return null;
        const n = new Date();
        const until = toIso(new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() - 1)));
        return { until, sports: sample(until), sample: true };
      });
  }

  /* ── The little me, in scene units (drawn in x 20–380, y 128–638, then scaled by BODY_SCALE around
        the scarf's neck). The right arm (viewer's right) waves, and the eyes and mouth smile,
        when wave() is called ── */
  // Returns { svg, arm, body }: with armOutside, the waving arm is left out of svg, to be drawn elsewhere
  function figureMarkup(id, TAIL, armOutside) {
    const pompom = (cx, cy) =>
      [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
        const a = (k / 8) * Math.PI * 2;
        return `<circle cx="${(cx + Math.cos(a) * 8).toFixed(1)}" cy="${(cy + Math.sin(a) * 8).toFixed(1)}" r="5" fill="var(--bl-hat)"/>`;
      }).join("") + `<circle cx="${cx}" cy="${cy}" r="9" fill="var(--bl-hat)"/><circle cx="${cx - 3}" cy="${cy - 3}" r="3" fill="rgba(255,255,255,0.18)"/>`;
    const zigzag = Array.from({ length: 14 }, (_, k) => `l8,${k % 2 ? 7 : -7}`).join(" ");
    // The body scales around the point where the scarf comes out from behind the neck; the band
    // around the neck scales with it, and a tapered piece joins it to the hanging (unscaled) part
    const A = { x: TAIL.x + TAIL.w / 2, y: 356 };
    const body = `translate(${A.x} ${A.y}) scale(${BODY_SCALE}) translate(${-A.x} ${-A.y})`;
    const band = `M${TAIL.x},362 L${TAIL.x},346 C${TAIL.x + 4},334 166,326 200,326 C234,326 248,334 252,346 L252,360 C232,350 214,348 ${TAIL.x + TAIL.w},353 L${TAIL.x + TAIL.w},362 Z`;
    const sx = (x) => (A.x + (x - A.x) * BODY_SCALE).toFixed(1);
    const sy = (y) => (A.y + (y - A.y) * BODY_SCALE).toFixed(1);
    const strip = `M${sx(TAIL.x)},${sy(362)} L${sx(TAIL.x + TAIL.w)},${sy(362)} L${TAIL.x + TAIL.w},${TAIL.y + 1} L${TAIL.x},${TAIL.y + 1} Z`;
    // The waving arm: a whole sleeve, as wide as the jacket's sleeve beside the crease, swinging
    // from an elbow just below the bottom edge. At rest it lines up with the jacket (and is hidden);
    // it only swings out, in a red mitten like the hat, to wave
    const ELBOW = { x: 310, y: 602 };
    const WRIST_Y = 447; // the sleeve ends here, where the mitten's cuff sits
    const MITTEN = 2.7;  // the mitten matches the sleeve's width (it is closer to the "camera")
    const elbow = `${ELBOW.x} ${ELBOW.y}`;
    const arm = `
      <g opacity="0">
        <!-- Up, three waves (the peaks at 25, 26, 26 degrees), and no extra rotation after: just as it fades
             in while first swinging out, it fades out (in the same 0.17 s) as it swings back from the last wave -->
        <animate class="bl-wave" attributeName="opacity" dur="2.8s" begin="indefinite" fill="remove" values="0;1;1;0;0" keyTimes="0;0.06;0.72;0.78;1"/>
        <animateTransform class="bl-wave" attributeName="transform" type="rotate" dur="2.8s" begin="indefinite" fill="remove"
          values="0 ${elbow};25 ${elbow};12 ${elbow};26 ${elbow};12 ${elbow};26 ${elbow};12 ${elbow};12 ${elbow}"
          keyTimes="0;0.2;0.33;0.46;0.59;0.72;0.85;1" calcMode="spline"
          keySplines="0.3 0 0.2 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0 0 1 1"/>
        <path d="M${ELBOW.x},${ELBOW.y} L${ELBOW.x},${WRIST_Y}" stroke="var(--bl-jacket-shade)" stroke-width="76" stroke-linecap="round"/>
        <path d="M${ELBOW.x},${ELBOW.y} L${ELBOW.x},${WRIST_Y}" stroke="var(--bl-jacket)" stroke-width="70" stroke-linecap="round"/>
        <path d="M${ELBOW.x},${ELBOW.y} L${ELBOW.x},${WRIST_Y+170}" stroke="var(--bl-jacket)" stroke-width="76" stroke-linecap="round"/>
        <g transform="translate(${ELBOW.x} ${WRIST_Y}) scale(${MITTEN}) translate(-334 -300)">
          <path d="M324,292 C313,291 310,281 316,276 C320,273 325,278 327,284 Z" fill="var(--bl-hat)"/>
          <path d="M321,301 C316,283 321,266 334,265 C347,265 352,283 347,301 Z" fill="var(--bl-hat)"/>
          <rect x="319" y="296" width="30" height="9" rx="3" fill="var(--bl-hat-dark)"/>
        </g>
      </g>`;
    const smile = (from, to) => `<animate class="bl-wave" attributeName="d" dur="2.8s" begin="indefinite" fill="remove"
          values="${from};${to};${to};${from}" keyTimes="0;0.14;0.86;1"/>`;
    const eyes = "M176,264 q7,6 14,0 M210,264 q7,6 14,0";
    const eyesHappy = "M176,268 q7,-8 14,0 M210,268 q7,-8 14,0";
    const mouth = "M192,292 q8,6 16,0 q-8,1 -16,0 Z";
    const mouthBig = "M186,289 q14,15 28,0 q-14,4 -28,0 Z";

    const svg = `
      <defs>
        <pattern id="bl-knit-${id}" width="5" height="4" patternUnits="userSpaceOnUse">
          <path d="M0.4,0.2 L2.5,3.6 L4.6,0.2" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="0.7"/>
        </pattern>
        <pattern id="bl-rib-${id}" width="4" height="10" patternUnits="userSpaceOnUse">
          <rect width="2" height="10" fill="rgba(0,0,0,0.12)"/>
        </pattern>
      </defs>
      <g transform="${body}">
      <path d="M142,250 C138,192 262,192 258,250 L262,312 C252,326 236,324 230,312 L170,312 C164,324 148,326 138,312 Z" fill="var(--bl-hair)"/>
      <path d="M36,640 L42,500 C50,412 110,352 200,346 C290,352 350,412 358,500 L364,640 Z" fill="var(--bl-jacket)"/>
      <path d="M112,432 C122,520 120,590 116,640 M288,432 C278,520 280,590 284,640" stroke="var(--bl-jacket-shade)" stroke-width="3" fill="none"/>
      <path d="M200,400 L200,640" stroke="var(--bl-jacket-shade)" stroke-width="2.5"/>
      ${armOutside ? "" : arm}
      <rect x="185" y="302" width="30" height="46" rx="10" fill="var(--bl-skin)"/>
      <path d="M160,342 C174,356 188,370 200,384 C212,370 226,356 240,342 L254,358 C236,376 218,392 200,404 C182,392 164,376 146,358 Z" fill="var(--bl-jacket-collar)"/>
      <path d="${band}" fill="${REST}"/>
      <path d="${band}" fill="url(#bl-knit-${id})"/>
      </g>
      <path d="${strip}" fill="${REST}"/>
      <path d="${strip}" fill="url(#bl-knit-${id})"/>
      <rect class="bl-ghost" x="${TAIL.x}" width="${TAIL.w}" fill="#ffffff" stroke="var(--text-faint)" stroke-opacity="0.6" stroke-dasharray="3 3" stroke-width="1" vector-effect="non-scaling-stroke" style="fill-opacity: var(--bl-ghost-alpha)"/>
      <g class="bl-fringe"></g>
      <g transform="${body}">
      <ellipse cx="200" cy="258" rx="54" ry="62" fill="var(--bl-skin)"/>
      <path d="M146,240 C146,280 150,300 162,314 L146,318 C136,296 136,262 142,240 Z M254,240 C254,280 250,300 238,314 L254,318 C264,296 264,262 258,240 Z" fill="var(--bl-hair)"/>
      <path d="${eyes}" stroke="#6b4a3a" stroke-width="2.4" stroke-linecap="round" fill="none">${smile(eyes, eyesHappy)}</path>
      <circle cx="170" cy="282" r="8" fill="var(--bl-blush)" opacity="0.55"/>
      <circle cx="230" cy="282" r="8" fill="var(--bl-blush)" opacity="0.55"/>
      <path d="${mouth}" fill="#a5605a" stroke="#a5605a" stroke-width="2.2" stroke-linejoin="round">${smile(mouth, mouthBig)}</path>
      <path d="M150,234 C164,256 184,254 198,242 C212,256 236,256 250,234 Z" fill="var(--bl-hair)"/>
      <path d="M135,234 C138,168 170,158 200,158 C235,158 262,168 265,234 Z" fill="var(--bl-hat)"/>
      <path d="M146,200 ${zigzag}" stroke="#f3e6d8" stroke-width="3" stroke-linejoin="round" fill="none" opacity="0.9"/>
      <path d="M136,218 C130,262 136,292 150,306 C164,294 169,262 166,218 Z M264,218 C270,262 264,292 250,306 C236,294 231,262 234,218 Z" fill="var(--bl-hat)"/>
      <path d="M136,222 C170,212 230,212 264,222 L266,242 C230,232 170,232 134,242 Z" fill="var(--bl-hat-dark)"/>
      <path d="M136,222 C170,212 230,212 264,222 L266,242 C230,232 170,232 134,242 Z" fill="url(#bl-rib-${id})"/>
      <path d="M150,306 C144,334 118,352 116,370 M250,306 C256,334 282,352 284,370" stroke="var(--bl-hat)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      ${pompom(116, 378)}${pompom(284, 378)}
      </g>`;
    return { svg, arm, body };
  }

  function mount(root, data, opt = {}) {
    const q = (name) => root.querySelector(`[data-bl="${name}"]`);
    const stage = q("stage");
    const compact = !!opt.compact;
    const id = ++uid;

    stage.innerHTML = `
      <svg aria-label="A little me wearing the blanket as a scarf${compact ? "" : "; zoom in to see each day"}">
        <g class="bl-fig"></g><g class="bl-world"></g>
      </svg>
      <div class="bl-labels"></div>
      <div class="bl-tip"></div>`;
    stage.dataset.level = "all";
    stage.classList.toggle("bl-compact", compact);
    const fig = stage.querySelector(".bl-fig");
    const world = stage.querySelector(".bl-world");
    const labels = stage.querySelector(".bl-labels");
    const tip = stage.querySelector(".bl-tip");

    const days = [];
    for (let d = toDate(START); toIso(d) <= data.until; d = new Date(+d + DAY)) {
      const iso = toIso(d);
      const entry = { iso, date: d };
      SPORTS.forEach((s) => { entry[s] = (data.sports[s] || {})[iso] || null; });
      days.push(entry);
    }
    const N = days.length;
    const rawIndex = (iso) => Math.round((toDate(iso) - toDate(START)) / DAY);
    const indexOf = (iso) => clamp(rawIndex(iso), 0, N - 1);
    const rowColors = (day) => {
      const done = SPORTS.filter((s) => day[s]).map((s) => shadeFor(s, day[s]));
      return done.length ? done : [REST];
    };

    /* ═══ The blanket: per row a backing strip plus one path per yarn colour ═══ */
    function leaf(x1, y1, x2, y2, wid) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
      const nx = (-dy / len) * wid, ny = (dx / len) * wid;
      const f = (n) => n.toFixed(1);
      return `M${f(x1)},${f(y1)}Q${f(mx + nx)},${f(my + ny)} ${f(x2)},${f(y2)}Q${f(mx - nx)},${f(my - ny)} ${f(x1)},${f(y1)}Z`;
    }

    // Rows are added bottom-up so each row's stitches overlap the row below, like real fabric
    for (let i = N - 1; i >= 0; i--) {
      const y = i * H;
      const colors = rowColors(days[i]);
      const g = el("g", {}, world);
      if (opt.grow !== false && !REDUCED) {
        g.setAttribute("class", "bl-grow");
        g.style.animationDelay = `${0.3 + (i / N) * 2}s`;
      }
      el("rect", { x: 0, y, width: BW, height: H + 0.4, fill: mix(colors[0], "#000000", 0.3) }, g);
      const fills = {};
      let shine = "";
      for (let c = 0; c < COLS; c++) {
        const color = colors[(c + i) % colors.length];
        const x0 = c * W;
        const jx = (noise(i, c, 1) - 0.5) * 0.9;
        const jy = (noise(i, c, 2) - 0.5) * 0.7;
        const bx = x0 + W / 2 + jx * 0.4, by = y + H + 1.3;
        const lx = x0 + 1.1 + jx, rx = x0 + W - 1.1 + jx, ty = y - 0.7 + jy;
        const wid = 2.15 + noise(i, c, 3) * 0.35;
        fills[color] = (fills[color] || "") + leaf(lx, ty, bx, by, wid) + leaf(rx, ty, bx, by, wid);
        shine += `M${(lx + 1.1).toFixed(1)},${(ty + 1.6).toFixed(1)}L${(bx - 0.9).toFixed(1)},${(by - 2.6).toFixed(1)}`;
      }
      Object.entries(fills).forEach(([color, d]) => el("path", { d, fill: color }, g));
      el("path", { d: shine, stroke: "rgba(255,255,255,0.28)", "stroke-width": 0.55, "stroke-linecap": "round", fill: "none" }, g);
    }

    // Soft dimming outside the month in focus (only once zoomed in)
    const dimTop = el("rect", { x: -3000, width: BW + 6000 }, world);
    const dimBottom = el("rect", { x: -3000, width: BW + 6000 }, world);
    [dimTop, dimBottom].forEach((r) => { r.style.fill = "var(--bl-stage)"; });

    const hover = el("rect", { x: -1.5, width: BW + 3, height: H + 1, rx: 2, fill: "none", "stroke-width": 1.5, "vector-effect": "non-scaling-stroke" }, world);
    hover.style.stroke = "var(--text)";
    hover.style.opacity = 0;
    hover.style.transition = "opacity 0.25s ease";

    /* ═══ The little me ═══ */
    const lastOfYear = toIso(new Date(Date.UTC(days[N - 1].date.getUTCFullYear(), 11, 31)));
    const T = Math.max(N, rawIndex(lastOfYear) + 1); // rows the scarf will have once the year is done
    const TAIL = { x: 171 - SCARF_W / 2, y: 400, w: SCARF_W, len: 204 }; // where the blanket hangs, below the collar
    const KX = TAIL.w / BW;          // scene units per blanket unit, across
    const KY0 = TAIL.len / (T * H);  // ...and down, while it is still a scarf
    const figTop = 356 - (356 - (HAT_TOP - 10)) * BODY_SCALE; // just above the hat
    const figBottom = TAIL.y + TAIL.len + 20;
    const FIG = { x: 200, y: (figTop + figBottom) / 2, w: 360, h: figBottom - figTop };

    const figure = figureMarkup(id, TAIL, !!opt.armLayer);
    fig.innerHTML = figure.svg;

    // The waving arm can live in its own unclipped layer (the hero card), so the mitten can stick out
    // of the card. Only the card's bottom edge still cuts it, so no sleeve dangles below the card.
    const armLayer = opt.armLayer || null;
    let armCam = null, armClip = null;
    if (armLayer) {
      armLayer.innerHTML = `<defs><clipPath id="bl-armclip-${id}" clipPathUnits="userSpaceOnUse"><path/></clipPath></defs>
        <g clip-path="url(#bl-armclip-${id})"><g class="bl-armcam"><g transform="${figure.body}">${figure.arm}</g></g></g>`;
      armCam = armLayer.querySelector(".bl-armcam");
      armClip = armLayer.querySelector("clipPath path");
    }
    const ghost = fig.querySelector(".bl-ghost");
    const fringe = fig.querySelector(".bl-fringe");
    const finished = N >= T;
    for (let k = 0; k < 8; k++) {
      el("path", {
        d: `M${(TAIL.x + 4 + (k * (TAIL.w - 8)) / 7).toFixed(1)},0 q${k % 2 ? 2 : -2},10 ${(k % 3) - 1},${16 + (k % 2) * 3}`,
        stroke: finished ? rowColors(days[N - 1])[0] : "var(--text-faint)", "stroke-width": 2, "stroke-linecap": "round", fill: "none",
        opacity: finished ? 1 : 0.45,
      }, fringe);
    }

    // Stop a wave mid-way (e.g. the card is flipped back to the photo)
    function stopWave() {
      [fig, armLayer].forEach((root) => root && root.querySelectorAll(".bl-wave").forEach((a) => { try { a.endElement(); } catch (e) { /* not running */ } }));
    }

    function wave() {
      if (REDUCED) return;
      [fig, armLayer].forEach((root) => root && root.querySelectorAll(".bl-wave").forEach((a) => { try { a.beginElement(); } catch (e) { /* not rendered yet */ } }));
    }

    /* ═══ Labels, revealed by level of detail: months, then Mondays, then every day ═══ */
    const monthLabels = [];
    const dayLabels = [];
    days.forEach((day, i) => {
      if (compact) return; // the small preview card has a legend instead of labels
      if (i === 0 || day.date.getUTCDate() === 1) {
        // Each month has two labels: right of the scarf in the full view, left of the blanket close up
        ["right", "left"].forEach((side) => {
          const e = document.createElement("div");
          e.className = "bl-lbl month";
          e.textContent = fmt(day.date, { month: "long" });
          labels.appendChild(e);
          monthLabels.push({ el: e, i, side });
        });
      }
      const e = document.createElement("div");
      e.className = "bl-lbl day";
      e.textContent = `${fmt(day.date, { weekday: "short" })} ${day.date.getUTCDate()}`;
      labels.appendChild(e);
      dayLabels.push({ el: e, i, monday: mondayIndex(day.date) === 0 });
    });
    // On the whole me, a little prompt points at the scarf instead of month labels
    const cta = compact ? null : { el: document.createElement("div") };
    if (cta) {
      cta.el.className = "bl-lbl bl-cta pill";
      cta.el.innerHTML = "<span>&larr; zoom in!</span>";
      labels.appendChild(cta.el);
    }

    let dayLabelW = 0;
    let dayLabelH = 16;
    function measure() {
      [...monthLabels, ...dayLabels, ...(cta ? [cta] : [])].forEach((l) => { l.w = l.el.offsetWidth; l.h = l.el.offsetHeight; });
      dayLabelW = Math.max(0, ...dayLabels.map((l) => l.w));
      dayLabelH = Math.max(12, ...dayLabels.map((l) => l.h));
    }
    measure();

    /* ═══ Camera ═══
       zoom: 0 = the whole little me, 1 = a month close-up. In between, the scene scale grows
       (log-interpolated), the blanket's rows stretch from scarf proportions to real ones, and
       the row in focus travels in a straight line to the centre of the stage. */
    const size = () => ({ w: stage.clientWidth, h: stage.clientHeight });
    let frame = 0; // 0 = the whole me, 1 = head and scarf, down to the last crocheted row
    let zoom = 0;  // 0 = the figure (framed as above), 1 = a month close-up
    let view = null; // month close-up: cy (blanket units, centre row), s (px per blanket unit), da/db (undimmed band)
    let level = "all";
    let focus = days[N - 1].iso;
    let geo = null; // last blanket -> screen mapping, for hit testing

    function monthSpan(iso) {
      const d = toDate(iso);
      const first = toIso(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)));
      const last = toIso(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)));
      return { a: indexOf(first), b: indexOf(last), spanA: rawIndex(first), spanB: rawIndex(last), label: fmt(d, { month: "long", year: "numeric" }) };
    }

    const monthScale = () => {
      const { w, h } = size();
      return Math.max(0.1, Math.min((h - 56) / (31 * H), ((w - 40) / BW) * 1.6));
    };

    // Keep the blanket's top and bottom from scrolling past the middle of the stage
    function clampCy(cy, s) {
      const half = size().h / 2 / s;
      const lo = half - 24 / s, hi = N * H - half + 70 / s;
      return lo > hi ? (N * H) / 2 : clamp(cy, lo, hi);
    }

    function monthView(iso) {
      const m = monthSpan(iso);
      const s = monthScale();
      return { cy: clampCy(((m.spanA + m.spanB + 1) / 2) * H, s), s, da: m.spanA * H, db: (m.spanB + 1) * H };
    }

    function camera() {
      const { w, h } = size();
      const pad = opt.padTop || 0; // room kept free above the figure (the preview card's key)
      // The figure framing blends the whole me into head + scarf, cut below the last crocheted row
      const zAll = Math.min(w / FIG.w, (h - pad) / FIG.h);
      // Cuts the top of the hat, on purpose (in the scaled body, around the scarf's neck point y = 356)
      const top = 356 - (356 - (HAT_TOP + 40)) * BODY_SCALE, bottom = TAIL.y + N * H * KY0 + 10;
      const zScarf = Math.max(zAll, Math.min(w / 200, (h - pad) / (bottom - top)));
      const zA = Math.exp(Math.log(zAll) + (Math.log(zScarf) - Math.log(zAll)) * frame);
      const fy = FIG.y + ((top + bottom) / 2 - FIG.y) * frame - pad / (2 * zA);
      const zB = view.s / KX;
      const ky = KY0 + (KX - KY0) * zoom;
      const z = Math.exp(Math.log(zA) + (Math.log(zB) - Math.log(zA)) * zoom);
      const target = { x: TAIL.x + TAIL.w / 2, y: TAIL.y + view.cy * ky };
      const start = { x: (target.x - FIG.x) * zA + w / 2, y: (TAIL.y + view.cy * KY0 - fy) * zA + h / 2 };
      const sx = start.x + (w / 2 - start.x) * zoom;
      const sy = start.y + (h / 2 - start.y) * zoom;
      return { w, h, z, ky, cx: target.x - (sx - w / 2) / z, cy: target.y - (sy - h / 2) / z };
    }

    function apply() {
      const c = camera();
      const { w, h, z } = c;
      if (!w || !h) return;
      fig.setAttribute("transform", `translate(${(w / 2 - c.cx * z).toFixed(2)},${(h / 2 - c.cy * z).toFixed(2)}) scale(${z.toFixed(4)})`);
      fig.style.opacity = 1 - smooth(0.35, 0.85, zoom);
      if (armCam) {
        armCam.setAttribute("transform", fig.getAttribute("transform"));
        // Only the card's bottom edge cuts the arm (its elbow is below the card); sideways and up it is free
        armClip.setAttribute("d", `M-2000,-2000 H${w + 2000} V${h} H-2000 Z`);
      }

      // Blanket -> screen: x0/y0 is its top-left corner, sx/sy pixels per blanket unit
      const x0 = (TAIL.x - c.cx) * z + w / 2;
      const y0 = (TAIL.y - c.cy) * z + h / 2;
      const sx = KX * z, sy = c.ky * z;
      geo = { x0, y0, sx, sy };
      world.setAttribute("transform", `translate(${x0.toFixed(2)},${y0.toFixed(2)}) scale(${sx.toFixed(4)},${sy.toFixed(4)})`);

      // The not-yet-crocheted part and the fringe follow the blanket's end as it stretches
      ghost.setAttribute("y", TAIL.y + N * H * c.ky);
      ghost.setAttribute("height", Math.max(0, (T - N) * H * c.ky));
      fringe.setAttribute("transform", `translate(0, ${TAIL.y + T * H * c.ky})`);

      const dimAlpha = 0.72 * smooth(0.65, 1, zoom);
      [dimTop, dimBottom].forEach((r) => r.setAttribute("fill-opacity", dimAlpha.toFixed(3)));
      dimTop.setAttribute("y", -6000);
      dimTop.setAttribute("height", Math.max(0, view.da + 6000));
      dimBottom.setAttribute("y", view.db);
      dimBottom.setAttribute("height", Math.max(0, N * H + 6000 - view.db));

      const left = x0, right = x0 + BW * sx, rowPx = H * sy;
      const onFigure = zoom < 0.85; // labels sit on the jacket until the little me has faded
      // Months: hidden on the whole me, on the right of the scarf once you step closer (clear of the
      // pompoms), fading out as you dive, then back on the left of the blanket close up
      const rightAlpha = smooth(0.35, 0.9, frame) * (1 - smooth(0.12, 0.38, zoom));
      if (cta) {
        const o = (1 - smooth(0, 0.45, frame)) * (1 - smooth(0, 0.2, zoom));
        const y = y0 + (N * rowPx) / 2 - cta.h / 2;
        cta.el.style.visibility = o > 0.01 ? "visible" : "hidden";
        cta.el.style.opacity = o.toFixed(3);
        cta.el.style.transform = `translate(${Math.min(w - cta.w - 10, right + 14).toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
      const leftAlpha = smooth(0.55, 0.85, zoom);
      monthLabels.forEach((l) => {
        const o = l.side === "right" ? rightAlpha : leftAlpha;
        const y = y0 + l.i * rowPx + Math.min(rowPx, 18) / 2 - l.h / 2;
        const show = o > 0.01 && y > -30 && y < h + 30;
        l.el.style.visibility = show ? "visible" : "hidden";
        if (!show) return;
        const x = l.side === "right" ? Math.min(w - l.w - 10, right + 12) : Math.max(10, left - l.w - 12);
        l.el.classList.toggle("pill", onFigure || (l.side === "left" && left - l.w - 12 < 10));
        l.el.style.opacity = o.toFixed(3);
        l.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      const weekly = smooth(3.5, 6, rowPx);
      const daily = smooth(dayLabelH - 4, dayLabelH, rowPx); // every day only once a row fits its label
      const dayPill = onFigure || right + 12 > w - dayLabelW - 10; // all or none, so the column looks even
      dayLabels.forEach((l) => {
        const o = l.monday ? Math.max(weekly, daily) : daily;
        const y = y0 + (l.i + 0.5) * rowPx - l.h / 2;
        const show = o > 0.01 && y > -30 && y < h + 30;
        l.el.style.visibility = show ? "visible" : "hidden";
        if (!show) return;
        const x = Math.min(w - dayLabelW - 10, right + 12);
        l.el.classList.toggle("pill", dayPill);
        l.el.style.opacity = o.toFixed(3);
        l.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
    }

    /* One animation loop drives everything: the dive in/out, month glides, drag momentum, dimming */
    let dive = null;      // { from: { frame, zoom }, to: { frame, zoom }, t0, ms, done }
    let glide = null;     // { from, to, t0 } in view.cy
    let momentum = 0;     // blanket units per ms
    let dimTarget = null; // { da, db }
    let loopOn = false;
    let drag = null;

    function loop(now) {
      let busy = false;
      if (dive) {
        const p = dive.ms ? Math.min(1, (now - dive.t0) / dive.ms) : 1;
        const e = ease(p);
        frame = dive.from.frame + (dive.to.frame - dive.from.frame) * e;
        zoom = dive.from.zoom + (dive.to.zoom - dive.from.zoom) * e;
        if (p >= 1) { const done = dive.done; dive = null; done(); } else busy = true;
      }
      if (glide) {
        const p = GLIDE_MS ? Math.min(1, (now - glide.t0) / GLIDE_MS) : 1;
        view.cy = glide.from + (glide.to - glide.from) * ease(p);
        if (p >= 1) glide = null; else busy = true;
      } else if (Math.abs(momentum) > 0.002 && !drag) {
        view.cy = clampCy(view.cy + momentum * 16, view.s);
        momentum *= 0.94;
        busy = true;
        updateFocus();
      }
      if (dimTarget) {
        const k = REDUCED ? 1 : 0.09;
        view.da += (dimTarget.da - view.da) * k;
        view.db += (dimTarget.db - view.db) * k;
        if (Math.abs(dimTarget.da - view.da) + Math.abs(dimTarget.db - view.db) < 0.2) { view.da = dimTarget.da; view.db = dimTarget.db; dimTarget = null; }
        else busy = true;
      }
      apply();
      if (busy || drag) requestAnimationFrame(loop); else loopOn = false;
    }
    function kick() {
      if (!loopOn) { loopOn = true; requestAnimationFrame(loop); }
    }

    /* ═══ State, and the optional controls around the stage ═══ */
    const levelButtons = root.querySelectorAll('[data-bl="levels"] button');
    const prev = q("prev");
    const next = q("next");
    const nav = q("nav");
    const rangeLabel = q("range");
    const hint = q("hint");
    const allLabel = `${short(days[0].date)} – ${short(days[N - 1].date)}, ${days[N - 1].date.getUTCFullYear()}`;
    const setText = (node, text) => { if (node) node.textContent = text; };

    function setFocus(iso) {
      focus = iso;
      const m = monthSpan(iso);
      setText(rangeLabel, m.label);
      if (prev) prev.disabled = m.a === 0;
      if (next) next.disabled = m.b === N - 1;
      renderStats(m);
      dimTarget = { da: m.spanA * H, db: (m.spanB + 1) * H };
      kick();
    }

    // While dragging, the month in focus is the one at the centre of the stage
    function updateFocus() {
      const iso = days[clamp(Math.floor(view.cy / H), 0, N - 1)].iso;
      if (iso.slice(0, 7) !== focus.slice(0, 7)) setFocus(iso);
    }

    function showLevel(lvl, iso) {
      level = lvl;
      stage.dataset.level = lvl;
      stage.classList.remove("over-scarf");
      levelButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.level === lvl)));
      if (nav) nav.classList.toggle("hidden-arrows", lvl !== "month");
      hideHover();
      momentum = 0;
      glide = null;
      if (lvl === "month") {
        // Dive into the scarf at this month
        view = monthView(iso || days[N - 1].iso);
        setFocus(iso || days[N - 1].iso);
      } else {
        setText(rangeLabel, allLabel);
        renderStats({ a: 0, b: N - 1 });
      }
      setText(hint, HINTS[lvl]);
      if (dive) dive.done(); // an interrupted dive still counts as finished for whoever awaited it
      const to = { frame: lvl === "all" ? 0 : 1, zoom: lvl === "month" ? 1 : 0 };
      const ms = Math.max(Math.abs(to.frame - frame) * FRAME_MS, Math.abs(to.zoom - zoom) * ZOOM_MS);
      switchUntil = performance.now() + ms + 300;
      return new Promise((done) => {
        dive = { from: { frame, zoom }, to, t0: performance.now(), ms, done };
        kick();
      });
    }

    const HINTS = {
      all: "Hover the scarf to see a month · click it, or pinch / ctrl-scroll, to come closer",
      scarf: "Click a row to open its month · pinch / ctrl-scroll in for the close-up, or out for the whole me",
      month: "Drag or scroll through the blanket · pinch / ctrl-scroll out to step back",
    };

    // Zoom gestures only ever snap between the three views, with a pause so one gesture = one step;
    // force skips the pause (used when the full-screen view opens and closes)
    let switchUntil = 0;
    function zoomTo(lvl, iso, force = false) {
      if (lvl === level) return dive ? new Promise((r) => { const d = dive.done; dive.done = () => { d(); r(); }; }) : Promise.resolve();
      if (!force && performance.now() < switchUntil) return Promise.resolve();
      return showLevel(lvl, iso);
    }
    // One step in (+1) or out (-1); stepping in from the scarf opens the given (or latest) month
    function stepLevel(dir, iso) {
      const next = LEVELS[clamp(LEVELS.indexOf(level) + dir, 0, LEVELS.length - 1)];
      return zoomTo(next, iso || days[N - 1].iso);
    }

    levelButtons.forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.level !== level) showLevel(b.dataset.level, days[N - 1].iso);
    }));

    function stepMonth(dir) {
      const d = toDate(focus);
      let iso = toIso(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + dir, 1)));
      iso = iso < START ? START : iso > data.until ? data.until : iso;
      momentum = 0;
      glide = { from: view.cy, to: monthView(iso).cy, t0: performance.now() };
      setFocus(iso);
    }
    if (prev) prev.addEventListener("click", () => stepMonth(-1));
    if (next) next.addEventListener("click", () => stepMonth(1));

    /* ═══ Pointer ═══ */
    function rowAt(clientX, clientY) {
      if (!geo) return -1;
      const r = stage.getBoundingClientRect();
      const bx = (clientX - r.left - geo.x0) / geo.sx;
      const by = (clientY - r.top - geo.y0) / geo.sy;
      const slack = 6 / geo.sx; // a few pixels either side, so the thin scarf is easy to hit
      if (bx < -slack || bx > BW + slack || by < 0 || by >= N * H) return -1;
      return Math.floor(by / H);
    }

    function hideHover() {
      hover.style.opacity = 0;
      tip.classList.remove("on");
      stage.classList.remove("tip-on");
    }

    function dayTip(i) {
      const day = days[i];
      const lines = SPORTS.filter((s) => day[s]).map((s) => {
        const entry = day[s];
        const y = YARN[s];
        const extra = y.unit && entry[0] > 1 ? ` · ${entry[0]} ${y.unit[1]}` : "";
        return `<div class="bl-tip-line"><span class="bl-sw" style="background:${shadeFor(s, entry)}"></span>${y.label} · ${formatDuration(entry[1])} · ${TIMES[entry[2] ?? 2]}${extra}</div>`;
      });
      return `<div class="bl-tip-date">${fmt(day.date, { weekday: "long", month: "long", day: "numeric" })}</div>${
        lines.join("") || `<div class="bl-tip-line"><span class="bl-sw" style="background:${REST}"></span>rest day</div>`
      }`;
    }

    // On the whole me, rows are too thin to point at a day, so the tip sums up the month
    function monthTip(m) {
      const inMonth = days.slice(m.a, m.b + 1);
      const lines = SPORTS.map((key) => {
        const y = YARN[key];
        let count = 0, min = 0;
        inMonth.forEach((d) => { if (d[key]) { count += d[key][0]; min += d[key][1]; } });
        if (!count) return "";
        const sessions = y.unit ? ` · ${count} ${y.unit[count === 1 ? 0 : 1]}` : "";
        return `<div class="bl-tip-line"><span class="bl-sw" style="background:${MAIN(key)}"></span>${y.label} · ${formatDuration(min)}${sessions}</div>`;
      });
      const rest = inMonth.filter((d) => !SPORTS.some((s) => d[s])).length;
      lines.push(`<div class="bl-tip-line"><span class="bl-sw" style="background:${REST}"></span>${rest} rest ${rest === 1 ? "day" : "days"}</div>`);
      return `<div class="bl-tip-date">${m.label}</div>${lines.join("")}`;
    }

    function showTip(html, clientX, clientY) {
      tip.innerHTML = html;
      const r = stage.getBoundingClientRect();
      const x = clamp(clientX - r.left + 16, 6, r.width - tip.offsetWidth - 6);
      const y = clamp(clientY - r.top + 16, 6, r.height - tip.offsetHeight - 6);
      tip.style.transform = `translate(${x}px, ${y}px)`;
      tip.classList.add("on");
      stage.classList.add("tip-on");
    }

    stage.addEventListener("pointerdown", (e) => {
      if (compact || level !== "month" || dive) return;
      drag = { y: e.clientY, cy: view.cy, lastY: e.clientY, lastT: performance.now(), moved: false };
      glide = null;
      momentum = 0;
      stage.setPointerCapture(e.pointerId);
      kick();
    });

    stage.addEventListener("pointermove", (e) => {
      if (drag) {
        const dy = e.clientY - drag.y;
        if (Math.abs(dy) > 4) {
          drag.moved = true;
          stage.classList.add("dragging");
          hideHover();
        }
        if (drag.moved) {
          const now = performance.now();
          momentum = -((e.clientY - drag.lastY) / view.s) / Math.max(1, now - drag.lastT);
          drag.lastY = e.clientY;
          drag.lastT = now;
          view.cy = clampCy(drag.cy - dy / view.s, view.s);
          updateFocus();
        }
        return;
      }
      if (dive || glide) return;
      const i = rowAt(e.clientX, e.clientY);
      stage.classList.toggle("over-scarf", level !== "month" && i >= 0);
      if (i < 0) { hideHover(); return; }
      if (level === "all") {
        // Outline the whole month band and sum it up
        const m = monthSpan(days[i].iso);
        hover.setAttribute("y", m.a * H - 0.5);
        hover.setAttribute("height", (m.b - m.a + 1) * H + 1);
        showTip(monthTip(m), e.clientX, e.clientY);
      } else {
        hover.setAttribute("y", i * H - 0.5);
        hover.setAttribute("height", H + 1);
        showTip(dayTip(i), e.clientX, e.clientY);
      }
      hover.style.opacity = 1;
    });

    function endDrag() {
      if (!drag) return;
      stage.classList.remove("dragging");
      if (performance.now() - drag.lastT > 80) momentum = 0; // held still before letting go
      drag = null;
      kick();
    }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("pointerleave", () => { if (!drag) { hideHover(); stage.classList.remove("over-scarf"); } });

    stage.addEventListener("click", (e) => {
      if (level === "month" || dive) return;
      const i = rowAt(e.clientX, e.clientY);
      if (compact) {
        e.stopPropagation();
        if (i >= 0 && opt.onScarfClick) opt.onScarfClick(days[i].iso);
        else if (i < 0 && opt.onFigureClick) opt.onFigureClick();
        return;
      }
      if (i >= 0) stepLevel(1, days[i].iso); // whole me -> head and scarf -> that row's month
    });

    if (!compact) {
      // Trackpad pinch arrives as ctrl + wheel; a plain wheel scrolls the blanket in month view
      let pinch = 0;
      let pinchReset = null;
      stage.addEventListener("wheel", (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          pinch += e.deltaY;
          clearTimeout(pinchReset);
          pinchReset = setTimeout(() => { pinch = 0; }, 250);
          if (Math.abs(pinch) > 30) {
            const i = rowAt(e.clientX, e.clientY);
            stepLevel(pinch < 0 ? 1 : -1, i >= 0 ? days[i].iso : null);
            pinch = 0;
          }
          return;
        }
        if (level !== "month" || dive || glide) return;
        e.preventDefault();
        momentum = 0;
        hideHover();
        view.cy = clampCy(view.cy + e.deltaY / view.s, view.s);
        updateFocus();
        kick();
      }, { passive: false });

      // Two-finger pinch on touch screens
      const touches = new Map();
      let pinchStart = null;
      const spread = () => {
        const [a, b] = [...touches.values()];
        return Math.hypot(a.x - b.x, a.y - b.y);
      };
      stage.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "touch") return;
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (touches.size === 2) {
          pinchStart = spread();
          drag = null;
          stage.classList.remove("dragging");
        }
      });
      stage.addEventListener("pointermove", (e) => {
        if (!touches.has(e.pointerId)) return;
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (touches.size !== 2 || !pinchStart) return;
        const ratio = spread() / pinchStart;
        if (ratio > 1.25 || ratio < 0.8) { stepLevel(ratio > 1 ? 1 : -1); pinchStart = null; }
      });
      const lift = (e) => {
        touches.delete(e.pointerId);
        if (touches.size < 2) pinchStart = null;
      };
      stage.addEventListener("pointerup", lift);
      stage.addEventListener("pointercancel", lift);
    }

    /* ═══ Stats for what's in view, and the yarn key ═══ */
    function renderStats(range) {
      const statsEl = q("stats");
      if (!statsEl) return;
      const inView = days.slice(range.a, range.b + 1);
      const lines = SPORTS.map((key) => {
        const y = YARN[key];
        let count = 0, min = 0;
        inView.forEach((d) => { if (d[key]) { count += d[key][0]; min += d[key][1]; } });
        return y.unit
          ? `<div class="bl-stat"><span class="bl-sw" style="background:${MAIN(key)}"></span><b>${count}</b>${y.unit[count === 1 ? 0 : 1]} ${y.label.toLowerCase()} · ${formatDuration(min)}</div>`
          : `<div class="bl-stat"><span class="bl-sw" style="background:${MAIN(key)}"></span><b>${formatDuration(min)}</b>${y.label.toLowerCase()}</div>`;
      });
      const rest = inView.filter((d) => !SPORTS.some((s) => d[s])).length;
      lines.push(`<div class="bl-stat rest"><span class="bl-sw" style="background:${REST}"></span>${rest} rest ${rest === 1 ? "day" : "days"} · ${inView.length} ${inView.length === 1 ? "row" : "rows"}</div>`);
      setText(q("stats-title"), level === "month" ? `In view · ${monthSpan(focus).label}` : "The whole blanket");
      statsEl.innerHTML = lines.join("");
    }

    const keyEl = q("key");
    if (keyEl) {
      keyEl.innerHTML = SPORTS.map((key) => {
        const y = YARN[key];
        return `<span>${y.label}</span><div class="bl-key-row">${y.shades.map((c, k) => `<div class="bl-key-cell"><span class="bl-sw" style="background:${c}"></span><small>${TIMES[k]}</small></div>`).join("")}</div>`;
      }).join("") + `
        <span>Mixed days</span><div class="bl-key-row"><span class="bl-sw wide" style="background:repeating-linear-gradient(90deg,${MAIN("bouldering")} 0 6px,${MAIN("biking")} 6px 12px)"></span></div>
        <span>Rest day</span><div class="bl-key-row"><span class="bl-sw wide" style="background:${REST}"></span></div>`;
    }

    // Start on the whole little me; the month view waits on the latest month
    view = monthView(focus);
    setText(rangeLabel, allLabel);
    if (nav) nav.classList.add("hidden-arrows");
    renderStats({ a: 0, b: N - 1 });
    setText(hint, compact ? "" : HINTS.all);
    apply();
    new ResizeObserver(() => {
      if (dive || glide || drag) { apply(); return; }
      if (monthLabels.length && !monthLabels[0].w) measure(); // labels measure 0 while hidden (e.g. a flipped card)
      const s = monthScale();
      view = { ...view, s, cy: clampCy(view.cy, s) };
      apply();
    }).observe(stage);

    return {
      zoomTo,
      wave,
      stopWave,
      get level() { return level; },
      refresh() { measure(); apply(); },
      // Pixels kept free above the figure; the full-screen view eases this from the card's value to 0
      setPadTop(px) { opt.padTop = px; apply(); },
    };
  }

  /* A tiny key for the preview card: what the colours mean */
  function legend() {
    const dot = (c) => `<span class="bl-sw" style="background:${c}"></span>`;
    return `<div class="bl-mini-title">my digital crochet <span>· one row a day</span></div>
      <div class="bl-mini-key"><span>${dot(MAIN("bouldering"))}bouldering</span><span>${dot(MAIN("biking"))}biking</span><span>${dot(REST)}rest</span></div>`;
  }

  window.Blanket = { load, mount, legend };
})();
