import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import './static/css/main.scss';
import { initAutoLocationSender } from './utils/autoSendLocation';

const { PUBLIC_URL } = process.env;

const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));

const App = () => {
  useEffect(() => {
    initAutoLocationSender();
  }, []);

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;