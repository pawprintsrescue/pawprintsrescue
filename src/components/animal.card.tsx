import { Animal } from '@/data';

export const AnimalCard = ({ animal }: { animal: Animal }) => {
  return (
    <>
      <div className="relative">
        <img
          className="rounded-t-lg border-b border-gray-600"
          src={animal.image}
          alt={animal.ANIMALNAME}
          onError={(event) => {
            const target = event.target as HTMLImageElement;
            target.src = 'https://placehold.co/300?text=No+Image';
          }}
        />
        {!animal.ADOPTABLE ? (
          <span className="uppercase absolute -mt-6 top-1/2 text-5xl font-bold w-full text-center -rotate-12 opacity-75">
            Adopted
          </span>
        ) : null}
      </div>

      <div className="p-4">
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
    </>
  );
};
