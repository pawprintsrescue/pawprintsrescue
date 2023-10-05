import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
    ? error.message
    : '';

  return (
    <div className="grid min-h-screen place-content-center gap-2 text-center">
      <h1 className="mb-2 text-4xl font-bold text-brown-900">Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
