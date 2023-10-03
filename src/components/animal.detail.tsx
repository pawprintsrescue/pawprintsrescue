import { Animal } from '@/data';
import { AnimalImage } from './animal.image';

export const AnimalDetail = ({ animal }: { animal: Animal }) => {
  return (
    <div className="flex flex-wrap gap-8">
      <AnimalImage
        animal={animal}
        className="[&>img]:rounded-lg [&>img]:border [&>img]:border-brown-600"
      />

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
