import { Link, Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="p-8">
      <Link to="/" className="mb-4 inline-block">
        <h1 className="text-primary-500 dark:text-primary-400 text-4xl font-bold">
          Paw Prints Animal Rescue
        </h1>
      </Link>

      <Outlet />
    </div>
  );
}

export default App;
