# 🌿 Thinkly AyurBot — AI Wellness Chat Assistant

An AI-powered chatbot designed to provide **Ayurvedic guidance on health, lifestyle, diet, and yoga**.
Built as a focused, domain-specific assistant with a premium, calming UI experience.

---

## 🚀 Live Demo

🔗 Frontend: *[Add your Vercel link here]*
🔗 Backend API: *[Add your Render link here]*

---

## 🎯 Project Overview

This project was built as part of a frontend-focused assignment to demonstrate:

* Product thinking
* UI/UX design
* AI integration
* Ability to guide AI outputs effectively

Unlike generic chat apps, **AyurBot is purpose-built** — it behaves like a **wellness assistant specialized in Ayurveda**, not a general chatbot.

---

## ✨ Key Features

### 🧠 AI-Powered Responses

* Integrated with **Google Gemini API**
* Structured, concise, and domain-focused answers
* Smart prompt engineering to control AI behavior

---

### 🎛 Mode-Based Intelligence

Users can switch between specialized modes:

* 🌿 General Ayurvedic
* 🥗 Diet Planner
* 🩺 Disease Specialist
* 🧘 Yoga Teacher

Each mode changes:

* Tone
* Knowledge scope
* Response structure

---

### 🛑 Domain Restriction (Important)

The chatbot **only answers health & Ayurveda-related queries**.

For unrelated questions:

> “I'm designed to help with Ayurveda, health, and wellness…”

👉 Prevents generic AI behavior and improves product focus.

---

### 🎨 Premium UI/UX

* Calm, Ayurvedic color palette
* Soft gradients and glassmorphism
* Clean chat bubbles and typography
* Responsive design

---

### 🎤 Voice Input

* Speech-to-text support using Web Speech API
* Continuous listening mode
* Seamless integration with chat input

---

### 🔊 Text-to-Speech

* AI responses can be read aloud
* Enhances accessibility and UX

---

### 📋 Message Actions

* 👍 / 👎 feedback
* 📋 Copy response
* 🔊 Listen to response

---

### ⚡ Real-Time Chat Experience

* Auto-scroll
* Loading states
* Error handling (backend unreachable, etc.)

---

## 🏗 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Markdown (for formatting responses)
* Lucide Icons

### Backend

* Node.js
* Express.js
* Google Gemini API

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📂 Project Structure

```
ThinklyAyurBot/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── index.html
│
├── backend/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── .gitignore
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
GEMINI_API_KEY=your_api_key_here
PORT=5001
```

---

### Frontend (`frontend/.env`)

```
VITE_API_BASE_URL=http://localhost:5001
```

---

## 🧪 Run Locally

### 1. Clone repo

```bash
git clone https://github.com/YOUR_USERNAME/ThinklyAyurBot.git
cd ThinklyAyurBot
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Prompt Engineering Approach

The chatbot behavior is controlled using:

* Mode-specific system prompts
* Strict domain rules
* Structured markdown responses

Example:

* Prevents answering irrelevant queries
* Forces concise and formatted output
* Simulates domain expertise

---

## 🎥 Loom Walkthrough

🔗 *[Add Loom video link here]*

Includes:

* How the app works
* How AI is used
* How prompts were designed
* How edge cases are handled

---

## 🛡 Security Practices

* `.env` files are ignored via `.gitignore`
* API keys are never exposed
* `.env.example` provided for setup

---

## 💡 Future Improvements

* Chat history persistence (MongoDB)
* User authentication
* Personalized health tracking
* More advanced AI context memory
* Multi-language support

---

## 🙌 Author

**Aditya Gupta**
Frontend Developer | AI Enthusiast

---

## ⭐ Final Note

This project focuses on **building a product, not just a chatbot**:

* Controlled AI behavior
* Thoughtful UI/UX
* Clear user experience
* Real-world usability

---
