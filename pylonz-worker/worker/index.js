const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pylonz</title>
</head>
<body>
  <h1>Welcome to Pylonz</h1>
</body>
</html>`;

export default {
  async fetch(request, env) {
    // Get visitor info
    const ip = request.headers.get("cf-connecting-ip") || "Unknown IP";
    const userAgent = request.headers.get("user-agent");
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // Send to Discord
    fetch("https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time (EST): ${timestamp}`
      })
    }).catch(err => console.error("Failed to send webhook:", err));

    // Serve HTML page
    return new Response(HTML, {
      headers: { "Content-Type": "text/html" }
    });
  }
};
