import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingList from './pages/ShoppingList';
import Menu from './pages/Menu';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
