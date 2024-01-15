import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useAnimals } from '@pawprintsrescue/data-access';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimalList } from './components/list';

export function AnimalDashboard() {
  const vm = useAnimals(true);
  const {
    allAnimals,
    searchQuery,
    isLoading,
    showSkeleton,
    isSearching,
    handleSearch,
  } = vm;
  const navigate = useNavigate();

  // Synchronize the input value with the URL query string.
  // This is a simpler way of setting the value instead of using a controlled input.
  const qRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (qRef.current) {
      qRef.current.value = searchQuery;
    }
  }, [searchQuery]);

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="relative w-full max-w-sm">
          <input
            ref={qRef}
            type="search"
            name="q"
            className="focus:border-info-600 focus:ring-info-600 dark:focus:border-info-500 dark:focus:ring-info-500 w-full rounded-md border-neutral-300 pl-10 text-neutral-900 placeholder:text-neutral-500"
            placeholder="Search animals"
            aria-label="Search animals"
            defaultValue={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
          <MagnifyingGlassIcon
            className={clsx(
              isSearching ? 'hidden' : '',
              'absolute left-2 top-2 h-6 w-6 text-neutral-500',
            )}
            aria-hidden
          />
          <ArrowPathIcon
            className={clsx(
              isSearching ? '' : 'hidden',
              'absolute left-2 top-2 h-6 w-6 animate-spin text-neutral-500',
            )}
            aria-hidden
          />
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate('/new')}
          disabled={isLoading}
        >
          New
        </button>
      </div>

      {showSkeleton ? (
        <div>Loading...</div>
      ) : allAnimals.length === 0 ? (
        <div>No animals found.</div>
      ) : (
        <AnimalList />
      )}
    </>
  );
}

export default AnimalDashboard;
