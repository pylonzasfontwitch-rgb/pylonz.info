addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get visitor IP and User-Agent
  const ip = request.headers.get("CF-Connecting-IP") || "Unknown IP"
  const userAgent = request.headers.get("User-Agent") || "Unknown UA"

  // Get current time in EST
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

  // Discord webhook URL (replace with your webhook)
  const webhookUrl = "https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn"

  // Send visitor info to Discord
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📌 New visitor on pylonz.info\n🌐 IP: **${ip}**\n🖥️ Browser: ${userAgent}\n⏰ Time (EST): ${timestamp}`
    })
  }).catch(err => console.error("Failed to send webhook:", err))

  // Redirect visitor to another website
  return Response.redirect("https://lostservicess.mysellauth.com", 302) // <-- replace with your target URL
}
