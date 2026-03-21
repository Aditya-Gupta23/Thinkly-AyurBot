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
    console.log("Gemini FULL response:", JSON.stringify(data, null, 2));
    const reply =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text)
      .join("") ||
    data?.candidates?.[0]?.content?.text ||
    (data?.error && data.error.message) ||
    "I'm here to help, but something went wrong.";

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(500).json({
        reply: "AI service error: " + data.error.message,
      });
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      reply: "Server error. Please try again.",
    });
  }
}