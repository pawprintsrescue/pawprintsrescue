import { Animal } from '@/data';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';
import { Form, Link, useSubmit } from 'react-router-dom';
import { AnimalCard } from './animal.card';

export const AnimalList = ({
  animals,
  selected,
  q,
  pageTitle,
}: {
  animals: Animal[];
  selected: Animal | null;
  q: string | null;
  pageTitle: string;
}) => {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const submit = useSubmit();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = q === null;
    const formData = new FormData(e.target.form ?? undefined);

    if (formData.get('q') === '') formData.delete('q');

    submit(formData, { replace: !isFirstSearch });
  };

  const debounceSearchChange = debounce(handleSearchChange, 300);

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = q ?? '';
  }, [searchRef, q]);

  useEffect(() => {
    if (selected) {
      const index = animals.findIndex((animal) => animal.ID === selected.ID);
      cardRefs.current[index]?.focus();
      cardRefs.current[index]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [animals, selected]);

  useEffect(() => {
    const handleScroll = () => {
      const form = searchFormRef.current;
      const top = form?.getBoundingClientRect().top ?? 0;
      const pastTop = top <= 80;

      if (pastTop !== scrolled) setScrolled(pastTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      <Form
        ref={searchFormRef}
        id="search-form"
        role="search"
        className={clsx(
          'sticky top-20 z-20 py-4 transition-shadow',
          scrolled
            ? 'bg-brown-100 border-y border-brown-900 shadow-md shadow-black/20 p-4 md:px-6 lg:px-8 2xl:px-10 -mx-4 md:-mx-6 lg:-mx-8 2xl:-mx-10'
            : '',
        )}
      >
        <div className="flex items-center">
          <h1
            className={clsx(
              'flex-1 text-4xl font-bold transition-opacity hidden sm:block',
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
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-900 sm:text-sm sm:leading-6 focus-within:outline-none"
              placeholder="Search..."
              aria-label="Search for an animal"
              defaultValue={q ?? ''}
              onChange={debounceSearchChange}
            />
          </div>
        </div>
      </Form>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6">
        {animals.map((animal: Animal, index: number) => (
          <li id={animal.ID.toString()} key={animal.ID} className="py-4">
            <Link
              to={animal.ID.toString()}
              ref={(el) => (cardRefs.current[index] = el)}
              className="block h-full transition-all sm:hover:scale-105 shadow hover:shadow-lg rounded-lg bg-white focus-within:outline-none ring-1 ring-gray-600 focus:ring focus:ring-brown-900"
            >
              <AnimalCard animal={animal} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
