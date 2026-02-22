---
layout: archive
title: "News"
permalink: /news/
author_profile: false
---

<div class="news-container">
  {% for post in site.posts limit: 10 %}
    {% unless post.date > site.time %}
      <article class="news-item">
        <div class="news-date">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%B %d, %Y" }}
          </time>
        </div>
        <div class="news-content">
          <h3 class="news-title">
            <a>{{ post.title }}</a>
          </h3>
          {% if post.excerpt %}
            <p class="news-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
          {% endif %}
          {% if post.tags.size > 0 %}
            <div class="news-tags">
              {% for tag in post.tags %}
                <span class="news-tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </article>
    {% endunless %}
  {% endfor %}

</div>
