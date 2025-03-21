import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import RecipesPage from './components/pages/RecipesPage';
import RecipeDetailsPage from './components/pages/RecipeDetailsPage';
import CreateRecipePage from './components/pages/CreateRecipePage';
import EditRecipe from './components/recipes/EditRecipe';
import AuthForm from './components/auth/AuthForm';
import './styles/main.css';
import './styles/global.css';
import './styles/App.css';

// Create a wrapper component to apply the theme
const ThemedApp = () => {
  const { theme } = useTheme(); // Access the current theme ('light' or 'dark') from ThemeContext
  
  useEffect(() => {
    // Set the theme class on the body element
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Navigation /> {/* Navigation bar for the app */}
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/login" element={<AuthForm type="login" />} /> {/* Login form */}
          <Route path="/register" element={<AuthForm type="register" />} /> {/* Registration form */}
          <Route 
            path="/recipes" 
            element={
              <ProtectedRoute> {/* Protects the route, only accessible to authenticated users */}
                <RecipesPage /> {/* Displays a list of recipes */}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recipe/:id" 
            element={
              <ProtectedRoute>
                <RecipeDetailsPage /> {/* Displays details of a specific recipe */}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-recipe" 
            element={
              <ProtectedRoute>
                <CreateRecipePage /> {/* Form to create a new recipe */}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recipe/edit/:id" 
            element={
              <ProtectedRoute>
                <EditRecipe /> {/* Form to edit an existing recipe */}
              </ProtectedRoute>
            } 
          />
          {/* Catch-all route for 404 errors */}
          <Route 
            path="*" 
            element={
              <div className="not-found">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } 
          />
        </Routes>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
};

function App() {
  return (
    <AuthProvider> {/* Provides authentication context */}
      <ThemeProvider> {/* Provides theme context */}
        <Router> {/* Enables routing for the app */}
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
