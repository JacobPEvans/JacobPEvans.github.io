# jacobpevans.github.io

Personal showcase site — [jacobpevans.github.io](https://jacobpevans.github.io)

Built with Jekyll + [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) dark skin, because light mode is a lifestyle choice I don't respect.

---

## What's in here

| Feature | Honest description |
|---------|-------------------|
| Splash page | Hero overlay, feature rows, all the classics |
| Blog | Notes to future-me, formatted for Google |
| Portfolio | Live GitHub repo cards from the API — lazy but cached |
| CV | The formal stuff |
| Terminal 404 | `curl: (404) Resource not found` — CSS-only, unreasonably proud of it |
| Mermaid diagrams | Flowcharts, sequence diagrams, architecture diagrams |
| KaTeX math | $Availability = \frac{MTBF}{MTBF + MTTR}$ — yes, in a blog post |
| Search | Lunr.js. We're not spinning up Elasticsearch for a personal site. |

## Installation

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

Or just push to `main`. GitHub Pages builds it natively — no Actions workflow, no Docker, no drama. First deployment actually worked on the first try. I'm still suspicious.

## Usage

Add posts to `_posts/` with filename `YYYY-MM-DD-title.md` and the standard front matter:

```yaml
---
title: "Post Title"
date: 2026-03-09
categories: [infra]
tags: [terraform, ansible]
excerpt: "One sentence summary."
---
```

Add pages to `_pages/` with a `permalink:` in the front matter. Update `_data/navigation.yml` to add them to the masthead nav.

## Structure

```
main/
├── _config.yml           # Theme, plugins, author, SEO
├── _data/navigation.yml  # Masthead links
├── _pages/               # About, Portfolio, CV, archives, search
├── _posts/               # Blog posts
├── assets/
│   ├── css/main.scss     # Custom styles (animations, terminal 404, repo cards)
│   └── js/               # GitHub API fetcher + back-to-top button
└── index.html            # Splash landing page
```

## Missing pieces

Placeholder images are needed for the splash hero and post teasers — see [`assets/images/PLACEHOLDER.txt`](assets/images/PLACEHOLDER.txt).

Favicons too. See [`assets/images/favicons/README.txt`](assets/images/favicons/README.txt).

## Worktrees

Follows the bare repo + worktree pattern: `~/git/JacobPEvans.github.io/main/` for normal work, `feature/*` for everything else.

---

*Also have a 75-gallon reef tank. The corals have better uptime than most of my PRs.*
