import { Animal } from '@/data';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimalCard } from './animal.card';
import { AnimalSearch } from './animal.search';

export const AnimalList = ({
  animals,
  selected,
  query,
  pageTitle,
}: {
  animals: Animal[];
  selected: Animal | null;
  query: string | null;
  pageTitle: string;
}) => {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (selected) {
      // Wait a tick for the cards to render before scrolling to the selected
      setTimeout(() => {
        const index = animals.findIndex((animal) => animal.ID === selected.ID);
        cardRefs.current[index]?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        cardRefs.current[index]?.focus({ preventScroll: true });
      }, 100);
    }
  }, [animals, selected]);

  return (
    <>
      {animals.length ? (
        <>
          <AnimalSearch query={query} pageTitle={pageTitle} />

          <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6">
            {animals.map((animal: Animal, index: number) => (
              <li id={animal.ID.toString()} key={animal.ID} className="py-4">
                <Link
                  to={animal.ID.toString()}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="block h-full transition-all sm:hover:scale-105 shadow hover:shadow-lg rounded-lg bg-white focus-within:outline-none ring-1 ring-gray-600 focus:ring focus:ring-brown-900"
                >
                  <AnimalCard animal={animal} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-8 flex flex-col gap-4 items-center justify-center bg-white/25 p-4 rounded-2xl mb-8 h-32">
          <p>Please check back for updated availablility</p>
        </div>
      )}
    </>
  );
};
