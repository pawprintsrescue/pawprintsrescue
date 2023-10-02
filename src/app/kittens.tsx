/* eslint-disable react-refresh/only-export-components */
import { Animal } from '@/data';
import { useLoaderData } from 'react-router-dom';
import { AnimalList } from '../components/animal.list';
import { getAnimals, getSelectedAnimal } from '../data/animal.store';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const animals = await getAnimals('kitten', q);
  const selected = getSelectedAnimal();

  return { animals, selected, q };
}

export const KittensPage = () => {
  const { animals, selected, q } = useLoaderData() as {
    animals: Animal[];
    selected: Animal | null;
    q: string | null;
  };
  const pageTitle = 'Kittens';

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{pageTitle}</h1>
      <p className="text-sm text-gray-900 font-bold">
        All Paw Prints kittens are:
      </p>
      <ol className="list-decimal list-inside text-sm mb-2 text-gray-900">
        <li>
          Tested for the feline leukemia (FeLV) and the feline immunodeficiency
          (FIV) viruses (and negative unless otherwise noted)
        </li>
        <li>Vaccinated appropriate to their age</li>
        <li>Sterilized</li>
        <li>Microchipped</li>
        <li>Treated for internal and external parasites</li>
      </ol>
      <p className="text-sm mb-2 text-gray-900 font-bold">
        Unless otherwise noted, our adoption fee for kittens is $125 or $215 for
        two kittens.
      </p>
      <AnimalList
        animals={animals}
        selected={selected}
        q={q}
        pageTitle={pageTitle}
      />
    </div>
  );
};
