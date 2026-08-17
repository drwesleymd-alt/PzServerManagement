// logs.js — live tail and searchable viewer

export class LogsModule {
  constructor(api) { this.api = api; }

  async tail(instance, onLine) {
    // Backend should provide a websocket tail stream endpoint
    const {ws_url, token} = await this.api.rpc('pz.logs_tail', instance);
    const sock = new WebSocket(ws_url + '?token=' + encodeURIComponent(token));
    sock.onmessage = (ev) => onLine(ev.data);
    return () => sock.close();
  }

  async search(instance, pattern, {from=0, limit=100} = {}) { return this.api.rpc('pz.logs_search', instance, pattern, {from, limit}); }
}
