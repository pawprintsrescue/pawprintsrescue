import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AboutPage } from './app/about/about';
import App, { loader as appLoader } from './app/app';
import { ContactPage } from './app/contact/contact';
import ErrorPage from './app/error';
import { FeralPage } from './app/feral/feral';
import { HomePage } from './app/home/home';
import { SupportPage } from './app/support/support';
import { WishListPage } from './app/wish-list/wish-list';
import { CatsSummary } from './components/cats.summary';
import { DogsSummary } from './components/dogs.summary';
import { KittensSummary } from './components/kittens.summary';
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
          path: 'kittens',
          children: [
            {
              index: true,
              async lazy() {
                const { AnimalsPage, loader } = await import(
                  './app/animals/animals'
                );
                return {
                  Component: AnimalsPage,
                  loader: (args) => loader(args, 'Kitten'),
                  handle: { pageTitle: 'Kittens', summary: <KittensSummary /> },
                };
              },
            },
            { path: ':id', lazy: () => import('./app/animal/animal') },
          ],
        },
        {
          path: 'cats',
          children: [
            {
              index: true,
              async lazy() {
                const { AnimalsPage, loader } = await import(
                  './app/animals/animals'
                );
                return {
                  Component: AnimalsPage,
                  loader: (args) => loader(args, 'Cat'),
                  handle: { pageTitle: 'Cats', summary: <CatsSummary /> },
                };
              },
            },
            { path: ':id', lazy: () => import('./app/animal/animal') },
          ],
        },
        {
          path: 'dogs',
          children: [
            {
              index: true,
              async lazy() {
                const { AnimalsPage, loader } = await import(
                  './app/animals/animals'
                );
                return {
                  Component: AnimalsPage,
                  loader: (args) => loader(args, 'Dog'),
                  handle: { pageTitle: 'Dogs', summary: <DogsSummary /> },
                };
              },
            },
            { path: ':id', lazy: () => import('./app/animal/animal') },
          ],
        },
        {
          path: 'puppies',
          children: [{ path: '*', element: <Navigate to="/dogs" /> }],
        },
        { path: 'feral', element: <FeralPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'wish-list', element: <WishListPage /> },
        { path: 'support', element: <SupportPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'animals', element: <Navigate to="/" /> },
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
