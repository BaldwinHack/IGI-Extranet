// Service worker register
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // FRONTEND DEMO AUTH (replace with real API)
  // Tier example: anything ending with @igi.local = governance
  let tier = "guest";
  if (email.endsWith("@igi.local")) tier = "governance";
  else if (email.includes("ops")) tier = "operator";

  // Minimal “session”
  const session = {
    email,
    tier,
    deviceTrusted: false,
    createdAt: Date.now()
  };

  localStorage.setItem("igi_session", JSON.stringify(session));
  window.location.href = "dashboard.html";
});
