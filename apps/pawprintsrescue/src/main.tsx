import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  AnimalDashboard,
  AnimalDetail,
  AnimalEdit,
  AnimalNew,
} from '@pawprintsrescue/ui';
import App from './app/app';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <AnimalDashboard /> },
      { path: 'new', element: <AnimalNew /> },
      { path: ':animalId', element: <AnimalDetail /> },
      { path: ':animalId/edit', element: <AnimalEdit /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
