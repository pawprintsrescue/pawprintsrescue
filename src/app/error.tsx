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
    <div className="grid place-content-center gap-2 min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-2 text-brown-900">Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
