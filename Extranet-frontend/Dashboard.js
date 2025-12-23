const sessionRaw = localStorage.getItem("igi_session");
if (!sessionRaw) window.location.href = "index.html";

let session = JSON.parse(sessionRaw || "{}");

const tierTag = document.getElementById("tierTag");
const netState = document.getElementById("netState");
const sessionInfo = document.getElementById("sessionInfo");
const deviceTrust = document.getElementById("deviceTrust");

const logoutBtn = document.getElementById("logoutBtn");
const lockBtn = document.getElementById("lockBtn");
const passkeyBtn = document.getElementById("passkeyBtn");
const trustDeviceBtn = document.getElementById("trustDeviceBtn");

const panelTitle = document.getElementById("panelTitle");
const panelBody = document.getElementById("panelBody");

function setNet() {
  const online = navigator.onLine;
  netState.textContent = online ? "Online" : "Offline";
}
window.addEventListener("online", setNet);
window.addEventListener("offline", setNet);
setNet();

function renderSession() {
  tierTag.textContent = `Tier: ${session.tier || "guest"}`;
  deviceTrust.textContent = `Device: ${session.deviceTrusted ? "Trusted" : "Untrusted"}`;
  sessionInfo.textContent = `User: ${session.email || "unknown"} • Tier: ${session.tier || "guest"} • Offline: ${!navigator.onLine}`;
}
renderSession();

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("igi_session");
  window.location.href = "index.html";
});

lockBtn.addEventListener("click", () => {
  // “Lock” keeps session but requires re-auth later (real app would re-check passkey)
  alert("Locked. Re-auth required on next sensitive action.");
});

trustDeviceBtn.addEventListener("click", () => {
  // In real build: set only after passkey success
  session.deviceTrusted = true;
  localStorage.setItem("igi_session", JSON.stringify(session));
  renderSession();
});

passkeyBtn.addEventListener("click", async () => {
  // Placeholder: WebAuthn registration would go here
  // On iOS, passkey prompts typically surface Face ID automatically.
  alert("Passkey enrollment placeholder (WebAuthn). Next step: connect to backend challenge endpoints.");
});

// Sidebar navigation
document.querySelectorAll(".nav").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const panel = btn.dataset.panel;
    loadPanel(panel);
  });
});

function deny(message) {
  panelBody.innerHTML = `
    <div class="card warn">
      <h3>Access Denied</h3>
      <p>${message}</p>
    </div>
  `;
}

function loadPanel(panel) {
  panelTitle.textContent = panel === "codex" ? "DAO Codex" :
                           panel === "intel" ? "Intel Vault" :
                           panel === "ops" ? "Ops Console" :
                           panel === "settings" ? "Settings" : "Overview";

  if (panel === "codex") {
    const ok = (session.tier === "governance" || session.tier === "admin");
    if (!ok) return deny("DAO Codex requires Governance tier.");

    panelBody.innerHTML = `
      <div class="card">
        <h3>DAO Codex</h3>
        <p>Governance-only frameworks • SSA/RSDI-compliant structures • Voting-token designs.</p>
        <div class="tiles">
          <div class="tile">PMA / Governance</div>
          <div class="tile">Voting Tokens</div>
          <div class="tile">Operating Rules</div>
          <div class="tile">Audit Log</div>
        </div>
      </div>
    `;
    return;
  }

  if (panel === "intel") {
    const ok = session.deviceTrusted;
    if (!ok) return deny("Intel Vault requires a Trusted Device (recommended: Passkey/Face ID).");

    panelBody.innerHTML = `
      <div class="card">
        <h3>Intel Vault</h3>
        <p>Secure compartments (frontend shell). Backend policy + encryption comes next.</p>
      </div>
    `;
    return;
  }

  if (panel === "ops") {
    panelBody.innerHTML = `
      <div class="card">
        <h3>Ops Console</h3>
        <p>Operational tiles, checklists, and task routing (shell).</p>
      </div>
    `;
    return;
  }

  if (panel === "settings") {
    panelBody.innerHTML = `
      <div class="card">
        <h3>Settings</h3>
        <p>Passkeys • Trusted Devices • Offline Cache • Session Controls.</p>
        <p><strong>Offline-first:</strong> enabled via Service Worker cache.</p>
      </div>
    `;
    return;
  }

  // Overview default
  panelBody.innerHTML = `
    <div class="card">
      <h3>Status</h3>
      <p>${session.email || "unknown"} • Tier: ${session.tier || "guest"} • Device: ${session.deviceTrusted ? "Trusted" : "Untrusted"}</p>
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
    <div class="card warn">
      <h3>Offline Mode</h3>
      <p>${navigator.onLine ? "Online now (offline-ready if signal drops)." : "Offline now (cached shell active)."}</p>
    </div>
  `;
}

loadPanel("overview");
