const email = document.getElementById("email"); // loginCheck()
const password = document.getElementById("pw"); // showPW()
const adminlist = {"aura.main01@gmail.com": "1234abcd%"}; // Admin User List

/**  Default: type = password 
 *  Function: Show/Hidden the Password */
function showPW() {
  password.type = (password.type === "password") ? "text" : "password";
}

function loginCheck() {
  const errorDisplay = document.getElementById("login error"); // Error Message

  if (!emailRegexCheck()){
    errorDisplay.textContent = "Invaild Email Format, Please Re-enter!";
    return;
  }

  if (!passwordRegexCheck()){
    errorDisplay.textContent = "Invaild Password Format, Please Re-enter!";
    return;
  }

  if (!adminlist[email] | adminlist[email] != password){
    errorDisplay.textContent = "Invaild Email or Password, Please Check Again!";
    return;
  }

  errorDisplay.textContent = "";
  window.location.href("../Admin_Dashboard/Admin_Dashboard.html");
}

function emailRegexCheck() {
  const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/;
  return email_regex.test(email);
}

function passwordRegexCheck() {
  const pw_regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*?]).{8,}$/;
  return pw_regex.test(pw);
}

//-------------------------------------------------------------------------------------------
/*const workerUrl = "https://workers.theaura.us.kg"; // Cloudflare Worker Link

// Generate OTP
document.getElementById("generate otp").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  try {
    const response = await fetch(`${workerUrl}/generate-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (response.ok) {
      showMessage("generate-otp-message", result.message, "success");
    } else {
      showMessage("generate-otp-message", result.error, "error");
    }
  } catch (error) {
    showMessage("generate-otp-message", "Failed to generate OTP. Please try again.", "error");
  }
});

// Verify OTP
document.getElementById("verify otp").addEventListener("click", async () => {
  const email = document.getElementById("verify email").value;
  const otp = document.getElementById("otp").value;
  if (!email || !otp) {
    alert("Please enter your email and OTP.");
    return;
  }

  try {
    const response = await fetch(`${workerUrl}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.json();
    if (response.ok) {
      showMessage("verify-otp-message", result.message, "success");
    } else {
      showMessage("verify-otp-message", result.error, "error");
    }
  } catch (error) {
    showMessage("verify-otp-message", "Failed to verify OTP. Please try again.", "error");
  }
});

// Helper function to display messages
function showMessage(elementId, message, type) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.className = `message ${type}`;
}*/