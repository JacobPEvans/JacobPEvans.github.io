---
title: "Portfolio"
permalink: /portfolio/
layout: single
classes: wide
author_profile: true
---

A showcase of infrastructure, observability, and AI development work.

## GitHub Repositories

<div id="github-repos-container">
  <p class="repo-cards-error">Loading repositories from GitHub API...</p>
</div>

<script src="/assets/js/github-repos.js"></script>

---

## Infrastructure

### terraform-proxmox
Provisions VMs and LXC containers on a Proxmox VE homelab cluster. Uses Terragrunt for DRY configuration, SOPS for secrets, and outputs a machine inventory consumed by Ansible.

**Tech**: Terraform · Terragrunt · Proxmox provider · SOPS/age · Doppler

### terraform-aws
AWS DR infrastructure including EC2, S3, IAM roles, and CloudFront distributions. Includes Splunk failover configuration.

**Tech**: Terraform · AWS · Terragrunt · aws-vault · SOPS

### ansible-proxmox
Configures the Proxmox VE host itself: networking, storage, users, and system-level settings. Uses Molecule for testing.

**Tech**: Ansible · Molecule · SOPS · community.proxmox collection

### ansible-proxmox-apps
Deploys and configures all applications on Proxmox VMs/containers: Cribl Edge, HAProxy, Splunk Universal Forwarder, and more.

**Tech**: Ansible · community.proxmox · SOPS · Doppler

---

## Observability

### VisiCore App for AI Observability
Dashboard Studio v2 dashboards for observing AI coding tool usage: Claude Code, Gemini, GitHub Copilot. Token consumption, cost tracking, latency analysis.

**Tech**: Splunk · Dashboard Studio v2 · SPL · OpenTelemetry

### VisiCore TA AI Observability
Technology Add-on with knowledge objects, OTel field aliases, and CIM mappings for AI telemetry ingestion into Splunk.

**Tech**: Splunk · CIM · OpenTelemetry · field extractions

### kubernetes-monitoring
Kubernetes monitoring stack running on OrbStack. Full OTel collector deployment, Cribl Edge for log routing, Cribl Stream for aggregation.

**Tech**: Kubernetes · Helm · OpenTelemetry · Cribl · Splunk

---

## Nix Configuration

### nix-darwin
macOS system configuration: Dock, Finder, keyboard, security settings, Homebrew packages, and LaunchDaemons. The source of truth for the system.

**Tech**: Nix · nix-darwin · Homebrew · Bitwarden Secrets Manager

### nix-home
User dev environment: CLI tools, shell (zsh), git configuration, tmux, VS Code, and all linters. Shared across all worktrees via home-manager.

**Tech**: Nix · home-manager · zsh · tmux

### nix-ai
AI coding tool configuration: Claude Code plugins, Gemini setup, GitHub Copilot, MCP servers, and the full skills/agents registry.

**Tech**: Nix · home-manager · Claude Code · PAL MCP

---

## AI & Automation

### ai-assistant-instructions
Shared AI assistant configurations providing orchestration rules, agent definitions, skills registry, and workflow automation for Claude, Gemini, and GitHub Copilot.

**Tech**: Claude Code · Markdown · YAML · Shell

### claude-code-plugins
Collection of Claude Code plugins providing git workflows, GitHub automation, infrastructure orchestration, AI delegation, and config management skills.

**Tech**: Claude Code · Shell · YAML
