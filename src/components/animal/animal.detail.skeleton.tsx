import { AnimalImageSkeleton } from './animal.image.skeleton';

export const AnimalDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-4 animate-pulse">
        <h1 className="my-0.5 h-9 w-60 rounded-full bg-gray-200 text-4xl"></h1>
      </div>

      <div className="flex animate-pulse flex-col md:block">
        <AnimalImageSkeleton className="mb-4 aspect-video h-64 max-w-lg rounded-lg border border-gray-600 md:float-right md:mb-3 md:ml-3 [&>img]:rounded-lg" />

        <div className="mb-4">
          <p className="my-1.5 h-3.5 w-24 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-36 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-48 rounded-full bg-gray-200 text-sm"></p>
          <p className="my-1.5 h-3.5 w-48 rounded-full bg-gray-200 text-sm"></p>
        </div>

        <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
        <p className="my-1 mt-1 h-4 w-60 overflow-hidden rounded-full bg-gray-200 text-base md:w-auto"></p>

        <div className="hidden md:block">
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 overflow-hidden rounded-full bg-gray-200 text-base"></p>
          <p className="my-1 mt-1 h-4 w-96 overflow-hidden rounded-full bg-gray-200 text-base"></p>
        </div>

        <div className="md:clear-right"></div>
      </div>
    </div>
  );
};
