import { AnimalImageSkeleton } from './animal.image.skeleton';

export const AnimalCardSkeleton = () => {
  return (
    <>
      <AnimalImageSkeleton />

      <div className="animate-pulse p-4">
        <h3 className="mb-2 mt-1 h-5 w-48 rounded-full bg-gray-200 text-xl">
          &nbsp;
        </h3>
        <div>
          <p className="my-1.5 h-3.5 w-24 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-36 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-48 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-48 rounded-full bg-gray-200 text-sm"></p>
        </div>
        <p className="my-1 mt-1 h-4 rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 rounded-full bg-gray-200 text-base"></p>
      </div>
    </>
  );
};
