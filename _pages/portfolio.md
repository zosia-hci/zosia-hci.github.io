---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

<div class="container">
    <!-- Projects WITH descriptions -->
    <div class="projects-with-descriptions">
        {% for project in site.portfolio %}
            {% if project.description %}
            <div class="about-row">
                <a href="{{ project.url }}">
                    <div class="row-image">
                        <img src="{{ project.image }}" alt="{{ project.title }}">
                    </div>
                </a>
                <a href="{{ project.url }}">
                    <div class="row-text">
                        <p style="color: #472E56"> {{ project.categories | join: ' '}}</p>
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.description }}</p>
                    </div>
                </a>
            </div>
            {% endif %}
        {% endfor %}
    </div>

    {% assign counter = 0 %}
    {% for project in site.portfolio %}
        {% unless project.description %}
            {% if counter == 0 %}
            <div class="contain3">
            {% endif %}
                <div class="about-row3">
                    <a href="{{ project.url }}">
                        <img src="{{ project.image }}" alt="{{ project.title }}">
                    </a>  
                </div>
            {% assign counter = counter | plus: 1 %}
            {% if counter == 3 %}
                </div> <!-- Close contain3 after 3 items -->
                {% assign counter = 0 %}
            {% endif %}
        {% endunless %}
    {% endfor %}
    {% if counter > 0 %}
        </div> <!-- Close contain3 if leftover items exist -->
    {% endif %}
</div>
