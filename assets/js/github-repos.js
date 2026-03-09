/**
 * Dynamic GitHub repository cards
 * Fetches repos from GitHub API, renders cards with language badges + star counts.
 * Uses sessionStorage to cache results and avoid rate limiting.
 */
(function () {
  "use strict";

  const GITHUB_USER = "JacobPEvans";
  const CACHE_KEY = "github_repos_v1";
  const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
  const MAX_REPOS = 20;
  const CONTAINER_ID = "github-repos-container";

  // GitHub language color map (common languages)
  const LANG_COLORS = {
    Python:     "#3572A5",
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    HCL:        "#844FBA",
    Shell:      "#89e051",
    Nix:        "#7e7eff",
    Ruby:       "#701516",
    Go:         "#00ADD8",
    Rust:       "#dea584",
    YAML:       "#cb171e",
    HTML:       "#e34c26",
    CSS:        "#563d7c",
    Dockerfile: "#384d54",
    Makefile:   "#427819",
  };

  function getLanguageColor(lang) {
    return LANG_COLORS[lang] || "#6c757d";
  }

  /**
   * Create a DOM element with optional className and textContent.
   */
  function el(tag, opts) {
    const node = document.createElement(tag);
    if (opts && opts.className) node.className = opts.className;
    if (opts && opts.text != null) node.textContent = opts.text;
    return node;
  }

  function buildCard(repo) {
    const card = el("div", { className: "repo-card" });

    // Repo name as a link
    const nameP = el("p", { className: "repo-name" });
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = repo.name;
    nameP.appendChild(link);
    card.appendChild(nameP);

    // Description
    const descP = el("p", { className: "repo-description" });
    if (repo.description) {
      descP.textContent = repo.description;
    } else {
      const em = document.createElement("em");
      em.textContent = "No description";
      descP.appendChild(em);
    }
    card.appendChild(descP);

    // Meta row: language + stars
    const meta = el("div", { className: "repo-meta" });

    if (repo.language) {
      const langSpan = el("span", { className: "repo-language" });
      const dot = el("span", { className: "lang-dot" });
      dot.style.background = getLanguageColor(repo.language);
      const langText = document.createTextNode(" " + repo.language);
      langSpan.appendChild(dot);
      langSpan.appendChild(langText);
      meta.appendChild(langSpan);
    }

    if (repo.stargazers_count > 0) {
      const starsSpan = el("span", { className: "repo-stars" });
      starsSpan.textContent = "\u2605 " + repo.stargazers_count;
      meta.appendChild(starsSpan);
    }

    card.appendChild(meta);
    return card;
  }

  function renderCards(repos) {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    if (!repos || repos.length === 0) {
      container.textContent = "No public repositories found.";
      return;
    }

    // Filter out forks and the .github.io repo itself, sort by pushed_at
    const filtered = repos
      .filter((r) => !r.fork && r.name !== "JacobPEvans.github.io")
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, MAX_REPOS);

    const grid = el("div", { className: "repo-cards-grid" });
    filtered.forEach((repo) => grid.appendChild(buildCard(repo)));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(grid);
  }

  function renderError(message) {
    const container = document.getElementById(CONTAINER_ID);
    if (!container) return;

    const p = el("p", { className: "repo-cards-error", text: message + " " });
    const a = document.createElement("a");
    a.href = "https://github.com/JacobPEvans?tab=repositories";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "View on GitHub instead";
    p.appendChild(a);
    a.after(document.createTextNode("."));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(p);
  }

  function loadRepos() {
    // Check cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL_MS) {
          renderCards(data);
          return;
        }
      }
    } catch (_) {
      // sessionStorage may be unavailable (private browsing, etc.)
    }

    // Fetch from GitHub API
    fetch(
      "https://api.github.com/users/" + GITHUB_USER + "/repos?sort=pushed&per_page=50&type=owner",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      }
    )
      .then(function (response) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit reached. Try again in an hour.");
        }
        if (!response.ok) {
          throw new Error("GitHub API returned " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        // Cache the result
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data: data })
          );
        } catch (_) {
          // sessionStorage write failed, continue without cache
        }
        renderCards(data);
      })
      .catch(function (err) {
        console.warn("GitHub repos fetch failed:", err.message);
        renderError("Could not load repositories from GitHub.");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadRepos);
  } else {
    loadRepos();
  }
})();
