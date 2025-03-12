---
layout: archive
title: "Fun"
permalink: /fun/
author_profile: true
---

{% assign counter = 0 %}
  <div class="contain ">
    {% for item in site.fun %}
      {% if counter == 0 %}
        <div class="contain3">
      {% endif %}
          <div class="about-box">
            <a href="{{ item.permalink }}">
              <img src="/fun/images/{{ item.permalink | split: '/' | last }}.jpg" alt="{{ item.title }}" width="400">
            </a>
          </div>
      {% assign counter = counter | plus: 1 %}
      {% if counter == 3 %}
        </div>
        {% assign counter = 0 %}
      {% endif %}
    {% endfor %}
  </div>
