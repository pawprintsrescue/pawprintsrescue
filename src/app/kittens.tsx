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
    : getAnimals(query, 'Kitten');
  const selected = getSelectedAnimal();

  return defer({
    animals,
    selected,
    query,
  });
}

export const KittensPage = () => {
  const { animals, selected, query } = useLoaderData() as {
    animals: Promise<Animal[]>;
    selected: Animal | null;
    query: string | null;
  };
  const pageTitle = 'Kittens';

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-brown-900">{pageTitle}</h1>

      <p className="text-sm font-bold">All Paw Prints kittens are:</p>
      <ol className="mb-2 list-decimal pl-4 text-sm">
        <li>
          Tested for the feline leukemia (FeLV) and the feline immunodeficiency
          (FIV) viruses (and negative unless otherwise noted)
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
        <li>Treated for internal and external parasites</li>
      </ol>
      <p className="mb-2 text-sm font-bold">
        Unless otherwise noted, our adoption fee for kittens is $125 or $215 for
        two kittens.
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
