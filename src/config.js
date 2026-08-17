// config.js — editing .ini and SandboxVars.lua (form + raw)

export class ConfigModule {
  constructor(api) {
    this.api = api;
  }

  async listInstances() {
    return this.api.rpc('pz.instances');
  }

  async readConfig(instance, path) {
    return this.api.rpc('pz.read_config', instance, path);
  }

  async writeConfig(instance, path, content, backup=true) {
    return this.api.rpc('pz.write_config', instance, path, content, {backup});
  }

  async backupConfig(instance, path) {
    return this.api.rpc('pz.backup_config', instance, path);
  }

  async restoreConfig(instance, backupId) {
    return this.api.rpc('pz.restore_config', instance, backupId);
  }
}
