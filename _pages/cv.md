---
title: "Curriculum Vitae"
permalink: /cv/
layout: single
classes: wide
author_profile: false
toc: true
toc_label: "CV Sections"
toc_icon: "file-alt"
---

## Summary

DevOps and infrastructure engineer focused on automation, observability, and reliability engineering. Experienced with on-premises homelab infrastructure, public cloud (AWS), and modern AI-assisted development workflows.

---

## Technical Skills

### Infrastructure & Automation
- **IaC**: Terraform, Terragrunt, OpenTofu, Packer
- **Configuration Management**: Ansible, Molecule
- **Virtualization**: Proxmox VE, LXC/CT, QEMU/KVM
- **Cloud**: AWS (EC2, S3, IAM, Bedrock, CloudFront)
- **Nix Ecosystem**: NixOS, nix-darwin, home-manager, flakes

### Observability & Data
- **Log Management**: Splunk Enterprise (admin + development)
- **Pipeline**: Cribl Stream & Cribl Edge (OTel, routing, transforms)
- **Protocol**: OpenTelemetry (traces, metrics, logs), syslog, NetFlow
- **Monitoring**: HAProxy stats, custom Splunk dashboards

### Networking & Security
- **Networking**: UniFi, VLANs, HAProxy, syslog forwarding
- **Secrets**: SOPS + age, Doppler, Bitwarden Secrets Manager, AWS Secrets Manager
- **DNS**: Pi-hole, local DNS resolution

### Development & AI
- **Languages**: Python, HCL (Terraform), YAML, Bash, Nix
- **AI Tools**: Claude Code, Gemini Code Assist, GitHub Copilot, Ollama (local)
- **Orchestration**: Multi-model AI workflows, PAL MCP, Claude skills/plugins
- **Version Control**: Git (worktrees, bare repos), GitHub

### Containers & Kubernetes
- **Containers**: Docker, Podman
- **Kubernetes**: OrbStack k8s, Helm, Helmfile, kubectl, k9s

---

## Projects

### Homelab Infrastructure Stack
Self-hosted, fully automated infrastructure:
- **terraform-proxmox**: Provisions VMs and LXC containers on Proxmox VE
- **ansible-proxmox**: Configures Proxmox host and system-level settings
- **ansible-proxmox-apps**: Deploys Cribl, HAProxy, Splunk clients, and services

### Observability Pipeline
End-to-end telemetry from network to dashboard:
- UniFi syslog → HAProxy → Cribl Edge → Splunk
- NetFlow pipeline for network traffic analysis
- AI coding tool observability with custom Splunk app (**VisiCore**)

### Nix Configuration Trio
Three interlocking Nix flakes managing a complete macOS development environment:
- **nix-darwin**: macOS system, Homebrew, LaunchDaemons
- **nix-home**: CLI tools, shell, git, tmux, VS Code
- **nix-ai**: Claude Code, Gemini, Copilot, MCP servers, plugins

### AI Development Toolchain
Multi-model orchestration platform:
- Claude Code with 20+ custom skills and plugins
- External model routing via PAL MCP (Gemini, GPT, local Ollama)
- Automated workflows: pre-commit review, PR analysis, infrastructure planning

---

## Open Source & Community

- [GitHub Profile](https://github.com/JacobPEvans) — infrastructure and AI tooling repos
- [jacobpevans.com](https://jacobpevans.com) — portfolio and resume site

---

## Education

Bachelor's Degree in Information Technology

---

*This CV was last updated March 2026.*
