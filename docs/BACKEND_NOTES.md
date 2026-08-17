# Minimal backend example (pseudocode)

This repository focuses on frontend. A production-ready backend must:

- Provide RPC endpoints named in the front-end (pz.*)
- Use system calls carefully (avoid command injection), validate paths, and run actions as an unprivileged user
- Proxy RCON with short-lived websocket tokens
- Use Steam Web API server-side to enrich mod metadata

Example responsibilities:
- pz.detect_install: search known install paths and return detected instances
- pz.status: return pid, uptime, cpu, ram, running boolean
- pz.start / pz.stop / pz.restart: start/stop via systemd if available (systemctl start pzserver@instance), otherwise use screen/tmux commands or start script
- pz.mods_read: parse mods.txt or server.ini and return structured mod list
- pz.mods_add / remove / reorder: create backup, update file, and return new mod list

Do not store RCON or API keys in the browser.
