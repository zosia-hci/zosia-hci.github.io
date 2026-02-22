---
permalink: /
title:
author_profile: false
redirect_from: 
  - /about/
  - /about.html
---

<div class="home-container home-page">
  <div class="home-layout">
    <!-- Left Column: Profile + Bio + News -->
    <div class="home-left">
      <!-- Profile Picture -->
      <div class="home-profile">
        <img src="/images/{{ site.author.avatar }}" alt="{{ site.name }}" class="profile-image">
      </div>
      
      <!-- Bio -->
      <div class="home-bio">
        <h1 class="bio-title">Hi! I'm {{ site.author.name | remove: '<h2>' | remove: '</h2>' | strip_html }}.</h1>
        <p class="bio-text">{{ site.author.bio }}</p>
      </div>

      <!-- Recent Events/News -->
      <section class="home-section">
        <h2 class="section-title">Recent Events</h2>
        <div class="events-list">
          {% assign recent_posts = site.posts | where_exp: "post", "post.date <= site.time" | limit: 5 %}
          {% for post in recent_posts %}
            <div class="event-item">
              <div class="event-date">{{ post.date | date: "%B %Y" }}</div>
              <div class="event-content">
                <a>{{ post.title }}</a>
              </div>
            </div>
          {% endfor %}
          {% if recent_posts.size == 0 %}
            <div class="event-item">
              <div class="event-content">No recent events. Check back soon!</div>
            </div>
          {% endif %}
          <div class="section-link">
            <a href="/news/">Show All</a>
          </div>
        </div>
      </section>
    </div>

    <!-- Right Column: Publications + Projects -->
    <div class="home-right">
      <!-- Selected Publications Section -->
      <section class="home-section">
        <h2 class="section-title">Selected Publications</h2>
        <div class="publications-grid">
          {% assign selected_pubs = site.publications | where: "onmain", true | sort: "date" | reverse | limit: 3 %}
          {% for pub in selected_pubs %}
            <article class="publication-card">
              <a href="{{ pub.url | relative_url }}" class="publication-link">
                <div class="publication-image">
                  <img src="{{ pub.image }}" alt="{{ pub.title }}">
                </div>
                <div class="publication-info">
                  <h3 class="publication-title">{{ pub.title }}</h3>
                  {% if pub.citation %}
                    <p class="publication-authors">{{ pub.citation | strip_html }}</p>
                  {% endif %}
                  {% if pub.venue %}
                    <p class="publication-venue">{{ pub.venue }} {{ pub.date | date: "%Y" }}</p>
                  {% endif %}
                </div>
              </a>
            </article>
          {% endfor %}
        </div>
        <div class="section-link">
          <a href="/publications/">see all</a>
        </div>
      </section>

      <!-- Selected Projects Section -->
      <section class="home-section">
        <h2 class="section-title">Selected Projects</h2>
        <div class="projects-grid">
          {% assign selected_projects = site.portfolio | where: "onmain", true | limit: 3 %}
          {% for project in selected_projects %}
            <article class="project-card">
              <a href="{{ project.url | relative_url }}" class="project-link">
                <div class="project-image">
                  <img src="{{ project.image }}" alt="{{ project.title }}">
                </div>
                <div class="project-info">
                  {% if project.categories %}
                    <div class="project-categories">{{ project.categories | join: " " }}</div>
                  {% endif %}
                  <h3 class="project-title">{{ project.title }}</h3>
                  {% if project.excerpt %}
                    <p class="project-excerpt">{{ project.excerpt | strip_html | truncatewords: 20 }}</p>
                  {% endif %}
                </div>
              </a>
            </article>
          {% endfor %}
        </div>
        <div class="section-link">
          <a href="/portfolio/">see all</a>
        </div>
      </section>
    </div>
  </div>
</div>
