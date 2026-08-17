// backup.js — world backups

export class BackupModule {
  constructor(api) { this.api = api; }

  async list(instance) { return this.api.rpc('pz.backups_list', instance); }

  async create(instance, {label}) { return this.api.rpc('pz.backup_create', instance, {label}); }

  async restore(instance, backupId) { return this.api.rpc('pz.backup_restore', instance, backupId); }

  async download(instance, backupId) { return this.api.rpc('pz.backup_download', instance, backupId); }
}
