# ✈️ AI Travel Planner

> A full-stack travel planning app powered by OpenAI GPT. Plan trips, manage bookings, and generate AI-powered itineraries — all in one place.

![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20Python-blueviolet?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-OpenAI%20GPT--4o-green?style=for-the-badge)

---

## ✨ Features

- 🔐 Session-based auth with bcrypt password hashing
- 🗺️ Full itinerary and booking CRUD
- 🤖 AI itinerary generation, cost prediction, budget optimization, weather insights, travel tips, translation, and sentiment analysis
- ⚙️ Admin dashboard — manage users, itineraries, and view app-wide stats
- 📱 Responsive UI with Tailwind CSS and Framer Motion

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, Redux Toolkit, Framer Motion |
| Backend | Node.js, Express, MongoDB, Mongoose, express-session |
| AI Service | Python, Flask, OpenAI SDK, Scikit-learn |

---

## 🏗️ Architecture

```
React (3000) → Node.js API Gateway (5000) → MongoDB
                        └──────────────────→ Python AI Service (8000)
```

React never talks to Python directly. Node handles auth and proxies all AI requests.

---

## ⚙️ Environment Variables

**`backend/.env`**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/travel-planner
SESSION_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
```

**`python-service/.env`**
```env
FLASK_ENV=development
OPENAI_API_KEY=sk-proj-your-key-here
```

---

## 🚀 Setup

**1. Backend**
```bash
cd backend && npm install && npm run dev
```

**2. Python AI Service**
```bash
cd python-service
python -m venv venv && venv\Scripts\activate  # Windows
pip install -r requirements.txt && python run.py
```

**3. Frontend**
```bash
cd frontend && npm install && npm run dev
```

---

## 🔑 Creating an Admin Account

```bash
# 1. Register at http://localhost:3000/register
# 2. Promote to admin
node scripts/makeAdmin.js your@email.com
# 3. Visit http://localhost:3000/admin
```

---

## 📁 Structure

```
travel-planner/
├── frontend/        # React + Vite
├── backend/         # Node.js + Express + MongoDB
└── python-service/  # Flask AI microservice
```

---

<p align="center">Built with ❤️ using React, Node.js, and OpenAI</p>
