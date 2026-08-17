# AnchorEats

A full-stack web application that provides helpful dining features for Vanderbilt students, centered on a meal swipe calculator.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application Locally](#running-the-application-locally)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Design](#design)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

AnchorEats was created to solve common challenges faced by Vanderbilt students:

- **Meal Swipe Management**: Near the end of the semester, I was getting tired of calculating the number of days and doing the math to find out how many meal swipes I needed to use. I noticed several of my friends mentioned doing these calculations as well, so I wanted to make a tool to make doing the math faster.

## Features

- **Meal Swipe Calculator**: Calculate how many swipes you need to use daily to reach zero by semester's end (accounting for breaks & Farmers' Market)
- **Feedback**: Submit feedback and browse everything that has been submitted
- **Setup Instructions**: Guide for installing the app to your home screen as a PWA
- **Analytics**: Password-protected page view dashboard

## Tech Stack

### Frontend

- **React** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **daisyUI** - Tailwind CSS component library

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database

## Project Structure

```
anchor-eats/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js        # Express app entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anchor-eats
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application Locally

### Step 1: Set Up Environment Variables

#### Backend Environment Variables

Create a [.env](backend/.env) file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
FRONTEND_URL=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

#### Frontend Environment Variables

Create a [.env](frontend/.env) file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5001/api
```

### Step 2: Start the Backend Server

From the `backend/` directory:

```bash
npm run dev
```

The backend server will start on `http://localhost:5001` (or your specified PORT).

You should see:

```
server up
```

### Step 3: Start the Frontend Development Server

Open a new terminal window and navigate to the `frontend/` directory:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

### Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## API Endpoints

All API endpoints are prefixed with `/api`:

- `GET /api/feedback` — retrieve all feedback entries
- `POST /api/feedback` — submit a new feedback entry
- `POST /api/analytics` — log a page view
- `POST /api/analytics/auth` — exchange admin credentials for a bearer token
- `GET /api/analytics` — retrieve page view stats (requires bearer token)

See the [root README](../README.md#api-endpoints) for request and response details.

## Environment Variables

### Backend ([.env](backend/.env))

| Variable       | Description               | Example                                              |
| -------------- | ------------------------- | ---------------------------------------------------- |
| `MONGO_URI`    | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `PORT`         | Backend server port       | `5001`                                               |
| `FRONTEND_URL` | Frontend URL for CORS     | `http://localhost:5173`                              |

### Frontend ([.env](frontend/.env))

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001/api` |

**Note**: Vite requires all environment variables exposed to the client to be prefixed with `VITE_`.

## Design

Figma design file: [View Design](https://www.figma.com/design/b6XmvN3zJ3Ygg13yXWLZWu/web-map?node-id=0-1&p=f)

## Deployment

The application is configured for deployment on Vercel (frontend) and Render (backend):

- **Frontend**: Automatic deployment from the `frontend/` directory
- **Backend**: Deployment from `backend/` directory

Recent commit mentions Vercel/render setup for deployment. Ensure environment variables are properly configured in your deployment platform.

## Contributing

This is a personal project created for Vanderbilt students. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
