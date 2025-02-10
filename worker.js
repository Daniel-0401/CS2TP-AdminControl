import { sha256 } from "js-sha256"; // Secure hashing
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/generate-otp") {
      return generateOTP(request, env);
    } else if (url.pathname === "/verify-otp") {
      return verifyOTP(request, env);
    } else {
      return new Response("404 Not Found", { status: 404 });
    }
  }
};

async function generateOTP(request, env) {
  const { email } = await request.json();
  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Unique 6-digit OTP
  const hashedOTP = sha256(otp); // Secure hash to store
  const expiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

  // Store the hashed OTP and expiration timestamp in KV
  await env.AUTH_KV.put(`otp_${email}`, JSON.stringify({ hashedOTP, expiresAt }), { expirationTtl: 600 });

  // Send OTP via Email.js
  const emailResponse = await sendEmailOTP(email, otp);
  if (!emailResponse.success) {
    return new Response(JSON.stringify({ error: "Failed to send OTP" }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "OTP sent successfully!" }), { status: 200 });
}

async function verifyOTP(request, env) {
  const { email, otp } = await request.json();
  if (!email || !otp) {
    return new Response(JSON.stringify({ error: "Missing email or OTP" }), { status: 400 });
  }

  const storedData = await env.AUTH_KV.get(`otp_${email}`);
  if (!storedData) {
    return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), { status: 400 });
  }

  const { hashedOTP, expiresAt } = JSON.parse(storedData);

  // Check expiration
  if (Date.now() > expiresAt) {
    return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
  }

  // Verify OTP using hash comparison
  if (sha256(otp) === hashedOTP) {
    await env.AUTH_KV.delete(`otp_${email}`); // Remove OTP after use
    return new Response(JSON.stringify({ message: "OTP verified successfully!" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
  }
}

async function sendEmailOTP(email, otp) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: "your_service_id",
      template_id: "your_template_id",
      user_id: "your_user_id",
      template_params: { email: email, otp: otp }
    })
  });

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, error: "Email sending failed" };
  }
}
