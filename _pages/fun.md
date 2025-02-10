---
layout: archive
title: "Fun"
permalink: /fun/
author_profile: true
---

<div class="container2">
  {% for item in site.fun %}
    <div class="about-box">
      <a href="{{ item.permalink }}">
        <img src="/fun/images/{{ item.permalink | split: '/' | last }}.jpg" alt="{{ item.title }}" width="400">
      </a>
    </div>
  {% endfor %}
</div>
