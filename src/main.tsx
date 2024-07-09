import '@/global.css';

import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/components/layouts/MainLayout';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

const App = lazy(() => import('@/App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  </React.StrictMode>,
);
