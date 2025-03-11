import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeDetail from './components/recipes/RecipeDetail';
import CreateRecipe from './components/recipes/CreateRecipe';
import EditRecipe from './components/recipes/EditRecipe';
import AuthForm from './components/auth/AuthForm';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipeList />} />
              {/* Updated route pattern to match ID-slug format */}
              <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/recipe/edit/:id" element={<EditRecipe />} />
              <Route path="/auth" element={<AuthForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
