addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Get visitor IP
    const ip = request.headers.get("cf-connecting-ip") || "unknown";

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Timestamp
    const timestamp = new Date().toLocaleString();

    // Discord webhook URL
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn"; // replace this

    const msg = {
      content: `📌 New visitor on pylonz.info\n🌐 IP: **${ip}**\n🖥️ Browser: ${userAgent}\n⏰ Time: ${timestamp}`
    };

    // Send to Discord
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    });

    // Respond to the visitor
    return new Response("Visitor logged!", { status: 200 });
  } catch (err) {
    return new Response("Error logging visitor", { status: 500 });
  }
}

