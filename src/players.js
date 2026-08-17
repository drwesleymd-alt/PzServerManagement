// players.js — live player list and management actions

export class PlayersModule {
  constructor(api) { this.api = api; }

  async list(instance) { return this.api.rpc('pz.players', instance); }

  async kick(instance, steamId, reason) { return this.api.rpc('pz.player_kick', instance, steamId, reason); }

  async ban(instance, steamId, duration, reason) { return this.api.rpc('pz.player_ban', instance, steamId, duration, reason); }

  async teleport(instance, steamId, x,y,z) { return this.api.rpc('pz.player_teleport', instance, steamId, {x,y,z}); }

  async giveItem(instance, steamId, item, count=1) { return this.api.rpc('pz.player_give', instance, steamId, {item, count}); }

  async whitelist(instance, steamId) { return this.api.rpc('pz.player_whitelist', instance, steamId); }
}
