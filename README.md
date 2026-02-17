# 🎓 EduFlow Hub

A comprehensive, modern Educational Management Platform built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

- **🎨 Advanced Glassmorphism UI**: Premium aesthetic with animated backgrounds, translucent cards, and dynamic gradients.
- **👥 Role-Based Access Control**:
  - **Admin**: Full system oversight, user management, and analytics.
  - **Teacher**: Course management, assignment creation, grading, and student tracking.
  - **Parent**: Real-time progress monitoring, grade viewing, and teacher communication.
  - **Student**: Access courses, submit assignments, and view grades.
- **📚 Course Management**: Create and manage detailed curriculums.
- **📝 Assignments & Grading**:
  - Digital assignment submission.
  - Integrated grading system with feedback.
  - Real-time grade calculation (GPA, averages).
- **💬 Messaging System**: Private, threaded communication between parents and teachers.
- **📊 Analytics**: Visual progress tracking and attendance monitoring.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Shadcn/UI (components).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens).
- **Deployment**: Vercel (Frontend) / Render or Railway (Backend).

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eduflow-hub.git
   cd eduflow-hub
   ```

2. **Install Dependencies**
   ```bash
   # Install root/frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**

     ```

4. **Run Locally**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev

   # Terminal 2: Frontend
   npm run dev
   ```

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub.
2. Import repo in Vercel.
3. Set Environment Variable: `VITE_API_URL` to your production backend URL.
4. Deploy.

### Backend (Render/Railway)
1. Push code to GitHub.
2. Import repo.
3. Set Root Directory to `backend`.
4. Set Environment Variables: `MONGO_URI`, `JWT_SECRET`.
5. Deploy.

## 📄 License

MIT License.
