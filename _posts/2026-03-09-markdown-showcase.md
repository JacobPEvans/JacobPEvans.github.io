---
title: "Markdown Feature Showcase"
date: 2026-03-09
categories:
  - showcase
tags:
  - markdown
  - mermaid
  - katex
  - jekyll
excerpt: "A tour of every feature this site supports: Mermaid diagrams, KaTeX math, emoji, notice blocks, tables, code blocks, and more."
header:
  teaser: /assets/images/teaser-default.svg
toc: true
toc_sticky: true
---

This post demonstrates every feature the site supports. Useful as both a reference and a visual test of the theme.

## Mermaid Diagrams

Mermaid renders server-side via the CDN ES module, with a dark theme matching the site colors.

### Flowchart — Homelab Log Pipeline

<div class="mermaid">
flowchart LR
    A[UniFi Switch] -->|syslog :1514| B[HAProxy<br/>VM 190]
    B -->|syslog :1514| C[Cribl Edge<br/>181/182]
    C -->|HEC :8088| D[Splunk<br/>VM 200]
    C -->|NetFlow :2055| D
    style A fill:#393e46,stroke:#00adb5,color:#eaeaea
    style B fill:#393e46,stroke:#00adb5,color:#eaeaea
    style C fill:#393e46,stroke:#00adb5,color:#eaeaea
    style D fill:#393e46,stroke:#00adb5,color:#eaeaea
</div>

### Sequence Diagram — AI Orchestration

<div class="mermaid">
sequenceDiagram
    participant U as User
    participant O as Orchestrator<br/>(Claude)
    participant A1 as Subagent 1
    participant A2 as Subagent 2
    participant G as GitHub API
    U->>O: "Implement plan"
    O->>A1: Research task (parallel)
    O->>A2: Implementation task (parallel)
    A1-->>O: Findings
    A2->>G: Create PR
    G-->>A2: PR URL
    A2-->>O: PR created
    O-->>U: Summary + PR link
</div>

### Architecture Diagram — Nix Trio

<div class="mermaid">
graph TD
    ND[nix-darwin<br/>macOS system] --> NH[nix-home<br/>dev environment]
    ND --> NAI[nix-ai<br/>AI tools]
    NH --> SHELL[zsh + tmux]
    NAI --> CC[Claude Code<br/>+ plugins]
    NAI --> GEM[Gemini]
    NAI --> MCP[MCP servers]
    style ND fill:#252a34,stroke:#00adb5,color:#eaeaea
    style NH fill:#393e46,stroke:#6c757d,color:#eaeaea
    style NAI fill:#393e46,stroke:#6c757d,color:#eaeaea
</div>

---

## KaTeX Math

KaTeX renders both inline and display math.

### Inline Math

The Fibonacci sequence satisfies $F_n = F_{n-1} + F_{n-2}$ with $F_0 = 0, F_1 = 1$.

Euler's identity: $e^{i\pi} + 1 = 0$

### Display Math — Reliability Engineering

Mean Time to Recovery (MTTR) and Mean Time Between Failures (MTBF):

$$\text{Availability} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}$$

For a 99.9% SLA with 1-hour MTTR:

$$\text{MTBF} = \frac{0.999 \times 1}{1 - 0.999} = 999 \text{ hours}$$

### Series

$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6} \approx 1.6449$$

---

## Notice Blocks

{: .notice}
**Default notice**: This is a default notice block. Good for general information.

{: .notice--primary}
**Primary notice**: Important information that deserves emphasis.

{: .notice--info}
**Info notice**: Informational content. Use for tips and supplementary notes.

{: .notice--warning}
**Warning notice**: Something to be careful about.

{: .notice--danger}
**Danger notice**: Critical warning — destructive action ahead.

{: .notice--success}
**Success notice**: Confirmation that something worked correctly.

---

## Code Blocks

### HCL — Terraform Resource

```hcl
resource "proxmox_vm_qemu" "splunk" {
  name        = "splunk-enterprise"
  target_node = "pve01"
  vmid        = 200

  cores   = 4
  memory  = 8192
  balloon = 4096

  disk {
    type    = "virtio"
    storage = "local-lvm"
    size    = "100G"
  }

  network {
    model  = "virtio"
    bridge = "vmbr0"
    tag    = 10
  }
}
```

### YAML — Ansible Playbook

```yaml
---
- name: Configure Cribl Edge
  hosts: cribl_edge
  become: true

  vars:
    cribl_version: "4.9.0"
    cribl_port: 9000

  tasks:
    - name: Ensure Cribl Edge is installed
      ansible.builtin.package:
        name: "cribl-edge={{ cribl_version }}"
        state: present
      notify: restart cribl

    - name: Configure Cribl Edge inputs
      ansible.builtin.template:
        src: inputs.yml.j2
        dest: /opt/cribl/local/inputs.yml
        owner: cribl
        mode: "0640"
      notify: restart cribl
```

### Python — API Client with Retry

```python
import time
import httpx
from functools import wraps


def retry(max_attempts: int = 3, delay: float = 1.0):
    """Decorator for retrying failed API calls."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except httpx.HTTPStatusError as e:
                    if attempt == max_attempts - 1 or e.response.status_code < 500:
                        raise
                    time.sleep(delay * (2 ** attempt))
            return None
        return wrapper
    return decorator


@retry(max_attempts=3, delay=0.5)
def fetch_metrics(host: str, token: str) -> dict:
    """Fetch Cribl metrics from the REST API."""
    with httpx.Client(base_url=f"https://{host}:9000") as client:
        response = client.get(
            "/api/v1/system/metrics",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10.0,
        )
        response.raise_for_status()
        return response.json()
```

### Bash — SOPS Secret Decryption

```bash
#!/usr/bin/env bash
set -euo pipefail

SECRETS_FILE="${1:?Usage: $0 <secrets.yaml>}"
OUTPUT_DIR="${2:-/tmp/secrets}"

mkdir -p "${OUTPUT_DIR}"
chmod 700 "${OUTPUT_DIR}"

# Decrypt with SOPS using age key
sops --decrypt \
  --input-type yaml \
  --output-type dotenv \
  "${SECRETS_FILE}" \
  > "${OUTPUT_DIR}/.env"

chmod 600 "${OUTPUT_DIR}/.env"
echo "Secrets decrypted to ${OUTPUT_DIR}/.env"
```

### Go — Simple HTTP Health Check

```go
package main

import (
    "fmt"
    "net/http"
    "os"
    "time"
)

func healthCheck(url string, timeout time.Duration) (bool, error) {
    client := &http.Client{Timeout: timeout}
    resp, err := client.Get(url)
    if err != nil {
        return false, err
    }
    defer resp.Body.Close()
    return resp.StatusCode < 400, nil
}

func main() {
    urls := []string{
        "http://splunk:8000",
        "http://cribl:9000",
        "http://haproxy:1514",
    }

    for _, url := range urls {
        ok, err := healthCheck(url, 5*time.Second)
        if err != nil || !ok {
            fmt.Fprintf(os.Stderr, "FAIL: %s — %v\n", url, err)
            os.Exit(1)
        }
        fmt.Printf("OK:   %s\n", url)
    }
}
```

---

## Tables

### Infrastructure Inventory

| Host | VM ID | Role | RAM | CPU | IP |
|------|-------|------|-----|-----|-----|
| pve01 | — | Proxmox hypervisor | 64 GB | 16c | 192.168.1.10 |
| haproxy | 190 | Load balancer / syslog relay | 2 GB | 2c | 192.168.1.190 |
| cribl-01 | 181 | Cribl Edge node | 4 GB | 2c | 192.168.1.181 |
| cribl-02 | 182 | Cribl Edge node | 4 GB | 2c | 192.168.1.182 |
| splunk | 200 | Splunk Enterprise | 8 GB | 4c | 192.168.1.200 |

### AI Model Routing

| Task Type | Cloud Model | Local Model |
|-----------|-------------|-------------|
| Research & Analysis | Gemini 3 Pro | qwen3-next:80b |
| Complex Coding | Claude Opus 4.5 | qwen3-coder:30b |
| Code Review | Multi-model consensus | deepseek-r1:70b |
| Architecture | Claude Opus 4.5 | qwen3-next:80b |

---

## Emoji Support :tada:

Thanks to `jemoji`, GitHub-style emoji works in posts: :rocket: :computer: :wrench: :shield: :white_check_mark:

Infrastructure emojis: :cloud: :floppy_disk: :electric_plug: :bar_chart:

---

## Task Lists

- [x] Set up bare repo + worktree
- [x] Configure `_config.yml` with dark skin
- [x] Add custom CSS animations
- [x] Implement terminal-themed 404
- [x] Add dynamic GitHub repo cards
- [ ] Add feature images for splash page
- [ ] Set up custom domain (CNAME)

---

## Footnotes

Minimal Mistakes supports Kramdown footnotes.[^1] They render at the bottom of the page with back-links.

[^1]: Footnotes are processed by Kramdown and styled by Minimal Mistakes. They appear here at the bottom of the post.

---

## Blockquotes

> Infrastructure as code is not about writing YAML.
> It's about treating your infrastructure with the same discipline
> you'd bring to application code.

> The best monitoring system is the one that pages you
> *before* your users notice something is wrong.
> — Observability wisdom

---

*End of showcase. Back to [blog](/posts/) or [home](/).*
