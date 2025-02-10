const password = document.getElementById("pw"); /* showPW() */
const divLogin = document.getElementById("login"); /* Login Section */
const divForgot = document.getElementById("forgot"); /* Forgot Section */
const divVerify = document.getElementById("verify"); /* Verify Section */
const divReset = document.getElementById("reset"); /* Reset Section */
const forgotPassword = document.getElementById("forgot_pw"); /* Forgot Password */

/**  Default: type = password 
 *  Function: Show/Hidden the Password */
function showPW() {
    password.type = (password.type === "password") ? "text" : "password";
}

/** Function: Pop Up the Corrent Section */
function showSection(from, to) {
    from.style.display = "none";
    to.style.display = "block";
}

/** Default: login = block */
forgot_pw.addEventListener("click", function(){
    showSection(divLogin, divForgot);
});

function loginCheck() {
    
}

function sendEmail() {
    
}