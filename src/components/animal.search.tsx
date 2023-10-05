import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';

export const AnimalSearch = ({
  query,
  pageTitle,
}: {
  query: string | null;
  pageTitle: string;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const submit = useSubmit();
  const searchFormRef = useRef<HTMLFormElement>(null);
  const [initialSearchTop, setInitialSearchTop] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = query === null;
    const formData = new FormData(e.target.form ?? undefined);

    if (formData.get('q') === '') formData.delete('q');

    submit(formData, { replace: !isFirstSearch });
  };

  const debounceSearchChange = debounce(handleSearchChange, 300);

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = query ?? '';
  }, [searchRef, query]);

  useEffect(() => {
    const initial = searchFormRef.current?.offsetTop ?? null;

    setInitialSearchTop(initial);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (initialSearchTop === null) return;

      const form = searchFormRef.current;
      const top = form?.offsetTop ?? 0;

      setScrolled(top > initialSearchTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialSearchTop, scrolled]);

  return (
    <Form
      ref={searchFormRef}
      id="search-form"
      role="search"
      className={clsx(
        'sticky top-20 z-20 py-4 transition-shadow',
        scrolled
          ? 'bg-brown-100 border-y border-brown-900 shadow-md shadow-black/20 py-4 px-safe-offset-4 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10'
          : '',
        scrolled
          ? 'ml-[calc(env(safe-area-inset-left)*-1-1rem)] mr-[calc(env(safe-area-inset-right)*-1-1rem)] md:ml-[calc(env(safe-area-inset-left)*-1-1.5rem)] md:mr-[calc(env(safe-area-inset-right)*-1-1.5rem)] lg:ml-[calc(env(safe-area-inset-left)*-1-2rem)] lg:mr-[calc(env(safe-area-inset-right)*-1-2rem)] 2xl:ml-[calc(env(safe-area-inset-left)*-1-2.5rem)] 2xl:mr-[calc(env(safe-area-inset-right)*-1-2.5rem)]'
          : '',
      )}
    >
      <div className="flex items-center">
        <h1
          className={clsx(
            'flex-1 text-4xl font-bold transition-opacity hidden sm:block text-brown-900',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        >
          {pageTitle}
        </h1>

        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm sm:max-w-sm w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 h-9">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            ref={searchRef}
            type="search"
            name="q"
            id="q"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-1.5 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-900 sm:text-sm sm:leading-6 focus-within:outline-none"
            placeholder="Search..."
            aria-label="Search for an animal"
            defaultValue={query ?? ''}
            onChange={debounceSearchChange}
          />
        </div>
      </div>
    </Form>
  );
};
