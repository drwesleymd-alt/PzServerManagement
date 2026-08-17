// mods.js — primary, polished mod management module
// Responsibilities:
// - Parse Mods= and WorkshopItems= lines
// - Fetch human names from Steam Workshop API via backend
// - Add/remove/enable/disable/reorder
// - Validate dependencies and detect missing or delisted items
// - Auto-backup before modifications

export class ModsModule {
  constructor(api) { this.api = api; }

  async readModSection(instance) {
    // Returns structured {mods: [{id, enabled, source, workshop, name, dependencies}], raw: '...'}
    return this.api.rpc('pz.mods_read', instance);
  }

  async previewAdd(instance, {workshopId}) {
    // Backend will fetch metadata and return a preview including dependencies
    return this.api.rpc('pz.mods_preview_add', instance, workshopId);
  }

  async addMod(instance, modSpec) {
    // modSpec: {workshopId, position?}
    // Backend will backup mod section, download metadata, and update the file
    return this.api.rpc('pz.mods_add', instance, modSpec);
  }

  async removeMod(instance, id) { return this.api.rpc('pz.mods_remove', instance, id); }

  async enableMod(instance, id) { return this.api.rpc('pz.mods_enable', instance, id); }

  async disableMod(instance, id) { return this.api.rpc('pz.mods_disable', instance, id); }

  async reorder(instance, orderedIds) { return this.api.rpc('pz.mods_reorder', instance, orderedIds); }

  async checkUpdates(instance) { return this.api.rpc('pz.mods_check_updates', instance); }

  async backupSection(instance) { return this.api.rpc('pz.mods_backup', instance); }
}
