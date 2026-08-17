# README.md

Cockpit Project Zomboid
=======================

A modern Cockpit plugin for managing Project Zomboid dedicated servers (Build 41 & Build 42) with full server control, config editing, RCON, player management, and advanced mod management.

Features
--------
- Server lifecycle: detect installation, start/stop/restart/force kill, real-time status (PID, uptime, CPU/RAM).
- Configuration management: form + raw editing of .ini and SandboxVars.lua, backup/restore, multi-instance.
- RCON console: live terminal with history, proxied securely via backend.
- Player management: live list, kick/ban/teleport/give/whitelist.
- Mod management (primary feature): human-readable mod names from Steam Workshop, search/add by name or ID, dependency checks, drag-and-drop reorder, enable/disable/remove, validation, auto-backups.
- Logs & Monitoring: live tail, searchable viewer, basic metrics.
- Backups: one-click world backup, list and restore.
- Extras: broadcast messages, weather controls, multi-server support, dark mode, mobile-friendly, admin-only permissions.

Repository layout
-----------------
- manifest.json — Cockpit plugin manifest
- index.html — standalone test page
- src/ — modular JavaScript modules (status, config, rcon, players, mods, logs, backup, ui)
- static/styles/ — CSS
- scripts/ — helper scripts and API notes
- examples/ — systemd unit example
- README.md, LICENSE, .gitignore, package.json, Makefile

Installation
------------
Development install (local test)
1. Copy this folder into your Cockpit `~/.local/share/cockpit` or use the `cockpit` dev tooling.
2. Open index.html in a browser for basic UI testing, or install to a Cockpit server and navigate to the plugin.

System install (server)
1. Place files under `/usr/share/cockpit` or package as RPM/DEB following Cockpit packaging guidelines. The manifest.json is required.
2. Ensure the webserver or cockpit instance can serve the `cockpit-project-zomboid` path.
3. Backend components: you must implement the server-side RPC endpoints used by the front-end (pz.*). Examples and helper scripts are in `scripts/`.

Backend notes
-------------
This repository provides a full frontend and helper scripts. For production you must implement backend endpoints with secure handling:
- RPC endpoints (pz.detect_install, pz.status, pz.start, pz.stop, pz.instances, pz.read_config, pz.write_config, pz.mods_*, pz.rcon_connect, pz.logs_tail, pz.backup_*)
- RCON must be proxied via a server-side websocket adapter which holds the password. Never expose the RCON password to the browser.
- Steam API key: store in a server-side secret and proxy workshop metadata requests. See scripts/steamworkshop_api_notes.md

Build 41 vs Build 42
--------------------
- The PZ server layout changed between Build 41 and Build 42; paths to configs, mods, and workshop items may differ.
- Detection: backend should detect build by checking known files (e.g., server.sh, dedicated-server binary name, or specific manifest files).
- The frontend modules are build-agnostic. Backend should normalize responses to the schema the frontend expects.

Mod Management Details
----------------------
This plugin prioritizes mod management:
- Reading Mods= and WorkshopItems= lines and presenting them in a table with human-friendly names (via Steam Workshop metadata fetched server-side).
- Allows searching by name or Workshop ID. When a user selects a Workshop ID to add, backend previews dependencies.
- Reordering is validated and suggestions (framework-first) are shown.
- Auto-backups of the mod section are created before changes; users can restore previous mod states.
- Validation includes missing deps, unknown IDs, delisted mods, map order checks.

Security and Permissions
------------------------
- Only admins should be able to manage servers. Integrate with Cockpit's authorization API or your system's roles.
- RCON passwords and Steam API keys must be stored server-side in secure files or secret managers. Use systemd credentials if available.

Development / Watch
-------------------
- This starter repo is intentionally simple and unbundled. For bigger projects add a bundler (webpack, rollup) and linters.
- npm run build will copy source into `dist/` for packaging.

Screenshots
-----------
(placeholder) images/screenshots to be added.

First-time setup (Admin)
------------------------
1. Install Project Zomboid dedicated server using SteamCMD or your chosen method.
2. Ensure a `games` user exists and server files are owned appropriately.
3. Configure a systemd unit (examples/pzserver.service) for each instance.
4. Implement or deploy the backend RPC handlers. Example backend pseudocode is included as comments in scripts/.
5. Optionally configure a Steam API key on the server and place it in `/etc/pzserver/steam_api_key` (backend should read it).

How to contribute
-----------------
Contributions are welcome. Please open issues or PRs. Add tests for backend behavior and secure handling of secrets.
