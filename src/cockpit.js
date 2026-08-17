// Entry point for Cockpit plugin UI
// This file wires the modular components together and exposes minimal cockpit API hooks.

import {StatusModule} from './status.js';
import {ConfigModule} from './config.js';
import {RconModule} from './rcon.js';
import {PlayersModule} from './players.js';
import {ModsModule} from './mods.js';
import {LogsModule} from './logs.js';
import {BackupModule} from './backup.js';
import {UI} from './ui.js';

const appRoot = document.getElementById('pz-app');

const modules = {};

async function init() {
  // Initialize modules with a shared API object allowing backend RPC calls through cockpit.
  const api = {
    rpc: window.cockpit ? cockpit.call : (method, ...args) => fetch(`/api/${method}`, {method: 'POST', body: JSON.stringify(args)}),
    readSecret: async (path) => {
      // Read secrets via cockpit if available. Implement secure storage on server side.
      if (window.cockpit) return cockpit.file(path).read();
      return null;
    }
  };

  modules.status = new StatusModule(api);
  modules.config = new ConfigModule(api);
  modules.rcon = new RconModule(api);
  modules.players = new PlayersModule(api);
  modules.mods = new ModsModule(api);
  modules.logs = new LogsModule(api);
  modules.backup = new BackupModule(api);

  UI.render(appRoot, modules);
  await modules.status.startPolling();
}

// Support both module import and direct script include
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', init);
}

export {init};
