# 🕊️ GoldenPeace — Serenity for the Golden Years

**GoldenPeace** is a mobile application designed to provide comprehensive **health and emotional support for the elderly**.
Built with modern technologies, it empowers seniors to monitor their emotions, engage in relaxing activities, and maintain both physical and mental well-being — all within one friendly platform.

![Demo](https://github.com/NotWutLit/golden-peace-app/blob/main/demo.gif)

---

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [Vision & Mission](#vision--mission)
3. [Target Users](#target-users)
4. [Technology Stack](#technology-stack)
5. [Key Features](#key-features)
6. [System Architecture](#system-architecture)
7. [Data Model](#data-model)
8. [Development Roadmap](#development-roadmap)
9. [Marketing Strategy](#marketing-strategy)
10. [Conclusion](#conclusion)

---

## 1. Introduction

### 1.1 Definition
**GoldenPeace** (Vietnamese: *An Tâm Tuổi Vàng*) is a mobile application tailored for **senior citizens**, aiming to deliver an all-in-one platform for **mental wellness, emotional tracking, and healthy living**.
It goes beyond simple tracking — the app provides curated resources and uplifting content that help users improve their overall quality of life.

---

## 2. Vision & Mission

- **Vision**
  To become the leading mobile application supporting **mental and physical health** for the elderly in Vietnam.

- **Mission**
  To create a **safe, positive, and interactive space** where seniors can share feelings, access health information, and participate in beneficial activities.

---

## 3. Target Users

- **Primary Users:**
  Elderly individuals aged **60 years and above** seeking guidance and emotional management.

- **Secondary Users:**
  **Family members and caregivers** who wish to track and support their loved ones’ well-being.

---

## 4. Technology Stack

### 🖥️ Front-end — **Expo CLI (React Native)**
- **Cross-platform support:** Runs seamlessly on both iOS and Android.
- **Hot Reloading:** Instantly reflects code changes without restarting the app.
- **Extensible libraries:** Easy integration for charts, music, and videos.

### ☁️ Back-end — **Supabase**
- **Real-time Database:** Automatically updates user data in real-time.
- **Secure Authentication:** Supports email, phone, and OAuth login.
- **File Storage:** Allows users to upload and manage files conveniently.

---

## 5. Key Features

### 🏠 Welcome Screen
- Displays an uplifting greeting message each morning.
- Simple “Continue” button for easy navigation to the login page.
- Large text and clean visuals tailored for elderly users.

### 🔐 Login & Authentication
- Sign in using **phone number and password**.
- “Forgot Password” recovery via email or SMS.
- Minimalist UI with large input fields for better accessibility.

### 💬 Emotion Dashboard
- Displays daily emotional summaries and motivational greetings.
- Shows weekly mood trends via intuitive visual charts.

### 📓 Emotion Journal
- Record daily emotions (happy, sad, neutral).
- View emotion statistics over time with weekly/monthly charts.
- Add personal notes for context and reflection.

### 🎵 Music Library
- Curated playlists categorized by genres.
- In-app music playback without external platforms.
- Create and manage personal favorite playlists.

### 💪 Health & Wellness
- Includes guided exercises and healthy lifestyle tips.
- Activity tracker with daily reminders.
- Articles and tutorial videos on both mental and physical health.

### ⚙️ Account Settings
- Manage personal data, passwords, and security preferences.
- Supports **Two-Factor Authentication (2FA)**.
- Customize notification types for a personalized experience.

---

## 6. System Architecture

### 🧩 Overview
- **Client:** Mobile app built with Expo CLI.
- **Server:** Supabase handling database, authentication, and file storage.
- **API:** RESTful API enabling secure and efficient communication between client and server.

### 🔄 Data Flow
1. **Login:** User credentials sent to Supabase for authentication.
2. **Emotion Logging:** User records stored directly to the real-time database.
3. **Data Retrieval:** App fetches emotional and music data dynamically.
4. **Profile Updates:** User settings synced instantly with Supabase backend.

---

## 7. Data Model

### 🧱 Database Entities

| Table | Description |
|-------|--------------|
| **Users** | Personal data: name, phone, email, encrypted password. |
| **EmotionJournal** | User ID, date, emotion type (happy/sad/neutral), personal notes. |
| **Playlists** | User ID, playlist name, associated songs. |

### 🔗 Relationships
- A user can have multiple emotion entries and playlists.
- Each emotion entry is linked to a unique user via **user_id**.

---

## 8. Development Roadmap

| Phase | Description |
|-------|--------------|
| **Phase 1** | Design UI/UX and build core front-end features. |
| **Phase 2** | Integrate back-end (Supabase) and test connectivity. |
| **Phase 3** | Conduct **beta testing** with a pilot group of senior users. |
| **Phase 4** | Refine the product based on feedback and prepare for launch. |

---

## 9. Marketing Strategy

- **Social Media Outreach:** Promote on Facebook, Zalo, and senior communities.
- **Community Engagement:** Organize workshops and public talks for awareness.
- **Collaborations:** Partner with healthcare centers and senior clubs.

---

## 10. Conclusion

**GoldenPeace** is more than an application — it is a **trusted companion** for elderly users to nurture emotional balance and stay physically active.
Through the synergy of **Expo CLI** and **Supabase**, GoldenPeace delivers a seamless, real-time, and secure user experience.

> We believe GoldenPeace will become a meaningful part of seniors’ daily lives — helping them live with peace, joy, and vitality every day.

---

### 💡 Tech Summary
| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | Expo CLI (React Native) | Cross-platform mobile development |
| Backend | Supabase | Realtime database, Auth, File storage |
| Auth | Supabase Auth | Email, Phone, OAuth |
| Charts | Victory Native / Recharts | Data visualization for mood tracking |
| Media | Expo AV | Audio streaming for music library |

---

### 🧠 Author
Developed by **GoldenPeace Team**
Dedicated to bringing serenity and happiness to the golden years of life.
