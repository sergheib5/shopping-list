import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingList from './pages/ShoppingList';
import Menu from './pages/Menu';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
