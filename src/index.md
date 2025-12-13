---
layout: layout.njk
title: Home
---

# Welcome

Below are the latest posts:

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <small>— {{ post.date | date("long") }}</small>
    <span>Base URL {{ site.baseUrl }}</span>
  </li>
{% endfor %}
</ul>
