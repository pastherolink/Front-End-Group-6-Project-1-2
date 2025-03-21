# Recipe App Frontend

The React frontend (built with Vite) for our Recipe Management application.

## Prerequisites

- Node.js 14+ 
- npm or yarn

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Project Structure
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   ├── pages/     # Page components
│   │   └── recipes/   # Recipe components
│   ├── styles/        # CSS styles
│   │   ├── components/# Component-specific styles
│   │   └── global.css # Global styles
│   ├── utils/         # Utility functions
│   │   ├── api.js     # API interaction utilities
│   │   └── useRecipes.js # Recipe hook
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
└── index.html         # HTML template

## API Integration

The frontend communicates with the backend API using utilities in `src/utils/api.js`. The default API URL is configured to connect to `http://localhost:8080/api`. Make sure the backend server is running before starting the frontend.

## API Routes

The frontend communicates with the following backend API routes:

- **GET /api/recipes**: Fetch all recipes.
- **GET /api/recipes/:id**: Fetch details of a specific recipe by ID.
- **POST /api/recipes**: Create a new recipe (requires authentication).
- **PUT /api/recipes/:id**: Update an existing recipe by ID (requires authentication).
- **DELETE /api/recipes/:id**: Delete a recipe by ID (requires authentication).
- **POST /api/auth/login**: Authenticate a user and return a token.
- **POST /api/auth/register**: Register a new user.

Make sure the backend server is running and accessible at the URL specified in the `.env` file.

## Features

- View all recipes
- View detailed recipe information
- Create new recipes
- Edit existing recipes
- Delete recipes
- Responsive design

## Development Notes

This project uses:
- **React** for UI components
- **Vite** as the build tool and development server
- **React Router** for navigation
- **CSS Modules** for component styling