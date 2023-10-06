import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { AboutPage } from './app/about/about';
import { AnimalPage, loader as animalLoader } from './app/animal/animal';
import { AnimalsPage, loader as animalsLoader } from './app/animals/animals';
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
          path: 'animals',
          children: [
            { index: true, element: <Navigate to="/" /> },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
        {
          path: 'kittens',
          children: [
            {
              index: true,
              element: <AnimalsPage />,
              loader: (args) => animalsLoader(args, 'Kitten'),
              handle: { pageTitle: 'Kittens', summary: <KittensSummary /> },
            },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
        {
          path: 'cats',
          children: [
            {
              index: true,
              element: <AnimalsPage />,
              loader: (args) => animalsLoader(args, 'Cat'),
              handle: { pageTitle: 'Cats', summary: <CatsSummary /> },
            },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
          ],
        },
        {
          path: 'dogs',
          children: [
            {
              index: true,
              element: <AnimalsPage />,
              loader: (args) => animalsLoader(args, 'Dog'),
              handle: { pageTitle: 'Dogs', summary: <DogsSummary /> },
            },
            { path: ':id', element: <AnimalPage />, loader: animalLoader },
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
