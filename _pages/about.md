---
title: "About"
permalink: /about/
layout: single
author_profile: true
toc: true
toc_label: "On This Page"
toc_icon: "terminal"
toc_sticky: true
---

## Hi, I'm Jacob Evans

I'm a DevOps and infrastructure engineer who treats infrastructure like software: version-controlled, tested, and automated from the first commit. My homelab is my lab, and everything I build there eventually makes its way into production thinking.

My current focus areas:

- **Infrastructure as Code** — Terraform and Ansible managing a Proxmox homelab
- **Observability** — End-to-end telemetry pipelines with Cribl and Splunk
- **AI-Assisted Development** — Multi-model workflows with Claude Code, Gemini, and local Ollama
- **Nix Ecosystem** — Reproducible macOS dev environments via nix-darwin + home-manager

---

## The Homelab

My homelab runs on **Proxmox VE** with a fleet of LXC containers and VMs managed entirely through code:

- `terraform-proxmox` provisions the VMs and containers
- `ansible-proxmox` configures the Proxmox host itself
- `ansible-proxmox-apps` deploys all the applications

Nothing touches the hypervisor manually. If it can't be expressed in HCL or YAML, it doesn't exist.

### Log Pipeline

```
UniFi → HAProxy (190) → Cribl Edge (181/182) → Splunk (200)
:1514     :1514            :1514                  :8088 HEC
```

Cribl handles transformation, routing, and fan-out. Splunk gets structured, enriched data. The whole thing is observable with custom dashboards.

---

## AI Development Philosophy

I use AI tools as **force multipliers**, not replacements. The goal is:

1. **Research first** — verify tool capabilities with Context7, web search, and API docs before writing custom code
2. **Delegate** — preserve main context for decisions; subagents do the heavy lifting
3. **Parallelize** — independent tasks run concurrently across multiple models
4. **Validate** — every AI output goes through verification before merge

My Claude Code setup has 20+ custom skills, plugins for git workflows, Ansible automation, GitHub PR management, and infrastructure orchestration.

---

## The Nix Quartet

Four interlocking Nix flakes manage my entire macOS development environment:

| Flake | Purpose |
|-------|---------|
| `nix-darwin` | macOS system config, Homebrew, LaunchDaemons |
| `nix-home` | CLI tools, shell, git, tmux, VS Code, linters |
| `nix-ai` | Claude Code, Gemini, Copilot, MCP servers, plugins |
| `nix-screenpipe` | AI screen/audio recording |

Every worktree gets an automatic dev shell via `direnv` + Nix flakes. `cd` into a repo and the right tools are just there.

---

## Tech Stack Quick Reference

### Always Reach For
- **Nix** for reproducibility
- **Terraform** for cloud/VM provisioning
- **Ansible** for configuration management
- **Cribl** for log pipelines
- **Splunk** for analysis and dashboards
- **Claude Code** for development acceleration

### Languages I Write
- **HCL** (Terraform) — daily
- **YAML** (Ansible, Kubernetes) — daily
- **Python** — automation and tooling
- **Bash** — glue scripts
- **Nix** — system configuration

---

## Find Me

- **GitHub**: [github.com/JacobPEvans](https://github.com/JacobPEvans)
- **Portfolio**: [jacobpevans.com](https://jacobpevans.com)
- **This site**: Browse the [portfolio](/portfolio/) or [blog](/posts/)
