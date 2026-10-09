export async function POST(request: Request) {
  const body = await request.json();

  const stream = new ReadableStream({
    start(controller) {
      const payload = `issueId: ${body.issueId ?? 'ISS-8921'}\n` +
        `filename: ${body.filename ?? 'authController.js'}\n` +
        `fixedSnippet: ${body.originalSnippet ?? 'const query = "SELECT * FROM users WHERE id = ?"; return db.query(query, [user.input]);'}\n`;

      controller.enqueue(new TextEncoder().encode(payload));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
