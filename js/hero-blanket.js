/* ── Hero photo that flips to the digital me, and opens the blanket full screen ──
   Front: my photo, with a ↻ badge and a one-time nudge. Back: the little me (compact blanket),
   who waves when the card lands. Clicking the scarf or "explore" grows the back into a
   full-screen view of the whole me; ←, Esc or the browser's back button reverse it. */
(function () {
  "use strict";

  const card = document.getElementById("flip-card");
  const overlay = document.getElementById("bl-overlay");
  if (!card || !overlay || !window.Blanket) return;

  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FLIP_MS = REDUCED ? 0 : 900;
  const FLY_MS = REDUCED ? 0 : 1300; // also how long closing takes to frame the whole me again (FRAME_MS)
  const inner = card.querySelector(".flip-inner");
  const front = card.querySelector(".flip-front");
  const back = card.querySelector(".flip-back");
  const badge = card.querySelector(".flip-badge");
  const explore = card.querySelector(".flip-explore");
  const stage = overlay.querySelector('[data-bl="stage"]');
  const slot = overlay.querySelector(".bl-slot");
  const backButton = overlay.querySelector(".bl-back");
  const armLayer = card.querySelector(".flip-arm");
  const CARD_PAD = 58; // the strip kept free above the figure on the card, for the key

  Blanket.load("data/sports.json").then((data) => {
    if (!data) return; // nothing exported yet: keep the plain photo
    card.classList.add("flippable");
    back.querySelector(".flip-legend").innerHTML = Blanket.legend();

    const mini = Blanket.mount(back, data, {
      compact: true,
      padTop: CARD_PAD,
      armLayer, // the mitten may wave outside the card
      onScarfClick: () => open(),
      onFigureClick: () => mini.wave(),
    });
    // The full-screen blanket is built while the page is idle, so opening it starts straight away.
    // It starts with the card's free strip, so its first frame matches the card exactly.
    let full = null;
    const mountFull = () => { if (!full) full = Blanket.mount(overlay, data, { grow: false, padTop: CARD_PAD }); };
    (window.requestIdleCallback || ((f) => setTimeout(f, 1500)))(mountFull);

    /* ═══ Flip ═══ */
    let flipped = false;
    function flip(to = !flipped) {
      flipped = to;
      inner.style.transition = "";
      inner.style.removeProperty("--tilt-x");
      inner.style.removeProperty("--tilt-y");
      card.classList.toggle("flipped", flipped);
      front.setAttribute("aria-hidden", String(flipped));
      back.setAttribute("aria-hidden", String(!flipped));
      badge.setAttribute("aria-pressed", String(flipped));
      badge.setAttribute("aria-label", flipped ? "Flip back to my photo" : "Flip my photo to see the digital me");
      if (flipped) setTimeout(() => { mini.refresh(); mini.wave(); }, FLIP_MS * 0.75);
    }
    front.addEventListener("click", () => flip(true));
    badge.addEventListener("click", (e) => { e.stopPropagation(); flip(); });
    explore.addEventListener("click", () => open());

    // On a mouse, the photo leans a little towards the cursor, as if inviting a flip
    card.addEventListener("pointermove", (e) => {
      if (flipped || e.pointerType !== "mouse" || REDUCED) return;
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transition = "transform 0.3s ease-out";
      inner.style.setProperty("--tilt-x", `${(-dy * 8).toFixed(2)}deg`);
      inner.style.setProperty("--tilt-y", `${(dx * 12).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      if (flipped) return;
      inner.style.removeProperty("--tilt-x");
      inner.style.removeProperty("--tilt-y");
    });

    // Once per visit, a few seconds in: the card lifts a little and the badge says hello
    let nudged = false;
    try { nudged = sessionStorage.getItem("blanket-nudged") === "1"; } catch (e) { /* storage blocked */ }
    if (!nudged && !REDUCED) {
      setTimeout(() => {
        if (flipped) return;
        card.classList.add("nudge");
        setTimeout(() => card.classList.remove("nudge"), 3600);
        try { sessionStorage.setItem("blanket-nudged", "1"); } catch (e) { /* storage blocked */ }
      }, 2500);
    }

    /* ═══ Full screen: the card's back grows into place, then dives into a month ═══ */
    let isOpen = false;
    let busy = false;

    function setRect(r) {
      Object.assign(stage.style, { top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px` });
    }

    // Grow (or shrink) the stage between two rects; meanwhile the free strip above the figure eases
    // from padFrom to padTo, so the figure moves smoothly between its card and full-screen framing
    function fly(from, to, padFrom, padTo) {
      return new Promise((done) => {
        let tracking = true;
        (function track() {
          if (!tracking) return;
          const span = to.width - from.width;
          const p = span ? Math.min(1, Math.max(0, (stage.getBoundingClientRect().width - from.width) / span)) : 1;
          full.setPadTop(padFrom + (padTo - padFrom) * p);
          requestAnimationFrame(track);
        })();
        stage.classList.add("flying");
        stage.style.transition = "none";
        setRect(from);
        void stage.offsetWidth; // start from the card, without animating there
        stage.style.transition = "";
        requestAnimationFrame(() => setRect(to));
        let finished = false;
        const end = () => {
          if (finished) return;
          finished = true;
          tracking = false;
          full.setPadTop(padTo);
          stage.classList.remove("flying");
          ["top", "left", "width", "height"].forEach((p) => stage.style.removeProperty(p));
          done();
        };
        stage.addEventListener("transitionend", function onEnd(e) {
          if (e.target !== stage || e.propertyName !== "width") return;
          stage.removeEventListener("transitionend", onEnd);
          end();
        });
        setTimeout(end, FLY_MS + 250);
      });
    }

    async function open() {
      if (isOpen || busy) return;
      busy = true;
      isOpen = true;
      history.pushState({ blanket: true }, "", "#blanket");
      document.documentElement.classList.add("bl-locked");
      overlay.hidden = false;
      stage.classList.add("flying");
      setRect(back.getBoundingClientRect());
      mountFull();
      requestAnimationFrame(() => overlay.classList.add("shown"));
      // The card grows into place and stays on the whole me; zooming in is the visitor's move
      await fly(back.getBoundingClientRect(), slot.getBoundingClientRect(), CARD_PAD, 0);
      overlay.classList.add("ready");
      backButton.focus({ preventScroll: true });
      busy = false;
      if (closeQueued) { closeQueued = false; close(); }
    }

    let closeQueued = false; // back pressed while the view was still opening
    async function close() {
      if (!isOpen) return;
      if (busy) { closeQueued = true; return; }
      busy = true;
      overlay.classList.remove("ready");
      // From the close-up, step back to the scarf first; then shrink into the card while framing the whole me
      if (full.level === "month") await full.zoomTo("scarf", null, true);
      overlay.classList.remove("shown");
      await Promise.all([fly(slot.getBoundingClientRect(), back.getBoundingClientRect(), 0, CARD_PAD), full.zoomTo("all", null, true)]);
      overlay.hidden = true;
      document.documentElement.classList.remove("bl-locked");
      isOpen = false;
      busy = false;
      badge.focus({ preventScroll: true });
      mini.wave();
    }

    // ← and Esc go through history, so the browser's back button behaves the same way
    const leave = () => (history.state && history.state.blanket ? history.back() : close());
    backButton.addEventListener("click", leave);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen) leave(); });
    window.addEventListener("popstate", () => {
      if (isOpen && location.hash !== "#blanket") close();
    });

    // A shared link to #blanket opens straight into the blanket
    if (location.hash === "#blanket") {
      history.replaceState(null, "", location.pathname + location.search);
      flip(true);
      setTimeout(() => open(), FLIP_MS + 300);
    }
  });
})();
