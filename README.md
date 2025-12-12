# BuddyStreaks

BuddyStreaks is a full-stack web application designed to help users track streaks for their habits and goals. The application consists of a React frontend and a Node.js backend with a PostgreSQL database.

## Features

*   Create a user to track your streaks.
*   Create new streaks with a name and frequency.
*   (Future features can be built on this foundation, such as checking in to a streak, inviting buddies, etc.)

## Tech Stack

### Frontend

*   React
*   TypeScript
*   Vite
*   `react-router-dom` for routing
*   A simple API client using `fetch`

### Backend

*   Node.js
*   Express
*   TypeScript
*   Prisma for database ORM
*   PostgreSQL for the database

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

*   Node.js and npm
*   PostgreSQL

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Set up your environment variables. Create a `.env` file in the `backend` directory and add your database connection string:
    ```
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
    ```
4.  Run the database migrations:
    ```sh
    npx prisma migrate dev
    ```
5.  Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm run dev
    ```

## API Endpoints

The backend API provides the following endpoints:

*   **`POST /users`**: Create a new user.
    *   **Request Body:** `{ "name": "Your Name" }`
    *   **Response:** `{ "id": "user-id", "name": "Your Name", "createdAt": "timestamp" }`

*   **`POST /streaks`**: Create a new streak.
    *   **Request Body:** `{ "name": "Streak Name", "frequency": "DAILY", "createdById": "user-id" }`
    *   **Response:** `{ "streak": { "id": "streak-id", ... }, "membership": { "id": "membership-id", ... } }`

*   **`GET /health`**: Health check endpoint.
    *   **Response:** `{ "status": "ok" }`
