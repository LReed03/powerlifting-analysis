import AnalyticPage from './AnalyticPage';
import SearchPage from './SearchPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage/>}/>
        <Route path="/Analysis" element={<AnalyticPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
