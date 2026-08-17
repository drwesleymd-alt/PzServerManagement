// rcon.js — secure RCON handling and live console

// Note: For security, the backend must avoid returning RCON password to the browser.
// Instead, the front-end opens a websocket proxied by the backend which performs authentication.

export class RconModule {
  constructor(api) {
    this.api = api;
    this.socket = null;
    this.onMessage = null;
  }

  async connect(instance) {
    // backend returns a WebSocket endpoint and a short-lived token
    const {ws_url, token} = await this.api.rpc('pz.rcon_connect', instance);
    this.socket = new WebSocket(ws_url + '?token=' + encodeURIComponent(token));
    this.socket.onmessage = (ev) => { if (this.onMessage) this.onMessage(ev.data); };
    this.socket.onopen = () => console.info('RCON socket open');
    this.socket.onclose = () => console.info('RCON socket closed');
  }

  send(cmd) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) throw new Error('RCON not connected');
    this.socket.send(cmd);
  }

  disconnect() {
    if (this.socket) this.socket.close();
    this.socket = null;
  }
}
