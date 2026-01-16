import { useState } from 'react';
import NewYearCountdown from './NewYearCountdown';
import { getAllShoppingListItems, getAllMenuItems } from '../firebase/db';
import { exportAllDataToCSV } from '../utils/csvExport';
import './Header.css';

const Header = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportAllDataToCSV(getAllShoppingListItems, getAllMenuItems);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <NewYearCountdown />
        <button 
          className="export-button"
          onClick={handleExport}
          disabled={isExporting}
          title="Export all data to CSV"
        >
          {isExporting ? 'Exporting...' : '📥 Export CSV'}
        </button>
      </div>
    </header>
  );
};

export default Header;

