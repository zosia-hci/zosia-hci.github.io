(function () {
  "use strict";

  /* ── Theme ── */
  const themeToggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  setTheme(stored || (prefersDark ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });

  /* ── Mobile nav ── */
  const menuBtn = document.getElementById("nav-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));

  /* ── Populate hero ── */
  document.getElementById("hero-title").textContent = SITE.title;
  document.getElementById("hero-tagline").textContent = SITE.tagline;
  document.getElementById("hero-bio").textContent = SITE.bio;
  document.getElementById("hero-about").textContent = SITE.about;

  const heroLinks = document.getElementById("hero-links");
  Object.values(SITE.links).forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noopener";
    heroLinks.appendChild(a);
  });

  const cvLink = document.createElement("a");
  cvLink.href = SITE.cv;
  cvLink.textContent = "CV";
  cvLink.target = "_blank";
  cvLink.rel = "noopener";
  heroLinks.appendChild(cvLink);

  /* ── News ── */
  const newsList = document.getElementById("news-list");
  NEWS.forEach((item) => {
    const el = document.createElement("div");
    el.className = "news-item";
    el.innerHTML = `
      <span class="news-date">${item.date}</span>
      <span class="news-title">${item.title}</span>
    `;
    newsList.appendChild(el);
  });

  /* ── Publications ── */
  const pubList = document.getElementById("pub-list");
  PUBLICATIONS.forEach((pub) => {
    const card = document.createElement("article");
    card.className = `pub-card${pub.featured ? " featured" : ""}`;
    card.innerHTML = `
      <div class="pub-thumb">
        <img src="${pub.image}" alt="" loading="lazy">
      </div>
      <div class="pub-body">
        <div class="pub-venue">${pub.venue} ${pub.year}</div>
        <h3 class="pub-title">
          <a href="${pub.url}" target="_blank" rel="noopener">${pub.title}</a>
        </h3>
        <p class="pub-authors">${pub.authors}</p>
        <p class="pub-abstract">${pub.abstract}</p>
        <a class="pub-link" href="${pub.url}" target="_blank" rel="noopener">Read paper →</a>
      </div>
    `;
    pubList.appendChild(card);
  });

  /* ── Projects ── */
  const projectGrid = document.getElementById("project-grid");
  PROJECTS.forEach((project) => {
    const card = document.createElement("article");
    card.className = `project-card${project.featured ? " featured" : ""}`;
    card.innerHTML = `
      <div class="project-thumb">
        <img src="${project.image}" alt="" loading="lazy">
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
        </div>
        <h3 class="project-title">${project.title}</h3>
      </div>
    `;
    card.addEventListener("click", () => openProjectLightbox(project));
    projectGrid.appendChild(card);
  });

  /* ── Fun ── */
  const funGrid = document.getElementById("fun-grid");
  FUN.forEach((item) => {
    const card = document.createElement("article");
    card.className = "fun-card";
    card.innerHTML = `
      <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
      <div class="fun-overlay">
        <span class="fun-overlay-title">${item.title}</span>
        <span class="fun-overlay-type">${item.type} · ${item.year}</span>
      </div>
    `;
    card.addEventListener("click", () => openFunLightbox(item));
    funGrid.appendChild(card);
  });

  /* ── Lightbox ── */
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(html) {
    lightboxContent.innerHTML = html;
    lightbox.showModal();
  }

  function openProjectLightbox(project) {
    openLightbox(`
      <h3>${project.title}</h3>
      <div class="lightbox-tags">
        ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
      </div>
      <p>${project.description}</p>
      <div class="lightbox-images">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <p class="lightbox-team">Team: ${project.team}</p>
    `);
  }

  function openFunLightbox(item) {
    openLightbox(`
      <h3>${item.title}</h3>
      <p>${item.type} · ${item.year}${item.credit ? ` · ${item.credit}` : ""}</p>
      <div class="lightbox-images">
        ${item.images.map((src) => `<img src="${src}" alt="${item.title}" loading="lazy">`).join("")}
      </div>
    `);
  }

  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  /* ── Footer ── */
  document.getElementById("year").textContent = new Date().getFullYear();

  const footerLinks = document.getElementById("footer-links");
  Object.values(SITE.links).forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noopener";
    footerLinks.appendChild(a);
  });
})();
