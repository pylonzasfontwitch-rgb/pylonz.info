addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Log visitor info
  const ip = request.headers.get("CF-Connecting-IP")
  const userAgent = request.headers.get("User-Agent")
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

  // Send to Discord webhook
  fetch("https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time (EST): ${timestamp}`
    })
  }).catch(err => console.error("Logging failed:", err))

  // Redirect immediately
  return Response.redirect("https://lostservicess.mysellauth.com", 302) // Replace with your target
}
