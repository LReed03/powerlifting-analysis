import SearchPage from './SearchPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
