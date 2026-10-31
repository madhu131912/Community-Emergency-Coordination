const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value.trim();
  const last_name = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const role_id = parseInt(document.getElementById("role_id").value);

  let society_id = document.getElementById("society_id").value.trim();
  let block_id = document.getElementById("block_id").value.trim();
  let flat_id = document.getElementById("flat_id").value.trim();

  signupMessage.style.color = "#475569";
  signupMessage.textContent = "Creating account...";

  // Resident validation
  if (role_id === 1) {
    if (!society_id || !block_id || !flat_id) {
      signupMessage.style.color = "#dc2626";
      signupMessage.textContent = "Resident must enter society, block and flat IDs.";
      return;
    }
  } else {
    society_id = null;
    block_id = null;
    flat_id = null;
  }

  const payload = {
    first_name,
    last_name,
    email,
    phone,
    password,
    role_id,
    society_id: society_id ? parseInt(society_id) : null,
    block_id: block_id ? parseInt(block_id) : null,
    flat_id: flat_id ? parseInt(flat_id) : null
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      signupMessage.style.color = "#dc2626";
      if (Array.isArray(data.detail)) {
        signupMessage.textContent = data.detail.map(err => err.msg).join(", ");
      } else {
        signupMessage.textContent = data.detail || "Signup failed";
      }
      return;
    }

    signupMessage.style.color = "green";
    signupMessage.textContent = "Account created successfully! Redirecting to login...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    signupMessage.style.color = "#dc2626";
    signupMessage.textContent = "Server error. Please try again.";
    console.error(error);
  }
});