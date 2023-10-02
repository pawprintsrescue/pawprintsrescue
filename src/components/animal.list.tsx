import { Animal } from '@/data';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimalCard } from './animal.card';

export const AnimalList = ({
  animals,
  selected,
}: {
  animals: Animal[];
  selected: Animal | null;
}) => {
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (selected) {
      const index = animals.findIndex((animal) => animal.ID === selected.ID);
      cardRefs.current[index]?.focus();
      cardRefs.current[index]?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [animals, selected]);

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6">
      {animals.map((animal: Animal, index: number) => (
        <li id={animal.ID.toString()} key={animal.ID} className="py-4">
          <Link
            to={animal.ID.toString()}
            ref={(el) => (cardRefs.current[index] = el)}
            className="block h-full transition-all hover:scale-105 shadow hover:shadow-lg rounded-lg bg-white focus-within:outline-none ring-1 ring-gray-700 focus:ring focus:ring-[#87450B]"
          >
            <AnimalCard animal={animal} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
