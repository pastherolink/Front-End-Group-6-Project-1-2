import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeDetail from './components/recipes/RecipeDetail';
import CreateRecipe from './components/recipes/CreateRecipe';
import AuthForm from './components/auth/AuthForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/auth" element={<AuthForm />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 Recipe List Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
