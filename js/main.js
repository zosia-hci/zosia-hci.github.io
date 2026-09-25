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

  function renderRichText(text) {
    if (!text) return "";

    return String(text)
      .replace(/\[(.*?)\]\((https?:\/\/[^)\s]+)\)/g, (_match, label, url) => {
        const safeLabel = label.replace(/"/g, "&quot;");
        const safeUrl = url.replace(/"/g, "&quot;");
        return `<a href="${safeUrl}" target="_blank" rel="noopener" class="text-link">${safeLabel}</a>`;
      })
      .replace(/\n/g, "<br>");
  }

  /* ── Render a _portfolio markdown body as HTML, keeping images inline where they appear ── */
  function renderProjectBody(markdown, base) {
    if (!markdown) return "";

    const resolveSrc = (src) => (/^(https?:)?\//i.test(src) ? src : `${base || ""}${src}`);

    const text = String(markdown)
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
      .replace(/<div class="d-flex">\s*<\/div>/gi, "")
      .replace(/^\s*<br>\s*$/gim, "")
      .replace(/<h[1-6]>\s*(.*?)\s*<\/h[1-6]>/gi, "# $1")
      .replace(/<img\s+src=['"]([^'"]+)['"][^>]*>/gi, (_match, src) => `<img src="${resolveSrc(src)}" alt="" loading="lazy">`)
      .replace(/\[(.*?)\]\((https?:\/\/[^)\s]+)\)/g, (_match, label, url) => {
        const safeLabel = label.replace(/"/g, "&quot;");
        const safeUrl = url.replace(/"/g, "&quot;");
        return `<a href="${safeUrl}" target="_blank" rel="noopener" class="text-link">${safeLabel}</a>`;
      });

    const blocks = [];
    let paragraph = [];
    let list = [];
    let imageRun = [];

    const flushParagraph = () => {
      if (paragraph.length) blocks.push(`<p>${paragraph.join(" ")}</p>`);
      paragraph = [];
    };
    const flushList = () => {
      if (list.length) blocks.push(`<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`);
      list = [];
    };
    const flushImages = () => {
      if (imageRun.length) blocks.push(`<div class="lightbox-images">${imageRun.join("")}</div>`);
      imageRun = [];
    };

    text.split("\n").forEach((raw) => {
      const line = raw.trim();
      const imageOnly = /^(<img[^>]*>\s*)+$/i.test(line);
      const h2 = !imageOnly && line.match(/^##\s+(.*)/);
      const h1 = !imageOnly && !h2 && line.match(/^#\s+(.*)/);
      const bullet = !imageOnly && line.match(/^\*\s+(.*)/);

      if (!line) {
        flushParagraph();
        flushList();
        flushImages();
      } else if (imageOnly) {
        flushParagraph();
        flushList();
        imageRun.push(line);
      } else if (h2) {
        flushParagraph();
        flushList();
        flushImages();
        blocks.push(`<h5>${h2[1]}</h5>`);
      } else if (h1) {
        flushParagraph();
        flushList();
        flushImages();
        blocks.push(`<h4>${h1[1]}</h4>`);
      } else if (bullet) {
        flushParagraph();
        flushImages();
        list.push(bullet[1]);
      } else if (list.length) {
        list[list.length - 1] += ` ${line}`;
      } else {
        flushImages();
        paragraph.push(line);
      }
    });
    flushParagraph();
    flushList();
    flushImages();

    return blocks.join("\n");
  }

  /* ── Populate hero ── */
  document.getElementById("hero-title").textContent = SITE.title;
  document.getElementById("hero-tagline").textContent = SITE.tagline;
  document.getElementById("hero-bio").innerHTML = renderRichText(SITE.bio);
  document.getElementById("hero-about").innerHTML = renderRichText(SITE.about);

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


  const contactText = document.getElementById("contact-text");
  contactText.textContent = SITE.contact.intro;
  
  /* ── News ── */
  const newsList = document.getElementById("news-list");
  NEWS.forEach((item) => {
    const el = document.createElement("div");
    el.className = "news-item";
    el.innerHTML = `
      <span class="news-date">${item.date}</span>
      <span class="news-content"><a class="news-title">${item.title}</a><a class="news-body"> ${item.body}</a></span>
      
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
        <img src="${project.images[0]}" alt="" loading="lazy">
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

  /* -─ Scroller ── */
  // const scroller = document.getElementById("scroller");
  // const scrollerContent = scroller.querySelector("div.innerScrollArea ul");
  // ILLUSTRATIONS.forEach((item) => {
  //   const li = document.createElement("li");
  //   li.innerHTML = `<img src="${item.image}" alt="${item.title}" height="400" loading="lazy">`;
  //   scrollerContent.appendChild(li);
  // });

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
      ${
        project.body
          ? `<div class="lightbox-body">${renderProjectBody(project.body, project.base)}</div>`
          : `<div class="lightbox-images">${project.images.map((src) => `<img src="${src}" alt="${project.title}" loading="lazy">`).join("")}</div>`
      }
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
