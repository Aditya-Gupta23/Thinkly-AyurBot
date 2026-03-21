# Thinkly AyurBot — AI Wellness Assistant

## Overview

Thinkly AyurBot is a domain-specific AI chatbot designed to provide guidance on Ayurveda, health, diet, and lifestyle.

The goal of this project was to build a focused AI-powered product rather than a generic chatbot, with controlled outputs and a clean user experience.

---

## Why this project

Most AI chat applications are general-purpose and often provide inconsistent or irrelevant responses in specific domains.

This project explores how prompt engineering and UI design can be used to create a specialized assistant that delivers structured and relevant information in the wellness domain.

---

## What I built

- A React-based chat interface with a clean and responsive UI  
- A serverless backend using Vercel API routes  
- Integration with Google Gemini API for generating responses  
- Mode-based interaction (General, Diet, Disease, Yoga) to control AI behavior  
- Domain restriction to ensure responses stay within Ayurveda and wellness  
- Error handling for API failures and rate limits  

---

## Architecture

- Frontend: React (Vite)  
- Backend: Vercel Serverless Functions  
- AI: Google Gemini API  

Flow:  
User input → API route (`/api/chat`) → Gemini → Parsed response → UI

---

## Key considerations

- Avoided blindly trusting AI responses by validating and parsing outputs  
- Handled deployment issues to ensure frontend and backend work together  
- Implemented graceful error handling for API limits and failures  
- Designed the UI to reflect a calm, wellness-oriented experience  

---

## Live Demo

https://thinkly-ayur-bot.vercel.app

---

## Loom Walkthrough

https://drive.google.com/file/d/11Mx1C2E0oUSVqPq0iXvuOxU3y2gw64Yk/view

---

## Author

Aditya Gupta

---

## Note

This project focuses on demonstrating product thinking, AI integration, and the ability to guide and validate AI-generated outputs in a real-world scenario.