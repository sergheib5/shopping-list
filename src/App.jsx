import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingList from './pages/ShoppingList';
import Menu from './pages/Menu';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Get base path from environment variable
// Defaults to '/' for Vercel and local dev
// For GitHub Pages, set VITE_BASE_PATH to your repo name (e.g., '/shopping-list/')
const basePath = import.meta.env.VITE_BASE_PATH || '/';

function App() {
  return (
    <ErrorBoundary>
      <Router basename={basePath}>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
