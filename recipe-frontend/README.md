# Recipe Management Application

## Tech Stack & Dependencies

### Frontend
- React 18 + Vite
- React Router for navigation
- CSS for styling

### Development Dependencies
```bash
npm install @vitejs/plugin-react --save-dev
npm install react-router-dom
```

## Project Setup

1. Create Vite project:
```bash
npm create vite@latest recipe-frontend -- --template react
cd recipe-frontend
```

2. Install dependencies:
```bash
npm install
npm install react-router-dom
npm install @vitejs/plugin-react --save-dev
```

3. Configure Vite:
```javascript
// filepath: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

4. Start development server:
```bash
npm run dev
```

## Project Structure
```
recipe-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthForm.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Navigation.jsx
│   │   └── recipes/
│   │       ├── CreateRecipe.jsx
│   │       ├── RecipeDetail.jsx
│   │       └── RecipeList.jsx
│   ├── styles/
│   │   └── components/
│   │       ├── Auth.css
│   │       ├── Navigation.css
│   │       └── Recipe.css
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## React Router Setup

```jsx
// filepath: src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}
```

## Development Notes

- Uses HMR (Hot Module Replacement) for fast development
- ESLint configured for React
- React Router v6 for client-side routing
- Component-based architecture
- CSS modules for styling

## Browser Support

Vite is configured to support modern browsers. For older browser support, additional configuration may be needed.
