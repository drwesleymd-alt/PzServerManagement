#!/bin/bash
# detect_install.sh — simple server installation detection script
# Scans for common Project Zomboid directories and SteamCMD installs.

COMMON_PATHS=("/home/games/pzserver" "/srv/pz" "/opt/pzserver" "/home/steam/steamcmd")

for p in "${COMMON_PATHS[@]}"; do
  if [ -d "$p" ]; then
    echo "found:$p"
  fi
done

# Try linuxgsm common path
if which pzserver 2>/dev/null; then
  echo "linuxgsm:$(which pzserver)"
fi

# Detect build by checking readme or files
# Build detection should be implemented on the backend with precise heuristics
