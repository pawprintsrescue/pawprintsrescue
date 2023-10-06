import clsx from 'clsx';
import missing from '../../assets/missing.svg';
import { Animal } from '../../data';

export const AnimalImage = ({
  animal,
  className,
  thumbnail = false,
  showAdopted = true,
}: {
  animal: Animal;
  className?: string;
  thumbnail?: boolean;
  showAdopted?: boolean;
}) => {
  return (
    <div className={clsx('relative overflow-hidden bg-brown-100', className)}>
      <img
        className="w-full"
        src={thumbnail ? animal.thumbnail : animal.image}
        alt={animal.ANIMALNAME}
        onError={(event) => {
          const target = event.target as HTMLImageElement;
          target.src = missing;
        }}
      />
      {showAdopted && !animal.ADOPTABLE ? (
        <div className="absolute top-1/2 -mt-6 w-full -rotate-12 border-8 border-white text-5xl shadow-md shadow-black/20">
          <div className="text-center font-bold uppercase text-white drop-shadow-md">
            Adopted
          </div>
        </div>
      ) : null}
    </div>
  );
};
