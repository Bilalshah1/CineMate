# CineMate – A Watch Party Platform

CineMate is a **social streaming web application** that allows users to watch YouTube videos **together in real time** while chatting, reacting, and engaging with friends — all in a shared virtual room.

🚀 **Live App**: [https://cinemate-2025.web.app](https://cinemate-2025.web.app)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

---

<a id="features"></a>

## ✨ Features

### 🔐 Authentication

- Secure login via **email/password** or **Google Sign-In** using Firebase Authentication.

### 🏠 Landing Page

- After authentication, users are greeted with a clean and animated landing page.
- Two primary actions:
  - **Create Room**
  - **Join Room**

### 🎥 Room Creation & Joining

- Creating a room generates a unique **8-digit hexadecimal code**.
- Users can share the code with friends to **join the same room** instantly.

### 👨‍👩‍👧‍👦 Room Features

- **🕒 Synchronized YouTube Playback**
  - Every participant sees the same video, in sync.
  - URL changes, play/pause, seeking, and volume control are synchronized across users.
- **💬 Real-time Group Chat**

  - A shared chat window for real-time communication.
  - Messages are stored and synced using Firestore.

- **🎉 Emoji Reactions**

  - Animated emoji reactions visible only to the sender.
  - Designed for expressive, non-intrusive interactions.

- **👥 User Presence**

  - Real-time display of users currently in the room.

- **🛠 Admin Controls**

  - Room creators can:
    - **Kick** users
    - **Delete** the room

- **🧾 Profile Management**
  - Users can edit their profile including:
    - Name
    - Phone number
    - Change passwords e.t.c

---

<a id="tech-stack"></a>

## 🧰 Tech Stack

### Frontend

- **React** with **Vite** – Fast and modern development setup
- **Tailwind CSS** – Utility-first styling
- **React Router DOM** – SPA routing
- **Framer Motion** – Smooth animations and transitions

### Backend & Realtime

- **Firebase**
  - **Authentication** – Email/password and Google login
  - **Cloud Firestore** – Real-time NoSQL database for:
    - Room data
    - Chat messages
    - User presence

### Hosting

- **Firebase Hosting** (Free Tier)
  - Fast global delivery with HTTPS and automatic SSL
  - Cloud-based Firestore means **internet access is required** for all features

---

<a id="usage-guide"></a>

## 📖 Usage Guide

### 🔑 Sign In

- Navigate to [CineMate](https://cinemate-2025.web.app)
- Choose between:
  - Signing up with **email & password**
  - Logging in with **Google**

### 🏗 Create a Room

- Click "Create Room" on the dashboard.
- You’ll receive a **unique 8-character code** (e.g., `A3C1B9F2`)
- Share this code to invite others.

### 👤 Or Join a Room

- Click "Join Room" and enter the **room code**.
- Enjoy a synchronized video experience with friends.

### 🎦 Play a YouTube Video

- Paste a **YouTube URL** into the input field.
- Playback, volume, seek, and pause actions are synced across all room participants.

### 💬 Chat & Emoji

- Use the chat panel to message everyone in the room.
- Click emojis to react in real time (animations are **client-only**).

### 🔐 Admin Powers

- Room creators have access to:
  - **Kick** users
  - **Delete** the room entirely

---

<a id="deployment"></a>

## ☁️ Deployment

This project is deployed and live at:

🚀 [https://cinemate-2025.web.app](https://cinemate-2025.web.app)

> Firebase Hosting provides seamless integration with Firestore and Authentication services.

---

<a id="future-enhancements"></a>

## 🚧 Future Enhancements

Planned improvements:

- 🎞 **Support for additional video platforms** (e.g., Vimeo, Twitch)
- 🔁 **Synchronize emoji reactions** across all participants
- 📈 **Scalability improvements** (e.g., pagination, optimized state management)
- 📂 **Room history** and video playlists
- 📱 **UI/UX** and other accessibility enhancements

---

## 🙌 Contributing

Pull requests are welcome! If you have ideas or improvements, please open an issue first to discuss your proposal.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
