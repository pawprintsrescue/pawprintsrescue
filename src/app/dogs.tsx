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
  const pageTitle = 'Dogs';

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-brown-900">{pageTitle}</h1>

      <p className="text-sm font-bold">All Paw Prints cats are:</p>
      <ol className="list-decimal pl-4 text-sm mb-2">
        <li>
          Tested for the feline leukemia (FeLV) and the feline immunodeficiency
          (FIV) viruses (and negative unless otherwise noted)
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
      </ol>
      <p className="text-sm mb-2 font-bold">
        Unless otherwise noted, our adoption fee for adult cats is $100 or $175
        for two adult cats.
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
