import { AnimalImageSkeleton } from './animal.image.skeleton';

export const AnimalCardSkeleton = () => {
  return (
    <>
      <AnimalImageSkeleton />

      <div className="p-4 animate-pulse">
        <h3 className="text-xl mb-2 h-5 mt-1 bg-gray-200 rounded-full w-48">
          &nbsp;
        </h3>
        <div>
          <p className="text-sm h-3.5 my-1.5 bg-gray-200 rounded-full w-24"></p>
          <p className="text-sm h-3.5 my-1.5 bg-gray-200 rounded-full w-36"></p>
          <p className="text-sm h-3.5 my-1.5 bg-gray-200 rounded-full w-48"></p>
          <p className="text-sm h-3.5 my-1.5 bg-gray-200 rounded-full w-48"></p>
        </div>
        <p className="mt-1 text-base h-4 my-1 bg-gray-200 rounded-full"></p>
        <p className="mt-1 text-base h-4 my-1 bg-gray-200 rounded-full"></p>
        <p className="mt-1 text-base h-4 my-1 bg-gray-200 rounded-full"></p>
      </div>
    </>
  );
};
