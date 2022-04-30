import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../structure/Header';
import HeroesListPage from '../structure/pages/HeroesListPage';
import HeroPage from '../structure/pages/HeroPage';
import NewHeroPage from '../structure/pages/NewHeroPage';
import NotFoundPage from '../structure/pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/heroes" />} />
        <Route path="/heroes" element={<HeroesListPage />} />
        <Route path="/heroes/new" element={<NewHeroPage />} />
        <Route path="/heroes/edit/:id" element={<NewHeroPage />} />
        <Route path="/heroes/:id" element={<HeroPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
