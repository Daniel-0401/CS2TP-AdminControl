const email = document.getElementById("email"); // loginCheck()
const password = document.getElementById("pw"); // showPW()
const adminlist = {"aura.main01@gmail.com": "1234Abcd%"}; // Admin User List

/**  Default: type = password 
 *  Function: Show/Hidden the Password */
function showPW() {
  password.type = (password.type === "password") ? "text" : "password";
}

function loginCheck() {
  const errorDisplay = document.getElementById("login-error"); // Error Message
  const email_input = email.value;
  const pw_input = password.value;

  if (!emailRegexCheck(email_input)){
    errorDisplay.textContent = "Invaild Email Format, Please Re-enter!";
    return;
  }

  if (!passwordRegexCheck(pw_input)){
    errorDisplay.textContent = "Invaild Password Format, Please Re-enter!";
    return;
  }

  if (adminlist[email_input] !== pw_input){
    errorDisplay.textContent = "Invaild Email or Password, Please Check Again!";
    return;
  }

  errorDisplay.textContent = "";
  window.location.href = "./Admin_Dashboard/Admin_Dashboard.html";
}

function emailRegexCheck(email_input) {
  const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/;
  return email_regex.test(email_input);
}

function passwordRegexCheck(pw_input) {
  const pw_regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%&*?]).{8,}$/;
  return pw_regex.test(pw_input);
}