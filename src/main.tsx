import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AnimalPage, loader as animalLoader } from './app/animal';
import App from './app/app';
import { CatsPage, loader as catsLoader } from './app/cats';
import ErrorPage from './app/error';
import { KittensPage, loader as kittensLoader } from './app/kittens';
import './styles.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to="/kittens" /> },
        {
          path: 'kittens',
          children: [
            { index: true, element: <KittensPage />, loader: kittensLoader },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
        {
          path: 'cats',
          children: [
            { index: true, element: <CatsPage />, loader: catsLoader },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
      ],
    },
    { path: '*', element: <Navigate to="/" /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
