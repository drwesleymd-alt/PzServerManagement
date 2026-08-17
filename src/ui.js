// ui.js — minimal UI wiring using PatternFly classes. For brevity, the UI is simplified but structured

export const UI = {
  render(root, modules) {
    root.innerHTML = '';

    const toolbar = document.createElement('div');
    toolbar.className = 'pf-c-toolbar';
    toolbar.innerHTML = `
      <div class="pf-c-toolbar__group">
        <div class="pf-c-toolbar__item">
          <button id="pz-start" class="pf-c-button pf-m-primary">Start</button>
          <button id="pz-stop" class="pf-c-button pf-m-danger">Stop</button>
          <button id="pz-restart" class="pf-c-button">Restart</button>
        </div>
      </div>
    `;

    const statusPanel = document.createElement('div');
    statusPanel.id = 'statusPanel';
    statusPanel.className = 'pf-c-card';

    root.appendChild(toolbar);
    root.appendChild(statusPanel);

    modules.status.onUpdate((s) => {
      statusPanel.innerHTML = `\n        <div class="pf-c-card__body">\n          <h2>Server status</h2>\n          <p>Running: ${s.running ? 'yes' : 'no'}</p>\n          <p>PID: ${s.pid || '-'} Uptime: ${s.uptime || '-'} CPU: ${s.cpu || '-'} RAM: ${s.ram || '-'}</p>\n        </div>`;
    });

    document.getElementById('pz-start').onclick = () => modules.status.start();
    document.getElementById('pz-stop').onclick = () => modules.status.stop();
    document.getElementById('pz-restart').onclick = () => modules.status.restart();

    // Quick nav links
    const nav = document.createElement('nav');
    nav.className = 'pf-c-page__main-nav';
    nav.innerHTML = `
      <ul>
        <li><a href="#mods">Mods</a></li>
        <li><a href="#players">Players</a></li>
        <li><a href="#config">Config</a></li>
        <li><a href="#rcon">RCON</a></li>
        <li><a href="#logs">Logs</a></li>
      </ul>
    `;
    root.insertBefore(nav, toolbar.nextSibling);

    // Hooks for more advanced UIs — real plugin should render detailed subviews per module
  }
};
