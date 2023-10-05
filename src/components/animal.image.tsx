import { Animal } from '@/data';
import clsx from 'clsx';
import missing from '../assets/missing.svg';

export const AnimalImage = ({
  animal,
  className,
  showAdopted = true,
}: {
  animal: Animal;
  className?: string;
  showAdopted?: boolean;
}) => {
  return (
    <div className={clsx('relative overflow-hidden bg-brown-100', className)}>
      <img
        className="w-full"
        src={animal.image}
        alt={animal.ANIMALNAME}
        onError={(event) => {
          const target = event.target as HTMLImageElement;
          target.src = missing;
        }}
      />
      {showAdopted && !animal.ADOPTABLE ? (
        <div className="border-8 border-white absolute -mt-6 top-1/2 text-5xl w-full -rotate-12 shadow-md shadow-black/20">
          <div className="uppercase font-bold text-center drop-shadow-md text-white">
            Adopted
          </div>
        </div>
      ) : null}
    </div>
  );
};
