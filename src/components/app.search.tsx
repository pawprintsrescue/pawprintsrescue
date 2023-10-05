import { Animal } from '@/data';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import debounce from 'lodash/debounce';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  Form,
  Link,
  useLocation,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { AnimalImage } from './animal.image';

export const AppSearch = ({
  query,
  filteredAnimals,
}: {
  query: string | null;
  filteredAnimals: Animal[];
}) => {
  const [open, setOpen] = useState(query !== null);
  const searchRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = query === null;
    const formData = new FormData(e.target.form ?? undefined);

    if (formData.get('search') === '') formData.delete('search');

    submit(formData, { replace: !isFirstSearch, action: pathname });
  };

  const debounceSearchChange = debounce(handleSearchChange, 300);

  const resetSearch = () => {
    submit(null, { action: pathname });
  };

  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"></div>
      <style>{`
        #search-spinner {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");
          animation: spin 1s infinite linear;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={resetSearch}
        appear
        afterEnter={() => {
          if (searchRef.current) searchRef.current.value = query ?? '';
        }}
      >
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4 sm:p-6 md:p-48">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                <Form id="app-search-form" role="search">
                  <Combobox
                  // onChange={(person: any) => (window.location = person.url)}
                  >
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className={clsx(
                          isSearching ? 'hidden' : '',
                          'pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400',
                        )}
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        ref={searchRef}
                        name="search"
                        id="search"
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        defaultValue={query ?? ''}
                        onChange={debounceSearchChange}
                      />
                      <div
                        id="search-spinner"
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                        aria-hidden
                        hidden={!isSearching}
                      />
                    </div>
                    <div className="bg-brown-50 px-4 py-2.5 text-xs font-semibold text-gray-900">
                      Search for an animal&apos;s name, age, color, or
                      description
                    </div>

                    {filteredAnimals.length > 0 && (
                      <Combobox.Options
                        static
                        className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                      >
                        {filteredAnimals.map((animal) => (
                          <Combobox.Option
                            key={animal.ID}
                            value={animal}
                            className="py-0.5"
                          >
                            <Link
                              to={`/animals/${animal.ID}`}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-brown-100 focus:outline-none focus:bg-brown-50 w-full"
                              onClick={() => setOpen(false)}
                            >
                              <AnimalImage
                                animal={animal}
                                className="rounded-lg border border-brown-600 w-16 aspect-square grid place-items-center"
                                showAdopted={false}
                              />
                              <span className="text-brown-900 font-bold px-2 flex items-center">
                                {animal.ANIMALNAME}
                                {!animal.ADOPTABLE ? (
                                  <span className="ml-1 text-gray-900 text-xs font-semibold">
                                    [Adopted]
                                  </span>
                                ) : null}
                              </span>
                              <span className="text-sm text-gray-600">
                                <b>Age:</b>{' '}
                                {animal.ANIMALAGE.replace('.', '').replace(
                                  '0 months',
                                  '',
                                )}
                              </span>
                              <span className="text-sm text-gray-600 font-bold">
                                {animal.SEX === 1
                                  ? animal.NEUTERED
                                    ? 'Neutered '
                                    : 'Spayed '
                                  : ''}
                                {animal.SEXNAME}
                              </span>
                              <span className="text-sm text-gray-600 font-bold">
                                {animal.BASECOLOURNAME}
                              </span>
                            </Link>
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    )}

                    {query !== null && filteredAnimals.length === 0 && (
                      <p className="p-4 text-sm text-gray-500">
                        No animals found.
                      </p>
                    )}
                  </Combobox>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
