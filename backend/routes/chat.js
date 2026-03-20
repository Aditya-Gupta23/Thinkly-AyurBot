import express from "express";
import { getSystemPrompt } from "../utils/prompt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, mode } = req.body;
    
  try {
    const systemPrompt = getSystemPrompt(mode);
    console.log("Request to gemini is about to be made");
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
          role: "user",
          parts: [
            {
              text: `${systemPrompt}

User: ${message}`,
            },
          ],
        },
      ],
    }),
  }
);
    const data = await response.json();
    console.log("Request to gemini is done",data);

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help, but something went wrong.";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Server error. Please try again.",
    });
  }
});

export default router;