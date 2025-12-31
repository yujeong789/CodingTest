import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VotePage from './pages/VotePage';
import ResultPage from './pages/ResultPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vote" replace />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
