<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>IGI Extranet | Dashboard</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body class="dash">
  <header class="topbar">
    <div class="brand">
      <span class="dot"></span>
      <strong>IGI Extranet</strong>
      <span class="tag" id="tierTag">Tier: Guest</span>
    </div>

    <div class="top-actions">
      <span class="pill" id="netState">Checking network…</span>
      <button class="ghost" id="lockBtn">Lock</button>
      <button class="ghost" id="logoutBtn">Logout</button>
    </div>
  </header>

  <main class="layout">
    <aside class="sidebar">
      <button class="nav active" data-panel="overview">Overview</button>
      <button class="nav" data-panel="ops">Ops Console</button>
      <button class="nav" data-panel="intel">Intel Vault</button>
      <button class="nav" data-panel="codex">DAO Codex</button>
      <button class="nav" data-panel="settings">Settings</button>

      <div class="sidebar-foot">
        <small id="deviceTrust">Device: Untrusted</small>
      </div>
    </aside>

    <section class="panel">
      <div class="panel-head">
        <h2 id="panelTitle">Overview</h2>
        <div class="panel-actions">
          <button class="ghost" id="passkeyBtn">Enable Passkey</button>
          <button class="ghost" id="trustDeviceBtn">Trust Device</button>
        </div>
      </div>

      <div id="panelBody" class="panel-body">
        <div class="card">
          <h3>Status</h3>
          <p id="sessionInfo">Session initializing…</p>
        </div>

        <div class="card">
          <h3>Quick Tiles</h3>
          <div class="tiles">
            <div class="tile">Briefs</div>
            <div class="tile">Tasks</div>
            <div class="tile">Signals</div>
            <div class="tile">Reports</div>
          </div>
        </div>

        <div class="card warn" id="offlineCard">
          <h3>Offline Mode</h3>
          <p>Offline-first enabled. Some features require a verified device & cached credentials.</p>
        </div>
      </div>
    </section>
  </main>

  <script src="dashboard.js"></script>
</body>
</html>
