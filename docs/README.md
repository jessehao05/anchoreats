# AnchorEats

A full-stack web application that provides helpful dining features for Vanderbilt students, including a meal swipe calculator and an interactive Taste of Nashville restaurant map.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application Locally](#running-the-application-locally)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Design](#design)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

AnchorEats was created to solve common challenges faced by Vanderbilt students:

- **Meal Swipe Management**: Near the end of the semester, I was getting tired of calculating the number of days and doing the math to find out how many meal swipes I needed to use. I noticed several of my friends mentioned doing these calculations as well, so I wanted to make a tool to make doing the math faster.
- **Restaurant Map**: As for the Taste of Nashville map, there were many times during the school year where I wanted to eat out instead of going to a dining hall, but I was unfamiliar with the eligible meal money restaurants. I wished that there was a tool or map that allowed me to see only Taste of Nashville restaurants and also showed the closest restaurants to my location.

## Features

- **Meal Swipe Calculator**: Calculate how many swipes you need to use daily to reach zero by semester's end (accounting for breaks & Farmers' Market)
- **Interactive Map**: Visual display of all Taste of Nashville restaurants with your current location
- **Restaurant Search**: Search Taste of Nashville restaurants by name or description
- **Proximity Search**: Find the 5 closest Taste of Nashville restaurants to your current location
- **Dining Hall Info**: View Vanderbilt dining hall menus and hours

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
│   │   ├── seeding/
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

### Step 2: Seed the Database (Optional)

If you need to populate the database with initial restaurant data:

```bash
cd backend
npm run seed
```

### Step 3: Start the Backend Server

From the `backend/` directory:

```bash
npm run dev
```

The backend server will start on `http://localhost:5001` (or your specified PORT).

You should see:

```
server up
```

### Step 4: Start the Frontend Development Server

Open a new terminal window and navigate to the `frontend/` directory:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

### Step 5: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## API Endpoints

All API endpoints are prefixed with `/api`:

### Restaurants

#### Get All Restaurant Data

```
GET /api/data
```

**Description**: Retrieves all Taste of Nashville restaurant information including name, description, location coordinates, hours, and website.

**Response Example**:

```json
[
  {
    "_id": "...",
    "name": "Restaurant Name",
    "description": "Restaurant description",
    "website": "https://example.com",
    "location": {
      "lat": 36.1234,
      "lng": -86.5678
    },
    "hours": {
      "mon": [{ "open": "11:00 AM", "close": "10:00 PM" }],
      "tue": [{ "open": "11:00 AM", "close": "10:00 PM" }],
      ...
    }
  }
]
```

**Status Codes**:

- `200 OK` - Successfully retrieved data
- `500 Internal Server Error` - Database error

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

## Database Seeding

The project includes seeding scripts to populate the MongoDB database with initial data.

**Run the seed script**:

```bash
cd backend
npm run seed
```

The seeding data and scripts are located in [backend/src/seeding/](backend/src/seeding/).

## Design

Figma design file: [View Design](https://www.figma.com/design/b6XmvN3zJ3Ygg13yXWLZWu/web-map?node-id=0-1&p=f)

## Deployment

The application is configured for deployment on Vercel:

- **Frontend**: Automatic deployment from the `frontend/` directory
- **Backend**: Serverless functions or separate backend hosting

Recent commit mentions Vercel/render setup for deployment. Ensure environment variables are properly configured in your deployment platform.

## Contributing

This is a personal project created for Vanderbilt students. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
