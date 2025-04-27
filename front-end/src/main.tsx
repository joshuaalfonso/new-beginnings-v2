import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Layout from './App-Layout.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Products } from './pages/Products.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'products',
        element: <Products />
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
