/* eslint-disable react-refresh/only-export-components */
import { Animal } from '@/data';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { AppSearch } from '../components/app.search';
import { Header } from '../components/header';
import ScrollToTop from '../components/scroll-to-top';
import { getAnimals } from '../data/animal.store';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('search');
  const animals = query ? await getAnimals(query) : [];

  return {
    animals,
    query,
  };
}

function App() {
  const { animals, query } = useLoaderData() as {
    animals: Animal[];
    query: string | null;
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollToTop />

      <Header
        className={clsx(
          'fixed inset-x-0 top-0 z-30 pb-4 transition-all pt-safe-offset-4 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10',
          scrolled ? 'shadow-md shadow-black/20' : '',
        )}
        scrolled={scrolled}
      />

      <main className="relative min-h-screen">
        <div className="min-h-screen pb-safe-offset-36 pt-safe-offset-44 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10">
          <Outlet />
        </div>

        <footer className="absolute bottom-0 w-full border-t border-brown-900 bg-brown-100 pt-8 text-center text-sm shadow-md shadow-black/20 pb-safe-offset-8 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10">
          <p>
            Copyright &copy; {new Date().getFullYear()} Paw Prints Animal
            Rescue, Inc.
          </p>
          <p>P.O. Box 1472, Garner, NC 27529</p>
          <p>
            <a
              href="mailto:info@pawprintsrescue.org"
              className="font-semibold hover:underline"
            >
              info@pawprintsrescue.org
            </a>{' '}
            &bull;{' '}
            <a href="tel:9197729107" className="font-semibold hover:underline">
              (919) 772-9107
            </a>
          </p>
        </footer>
      </main>

      <AppSearch query={query} filteredAnimals={animals} />

      {scrolled ? (
        <button
          type="button"
          className="fixed bottom-10 right-0 mb-4 inline-flex rounded-lg rounded-r-none bg-brown-900 p-2 text-white transition-all hover:-translate-x-1/4 hover:scale-150"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUpIcon className="h-9 w-9" />
        </button>
      ) : null}
    </>
  );
}

export default App;
