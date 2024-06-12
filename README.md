# Demo-Project-Google-Login

## Overview

This is a Node.js application that allows users to register, log in via local, Facebook, or Google authentication, and fetch weather data based on their stored location using the OpenWeatherMap API. The application uses Express.js for the server, Sequelize for database ORM, Passport.js for authentication, and axios for making API requests.

## Features

- User Registration and Login (Local)
- Social Login via Facebook and Google
- Fetch Weather Data based on User's Location
- Session-based Authentication with Passport.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MySQL](https://www.mysql.com/) or other supported SQL database
- [Facebook Developer Account](https://developers.facebook.com/) (for Facebook OAuth)
- [Google Developer Account](https://console.developers.google.com/) (for Google OAuth)
- [OpenWeatherMap API Key](https://home.openweathermap.org/users/sign_up)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app

2. **Install dependencies:**

   npm install

3. **Set up the environment variables:**

   Create a .env file in the root directory and add the following:

  DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_HOST=your_database_host
  DB_DIALECT=mysql # or your preferred SQL dialect

  SESSION_SECRET=your_session_secret
  
  FACEBOOK_CLIENT_ID=your_facebook_client_id
  FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
  FACEBOOK_CALLBACK_URL=http://localhost:3000/api/auth/facebook/callback

  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

  OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

4. **Start the application:**

    node index.js

5. **API Endpoints**
  **Authentication Routes**
  POST /api/auth/register - Register a new user.

  Request Body: { "name": "John Doe", "email": "john@example.com", "password": "secret", "location": "New York" }
  Response: { "message": "User registered successfully!", "data": { ...userDetails } }
  POST /api/auth/login - Log in a user.

  Request Body: { "email": "john@example.com", "password": "secret" }
  Response: { "message": "User logged in successfully!", "data": { ...userDetails } }
  GET /api/auth/facebook - Redirect to Facebook for authentication.

  GET /api/auth/facebook/callback - Facebook authentication callback.

  GET /api/auth/google - Redirect to Google for authentication.

  GET /api/auth/google/callback - Google authentication callback.

  **Weather Route**
  GET /api/weather - Fetch weather data for the authenticated user's location.
  Response: { "message": "Weather data fetched successfully!", "data": { ...weatherData } }
