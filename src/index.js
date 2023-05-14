import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Detail from './pages/Detail';
import Navigation from './components/Navigations';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Discussion from './pages/Discussion';
import BookChat from './pages/BookChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/detail/:id' element={<Detail />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/discussion" element={<Discussion />} />
      <Route path="/discussion/:id" element={<BookChat />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  </BrowserRouter>


);


