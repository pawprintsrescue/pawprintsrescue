import { AnimalCardSkeleton } from './animal.card.skeleton';
import { AnimalSearchSkeleton } from './animal.search.skeleton';

export const AnimalListSkeleton = () => {
  return (
    <>
      <AnimalSearchSkeleton />

      <ul className="grid gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, index: number) => (
          <li id={index.toString()} key={index} className="py-4">
            <div className="h-full rounded-lg bg-white ring-1 ring-gray-600">
              <AnimalCardSkeleton />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
