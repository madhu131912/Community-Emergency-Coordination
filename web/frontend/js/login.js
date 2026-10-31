const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  loginMessage.style.color = "#475569";
  loginMessage.textContent = "Logging in...";

  try {
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.style.color = "#dc2626";
      loginMessage.textContent = data.detail || "Login failed";
      return;
    }

    // Save login data
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("user_email", data.email);

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (error) {
    loginMessage.style.color = "#dc2626";
    loginMessage.textContent = "Server error. Please try again.";
    console.error(error);
  }
});