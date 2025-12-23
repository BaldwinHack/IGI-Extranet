document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Placeholder for API / Zero-Trust Auth
  if (email && password) {
    console.log("Auth request:", email);
    alert("Authentication handshake initiated.");
  }
});
