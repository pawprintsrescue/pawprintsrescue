import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AboutPage } from './app/about';
import { AnimalPage, loader as animalLoader } from './app/animal';
import App, { loader as appLoader } from './app/app';
import { CatsPage, loader as catsLoader } from './app/cats';
import { ContactPage } from './app/contact';
import { DogsPage, loader as dogsLoader } from './app/dogs';
import ErrorPage from './app/error';
import { FeralPage } from './app/feral';
import { HomePage } from './app/home';
import { KittensPage, loader as kittensLoader } from './app/kittens';
import { SupportPage } from './app/support';
import { WishListPage } from './app/wish-list';
import './styles.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      loader: appLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'animals',
          children: [
            { index: true, element: <Navigate to="/" /> },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
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
        {
          path: 'puppies',
          children: [{ path: '*', element: <Navigate to="/dogs" /> }],
        },
        {
          path: 'dogs',
          children: [
            { index: true, element: <DogsPage />, loader: dogsLoader },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
        { path: 'feral', element: <FeralPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'wish-list', element: <WishListPage /> },
        { path: 'support', element: <SupportPage /> },
        { path: 'contact', element: <ContactPage /> },
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
