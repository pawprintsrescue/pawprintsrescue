import { Animal } from '@/data';
import { AnimalImage } from './animal.image';

export const AnimalDetail = ({ animal }: { animal: Animal }) => {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-brown-900">
        Meet {animal.ANIMALNAME}
      </h1>

      <div className="flex flex-col md:block">
        <AnimalImage
          animal={animal}
          className="order-1 mt-4 max-w-lg rounded-lg border border-brown-600 md:order-none md:float-right md:mb-3 md:ml-3 md:mt-0 [&>img]:rounded-lg"
        />

        <div className="mb-4">
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
      <div className="md:clear-right"></div>
    </>
  );
};
