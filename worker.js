async fetch(request, env) {
  const url = new URL(request.url);
  console.log("Pathname:", url.pathname);  // Log the pathname to debug
  
  if (url.pathname === "/generate-otp") {
    return generateOTP(request, env);
  } else if (url.pathname === "/verify-otp") {
    return verifyOTP(request, env);
  } else {
    return new Response("404 Not Found", { status: 404 });
  }
}

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

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const hashedOTP = await sha256(otp); // Hash & Store OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes

  // Store OTP and Expire Time in KV
  await env.AUTH_KV.put(`otp_${email}`, JSON.stringify({ hashedOTP, expiresAt }), { expirationTtl: 600 });

  // Send OTP via Email.js
  const emailResponse = await sendEmailOTP(email, otp);
  if (!emailResponse.success) {
    return new Response(JSON.stringify({ error: "Failed to send OTP" }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "OTP sent successfully!" }), { status: 200 });
}

// Normal Hashing Function
async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
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

  // Check Expiration
  if (Date.now() > expiresAt) {
    return new Response(JSON.stringify({ error: "OTP expired" }), { status: 400 });
  }

  // Verify OTP
  const hashedInputOTP = await sha256(otp);
  if (hashedInputOTP === hashedOTP) {
    await env.AUTH_KV.delete(`otp_${email}`); // Remove OTP after use
    return new Response(JSON.stringify({ message: "OTP verified successfully!" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
  }
}

// Send Email with OTP
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

  // Email Sending Response
  if (response.ok) {
    return { success: true };
  } else {
    return { success: false, error: "Email sending failed" };
  }
}
