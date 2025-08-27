addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get visitor info
  const ip = request.headers.get('cf-connecting-ip') // real client IP
  const userAgent = request.headers.get('user-agent')

  // Convert time to EST
  const estDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

  // Discord message
  const msg = {
    content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${userAgent}
⏰ Time (EST): ${estDate}`
  }

  // Send to your Discord webhook
  await fetch("https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg)
  })

  // Respond to the visitor
  return new Response("<h1>Welcome to Pylonz</h1><p>Your visit has been logged.</p>", {
    headers: { "Content-Type": "text/html" }
  })
}
