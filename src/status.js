// status.js — server lifecycle and health polling module

export class StatusModule {
  constructor(api) {
    this.api = api;
    this.pollInterval = 3000; // ms
    this.timer = null;
    this.listeners = [];
  }

  async detectInstallation() {
    // Backend should implement detection; this is a placeholder call to cockpit's rpc
    try {
      const res = await this.api.rpc('pz.detect_install');
      return res;
    } catch (e) {
      console.error('detectInstallation failed', e);
      return {found: false};
    }
  }

  async getStatus() {
    try {
      return await this.api.rpc('pz.status');
    } catch (e) {
      return {running: false, error: e.message};
    }
  }

  async start() {
    return this.api.rpc('pz.start');
  }

  async stop(force=false) {
    return this.api.rpc('pz.stop', {force});
  }

  async restart() {
    return this.api.rpc('pz.restart');
  }

  onUpdate(fn) { this.listeners.push(fn); }

  async pollOnce() {
    const status = await this.getStatus();
    for (const fn of this.listeners) fn(status);
    return status;
  }

  startPolling() {
    if (this.timer) return;
    this.pollOnce();
    this.timer = setInterval(() => this.pollOnce(), this.pollInterval);
  }

  stopPolling() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
