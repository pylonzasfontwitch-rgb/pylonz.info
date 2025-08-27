export default {
  async fetch(request, env) {
    // Get visitor info
    const ip = request.headers.get("cf-connecting-ip") || "Unknown IP";
    const userAgent = request.headers.get("user-agent");
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // Prepare message for Discord
    const msg = {
      content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time (EST): ${timestamp}`
    };

    // Send to Discord webhook
    fetch("https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    }).catch(err => console.error("Failed to send webhook:", err));

    // Redirect visitor to another website
    return Response.redirect("https://lostservicess.mysellauth.com", 302);
  }
};

