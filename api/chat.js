import { getSystemPrompt } from "../lib/prompt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed." });
  }

  const { message, mode } = req.body || {};

  try {
    const systemPrompt = getSystemPrompt(mode);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help, but something went wrong.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      reply: "Server error. Please try again.",
    });
  }
}