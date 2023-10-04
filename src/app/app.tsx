import { ChevronUpIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';
import ScrollToTop from '../components/scroll-to-top';

function App() {
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
          'pt-safe-offset-4 pb-4 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10 fixed top-0 inset-x-0 z-20 transition-all',
          scrolled ? 'shadow-md shadow-black/20' : '',
        )}
        scrolled={scrolled}
      />

      <main className="py-4 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10 mt-40">
        <Outlet />
      </main>

      <footer className="pb-safe-offset-8 pt-8 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10 text-sm text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} Paw Prints Animal Rescue,
          Inc.
        </p>
        <p>P.O. Box 1472, Garner, NC 27529</p>
        <p>
          <a href="tel:9197729107" className="hover:underline">
            (919) 772-9107
          </a>
        </p>
      </footer>

      {scrolled ? (
        <button
          type="button"
          className="fixed bottom-10 right-0 bg-brown-900 rounded-lg rounded-r-none p-2 transition-all text-white hover:scale-150 hover:-translate-x-1/4 mb-4 inline-flex"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUpIcon className="h-9 w-9" />
        </button>
      ) : null}
    </>
  );
}

export default App;
