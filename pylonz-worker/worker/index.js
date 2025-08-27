addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 🚨 Replace this with your Discord webhook URL
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn";

  try {
    // Get visitor IP + extra info
    const ip = request.headers.get('cf-connecting-ip') || "Unknown IP";
    const userAgent = request.headers.get('user-agent') || "Unknown UA";
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

    const msg = {
      content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time (EST): ${timestamp}`
    };

    // Send to Discord
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    });
  } catch (err) {
    console.error("Error logging visitor:", err);
  }

  // Redirect visitor immediately
  return Response.redirect("https://lostservicess.mysellauth.com", 302); // <- Change to your target URL
}
