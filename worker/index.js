export default {
  async fetch(request) {
    try {
      const ip = request.headers.get("CF-Connecting-IP") || "Unknown IP";
      const ua = request.headers.get("User-Agent") || "Unknown User-Agent";
      const timestamp = new Date().toLocaleString();

      const msg = {
        content: `📌 New visitor on pylonz.info
🌐 IP: **${ip}**
🖥️ Browser: ${ua}
⏰ Time: ${timestamp}`
      };

      await fetch("https://discord.com/api/webhooks/1410049032516141129/UfvS9xV4ddgTJhX8mod01-VhzplttOGYv22AltrrDkL9G3bSz0lEzoX5PA-StnkpN4fn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg)
      });

      return new Response("Logged successfully!", { status: 200 });
    } catch (err) {
      return new Response("Error logging visitor.", { status: 500 });
    }
  }
};
