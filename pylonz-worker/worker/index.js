addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Replace with your Discord webhook
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn";

  const ip = request.headers.get("cf-connecting-ip") || "Unknown";
  const userAgent = request.headers.get("user-agent") || "Unknown";
  const timestamp = new Date().toLocaleString();

  const msg = {
    content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time: ${timestamp}`
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    });
  } catch (err) {
    console.error("Failed to send webhook:", err);
  }

  // Respond with a 204 No Content (doesn’t show anything)
  return new Response(null, { status: 204 });
}
