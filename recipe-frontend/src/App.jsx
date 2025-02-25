import React from 'react';
import Header from './components/layout/Header';
import Home from './components/Home';
import RecipeList from './components/recipes/RecipeList';
import CreateRecipe from './components/recipes/CreateRecipe';
import AuthForm from './components/auth/AuthForm';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
        <RecipeList />
        <CreateRecipe />
        <AuthForm />
      </main>
      <footer>
        <p>&copy; 2025 Recipe List Application. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
