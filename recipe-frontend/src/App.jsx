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
  const { theme } = useTheme();
  
  useEffect(() => {
    // Set the theme class on the body element
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Navigation />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/register" element={<AuthForm type="register" />} />
          <Route 
            path="/recipes" 
            element={
              <ProtectedRoute>
                <RecipesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recipe/:id" 
            element={
              <ProtectedRoute>
                <RecipeDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-recipe" 
            element={
              <ProtectedRoute>
                <CreateRecipePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recipe/edit/:id" 
            element={
              <ProtectedRoute>
                <EditRecipe />
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
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
