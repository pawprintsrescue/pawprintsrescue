/* eslint-disable react-refresh/only-export-components */
import { Animal } from '@/data';
import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { AnimalList } from '../components/animal.list';
import { AnimalListSkeleton } from '../components/animal.list.skeleton';
import { getAnimals, getSelectedAnimal } from '../data/animal.store';

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const showSkeleton = url.searchParams.get('skeleton') === 'true';
  const animals = showSkeleton
    ? Promise.race<Animal[]>([])
    : getAnimals(query, 'Dog');
  const selected = getSelectedAnimal();

  return defer({
    animals,
    selected,
    query,
  });
}

export const DogsPage = () => {
  const { animals, selected, query } = useLoaderData() as {
    animals: Promise<Animal[]>;
    selected: Animal | null;
    query: string | null;
  };
  const pageTitle = 'Dogs & Puppies';

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-brown-900">{pageTitle}</h1>

      <p className="text-sm font-bold">
        All Paw Prints dogs and older puppies are:
      </p>
      <ol className="mb-2 list-decimal pl-4 text-sm">
        <li>
          Heartworm tested (and negative unless otherwise noted) and on
          heartworm prevention
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
        <li>Treated for internal and external parasites</li>
      </ol>
      <p className="mb-2 text-sm font-bold">
        Unless otherwise noted, our adoption fee for dogs and older puppies is
        $200 or two for $350, and the adoption fee for senior dogs (7+ years) is
        $100.
      </p>

      <Suspense fallback={<AnimalListSkeleton />}>
        <Await resolve={animals}>
          {(resolvedAnimals: Animal[]) => (
            <AnimalList
              animals={resolvedAnimals}
              selected={selected}
              query={query}
              pageTitle={pageTitle}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};
