import { Animal } from '@/data';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, Params, redirect, useLoaderData } from 'react-router-dom';
import { AnimalImage } from '../components/animal.image';
import { getAnimal } from '../data/animal.store';
import { getAnimalLink } from '../data/animal.util';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const id = params.id;
  const animal = await getAnimal(id ? parseInt(id) : 0);

  // Redirect to the correct URL for the animal type if the animal is found
  if (animal && request.url.includes('/animals/')) {
    const url = getAnimalLink(animal);

    return redirect(url);
  }

  return { animal };
}

export const AnimalPage = () => {
  const { animal } = useLoaderData() as { animal: Animal };

  return (
    <div>
      <Link to=".." className="flex items-center mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        Back to list
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-brown-900">
        Meet {animal.ANIMALNAME}
      </h1>

      <div className="flex flex-wrap gap-8">
        <div className="flex-1">
          <div>
            <p>
              <b>Born:</b>{' '}
              {Intl.DateTimeFormat().format(new Date(animal.DATEOFBIRTH))}
            </p>
            <p>
              <b>Age:</b>{' '}
              {animal.ANIMALAGE.replace('.', '').replace('0 months', '')}
            </p>
            <p className="font-bold">
              {animal.SEX === 1
                ? animal.NEUTERED
                  ? 'Neutered '
                  : 'Spayed '
                : ''}
              {animal.SEXNAME}
            </p>
            <p className="font-bold">{animal.BASECOLOURNAME}</p>
          </div>
          <p className="mt-1 text-lg">{animal.ANIMALCOMMENTS}</p>
        </div>

        <div className="flex-1">
          <AnimalImage
            animal={animal}
            className="[&>img]:rounded-lg rounded-lg border border-brown-600 max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};
