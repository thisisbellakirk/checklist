import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

const App = () => {
  return (
    <>



      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/checklist" replace />}
          />
          <Route
            path="/*"
            element={
              <MainLayout />
            }
          />
        </Routes>
      </Router>




    </>
  );
}

export default App;
