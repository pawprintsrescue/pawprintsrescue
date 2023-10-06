import { Animal } from '@/data';
import { AnimalImage } from './animal.image';

export const AnimalCard = ({ animal }: { animal: Animal }) => {
  return (
    <>
      <AnimalImage
        animal={animal}
        className="rounded-t-lg border-b border-gray-600 [&>img]:rounded-t-lg"
        thumbnail
      />

      <div className="p-4">
        <h3 className="mb-1 text-xl font-bold text-brown-900">
          {animal.ANIMALNAME}
        </h3>

        <div className="mb-4 text-gray-600">
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

        <p className="mt-1">{animal.ANIMALCOMMENTS}</p>
      </div>
    </>
  );
};