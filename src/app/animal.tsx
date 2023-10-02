import { Animal } from '@/data';
import { Link, Params, useLoaderData } from 'react-router-dom';
import { AnimalDetail } from '../components/animal.detail';
import { getAnimal } from '../data/animal.store';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: { params: Params<string> }) {
  const id = params.id;
  const animal = await getAnimal(id ? parseInt(id) : 0);

  return { animal };
}

export const AnimalPage = () => {
  const { animal } = useLoaderData() as { animal: Animal };

  return (
    <div>
      <Link
        to=".."
        className="bg-[#87450B] rounded-lg py-1 px-2 text-white bg-opacity-75 hover:bg-opacity-100 mb-4 inline-flex"
      >
        Back to list
      </Link>

      <AnimalDetail animal={animal} />
    </div>
  );
};
