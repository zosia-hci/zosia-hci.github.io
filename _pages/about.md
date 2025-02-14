---
permalink: /
title: "Portfolio"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<div class="container">
  {% assign counter = 0 %}
  {% for project in site.publications reversed %}
    {% if project.onmain %}
      {% if counter == 0 %}
        <div class="contain3">
      {% endif %}
        <div class="about-box">
          <a href="{{ project.url | relative_url }}">
            <img src="{{ project.image }}" alt="{{ project.title }}">
          </a>
          <div class="centered">{{ project.categories | join: " " }}</div>
        </div>
      {% assign counter = counter | plus: 1 %}
      {% if counter == 3 %}
        </div> <!-- Close contain3 after 3 items -->
        {% assign counter = 0 %}
      {% endif %}
    {% endif %}
  {% endfor %}
  {% if counter > 0 %}
    </div> <!-- Close contain3 if leftover items exist -->
  {% endif %}
</div>

<div class="container">
  {% assign counter = 0 %}
  {% for project in site.portfolio %}
    {% if project.onmain %}
      {% if counter == 0 %}
        <div class="contain3">
      {% endif %}
        <div class="about-box">
          <a href="{{ project.url | relative_url }}">
            <img src="{{ project.image }}" alt="{{ project.title }}">
          </a>
          <div class="centered">{{ project.categories | join: " " }}</div>
        </div>
      {% assign counter = counter | plus: 1 %}
      {% if counter == 3 %}
        </div> <!-- Close contain3 after 3 items -->
        {% assign counter = 0 %}
      {% endif %}
    {% endif %}
  {% endfor %}
  {% if counter > 0 %}
    </div> <!-- Close contain3 if leftover items exist -->
  {% endif %}
</div>

