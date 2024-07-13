
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('./screens/HomePage'))
const ItemDetails = React.lazy(() => import('./screens/ItemDetails'))

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<ItemDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
