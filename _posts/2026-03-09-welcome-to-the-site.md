---
title: "Welcome to the Site"
date: 2026-03-09
categories:
  - meta
tags:
  - jekyll
  - minimal-mistakes
  - github-pages
excerpt: "Launching a GitHub Pages showcase built with Jekyll and Minimal Mistakes — a tour of the features."
header:
  teaser: /assets/images/teaser-default.png
  overlay_image: /assets/images/teaser-default.png
  overlay_filter: 0.5
toc: true
toc_sticky: true
---

Welcome! This site is a showcase of [Jekyll](https://jekyllrb.com/) with the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme, deployed natively on GitHub Pages. No Actions workflow required — GitHub Pages builds and deploys on every push to `main`.

## Why Another Site?

I already have [jacobpevans.com](https://jacobpevans.com) for the portfolio/resume, but GitHub Pages offers something different: a technical blog and showcase that lives alongside the code. The two complement each other.

The goals for this site:

1. **Demonstrate every layout type** Minimal Mistakes offers
2. **Real content** — not Lorem Ipsum
3. **Tasteful customizations** that enhance without distracting
4. **Zero build dependencies** — works with GitHub Pages' native Jekyll build

## Stack

```yaml
# _config.yml (excerpt)
remote_theme: "mmistakes/minimal-mistakes@4.26.2"
minimal_mistakes_skin: "dark"
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-paginate
  - jekyll-include-cache
  - jekyll-github-metadata
  - jemoji
```

The dark skin uses `#252a34` as the background and `#00adb5` as the accent color — a muted teal that works well for infrastructure/DevOps content without being garish.

## Custom Features

### Dynamic GitHub Repos

The [Portfolio](/portfolio/) page fetches repositories dynamically from the GitHub API using vanilla JavaScript with `sessionStorage` caching. No authentication needed for public repos (60 req/hr unauthenticated is plenty for a personal site).

```javascript
const CACHE_KEY = "github_repos_v1";
const cached = sessionStorage.getItem(CACHE_KEY);
if (cached) {
  renderCards(JSON.parse(cached));
} else {
  fetch(`https://api.github.com/users/JacobPEvans/repos?sort=pushed&per_page=20`)
    .then(r => r.json())
    .then(data => {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
      renderCards(data);
    });
}
```

### Terminal 404

The [404 page](/404.html) has a CSS-only terminal window with a blinking cursor — no JavaScript needed. It "shows" a failed `curl` command, a check of the nginx error log, and a `terraform state list` query. All flavor text, but it fits the DevOps aesthetic.

### Mermaid Diagrams + KaTeX

Both [Mermaid](https://mermaid.js.org/) diagrams and [KaTeX](https://katex.org/) math rendering are included via CDN in `_includes/head/custom.html`. The Mermaid theme is configured to match the site colors. See the [Markdown Showcase](/2026/03/09/markdown-showcase/) post for examples.

## Site Layout

```
~/git/JacobPEvans.github.io/main/
├── _config.yml          # Theme + plugins
├── _data/navigation.yml # Masthead nav
├── _pages/              # About, Portfolio, CV, Archives, Search
├── _posts/              # Blog posts
├── assets/css/          # Custom SCSS
├── assets/js/           # GitHub repos + back-to-top
└── index.html           # Splash landing page
```

## What's Next

- More posts on the infrastructure stack
- Detailed write-up on the Nix quartet
- Observability pipeline deep-dive

Thanks for visiting! :wave:
