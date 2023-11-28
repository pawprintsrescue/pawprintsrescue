/* eslint-disable react-refresh/only-export-components */
import { ReactElement, Suspense } from 'react';
import {
  Await,
  defer,
  useLoaderData,
  useLocation,
  useMatches,
} from 'react-router-dom';
import { AnimalList, AnimalListSkeleton } from '../../components';
import { Animal, AnimalType, getAnimals, getSelectedAnimal } from '../../data';

export function loader(
  { request }: { request: Request },
  animalType: AnimalType,
) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const showSkeleton = url.searchParams.get('skeleton') === 'true';
  const animals = showSkeleton
    ? new Promise<Animal[]>(() => [])
    : getAnimals(query, animalType);
  const selected = getSelectedAnimal();

  return defer({
    animals,
    selected,
    query,
  });
}

export const AnimalsPage = () => {
  const { animals, selected, query } = useLoaderData() as {
    animals: Promise<Animal[]>;
    selected: Animal | null;
    query: string | null;
  };
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = matches.find((match) => match.pathname === `${pathname}/`);
  const handle = match?.handle as {
    pageTitle: string;
    summary: ReactElement;
  };
  const pageTitle = handle?.pageTitle || 'Animals';
  const summary = handle?.summary || null;

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold text-brown-900">{pageTitle}</h1>

      {summary}

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
