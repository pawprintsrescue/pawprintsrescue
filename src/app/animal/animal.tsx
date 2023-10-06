/* eslint-disable react-refresh/only-export-components */
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Suspense } from 'react';
import { Await, Link, Params, defer, useLoaderData } from 'react-router-dom';
import { AnimalDetail, AnimalDetailSkeleton } from '../../components';
import { Animal, getAnimal } from '../../data';

export function loader({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const id = params.id;
  const url = new URL(request.url);
  const showSkeleton = url.searchParams.get('skeleton') === 'true';
  const animal = showSkeleton
    ? new Promise<Animal>(() => ({}))
    : getAnimal(id ? parseInt(id) : 0);

  return defer({ animal });
}

export const AnimalPage = () => {
  const { animal } = useLoaderData() as { animal: Promise<Animal> };

  return (
    <div>
      <Link to=".." className="mb-4 flex items-center">
        <ArrowLeftIcon className="mr-1 h-5 w-5" />
        Back to list
      </Link>

      <Suspense fallback={<AnimalDetailSkeleton />}>
        <Await resolve={animal}>
          {(resolvedAnimal: Animal) => <AnimalDetail animal={resolvedAnimal} />}
        </Await>
      </Suspense>
    </div>
  );
};
