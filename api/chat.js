import axios from "axios";
import { getSystemPrompt } from "../lib/prompt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ reply: "Method not allowed." });
  }

  const { message, mode } = req.body || {};

  try {
    const systemPrompt = getSystemPrompt(mode);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nUser: ${message}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help, but something went wrong.";

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini error:", error?.response?.data || error.message);

    res.status(500).json({
      reply: "Server error. Please try again.",
    });
  }
}