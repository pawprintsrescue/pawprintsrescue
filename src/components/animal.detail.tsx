import { Animal } from '@/data';
import missing from '../assets/missing.svg';

export const AnimalDetail = ({ animal }: { animal: Animal }) => {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="relative">
        <img
          className="rounded-lg border border-gray-600 max-w-5xl w-full"
          src={animal.image}
          alt={animal.ANIMALNAME}
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            target.src = missing;
          }}
        />
        {!animal.ADOPTABLE ? (
          <span className="uppercase absolute -mt-6 top-1/2 text-5xl font-bold w-full text-center -rotate-12 opacity-75">
            Adopted
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-1">{animal.ANIMALNAME}</h3>
        <div className="text-gray-600">
          <p className="text-sm">
            <b>Born:</b>{' '}
            {Intl.DateTimeFormat().format(new Date(animal.DATEOFBIRTH))}
          </p>
          <p className="text-sm">
            <b>Age:</b>{' '}
            {animal.ANIMALAGE.replace('.', '').replace('0 months', '')}
          </p>
          <p className="text-sm font-bold">
            {animal.SEX === 1
              ? animal.NEUTERED
                ? 'Neutered '
                : 'Spayed '
              : ''}
            {animal.SEXNAME}
          </p>
          <p className="text-sm font-bold">{animal.BASECOLOURNAME}</p>
        </div>
        <p className="mt-1 text-gray-900">{animal.ANIMALCOMMENTS}</p>
      </div>
    </div>
  );
};
