# AnchorEats

A full-stack web application that provides helpful dining features for Vanderbilt students, including a meal swipe calculator and an interactive Taste of Nashville restaurant map.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Design](#design)
- [Deployment](#deployment)

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

## Design

Figma design file: [View Design](https://www.figma.com/design/b6XmvN3zJ3Ygg13yXWLZWu/web-map?node-id=0-1&p=f)

## Deployment

- **Frontend**: Vercel
- **Backend**: Render
