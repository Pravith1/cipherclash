# CipherClash — Registration Portal

A registration portal for PSG Tech's cybersecurity event **CipherClash**.

---

## 📁 Folder Structure

```
cipherclash/
├── backend/
│   ├── models/
│   │   └── Team.js          # Mongoose schema
│   ├── routes/
│   │   └── registration.js  # Express API routes
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── server.js            # Express entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx / .module.css
    │   │   ├── HeroSection.jsx / .module.css
    │   │   ├── RegistrationForm.jsx / .module.css
    │   │   └── MemberFields.jsx / .module.css
    │   ├── pages/
    │   │   └── SuccessPage.jsx / .module.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Steps to Run

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas URI

---

### 1. Clone the repo

```bash
git clone https://github.com/subhasreelk/CipherClash_Registrationportal.git
cd CipherClash_Registrationportal
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cipherclash
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/cipherclash
```

Start the backend:

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

The Vite dev server proxies `/api` → `http://localhost:5000` automatically.

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/register` | Register a new team |
| `GET` | `/api/teams` | List all teams (debug/admin) |

### POST `/api/register` — Request Body

```json
{
  "teamName": "NullPointers",
  "department": "CSE",
  "yearOfStudy": 3,
  "teamSize": 2,
  "members": [
    {
      "name": "Alice Kumar",
      "email": "24z365@psgtech.ac.in",
      "rollNumber": "24Z365",
      "phone": "9876543210"
    },
    {
      "name": "Bob Raj",
      "email": "22i102@psgtech.ac.in",
      "rollNumber": "22I102",
      "phone": "9123456789"
    }
  ]
}
```

---

## ✅ Features

- **Team size toggle** — Solo (1 member) or Duo (2 members)
- **Email ID validation** — Regex: `/^[0-9]{2}[a-zA-Z]{1,2}[0-9]{3}@psgtech\.ac\.in$/`
- **Duplicate prevention** — Email IDs must be unique across all registrations
- **Cross-member check** — Member 1 and Member 2 cannot share the same Email ID
- **Frontend validation** — Instant feedback before API call
- **Backend validation** — Mongoose schema validators + custom checks
- **Loading state** — Submit button disabled during API call with spinner
- **Success page** — Shows full team confirmation with next steps
- **Cybersecurity dark UI** — Matching DFX reference design

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React 18, CSS Modules, Axios |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Fonts | Orbitron, Share Tech Mono, Rajdhani |

---

## 🔒 Email ID Format

Valid examples:
- `24z365@psgtech.ac.in`
- `22i102@psgtech.ac.in`
- `23cs001@psgtech.ac.in`

Regex used: `/^[0-9]{2}[a-zA-Z]{1,2}[0-9]{3}@psgtech\.ac\.in$/`
