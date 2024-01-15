import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Animal, useAnimalById } from '@pawprintsrescue/data-access';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimalForm } from './components/form';

export function AnimalEdit() {
  const { animalId } = useParams();
  const [animal, { showSkeleton, isLoading, edit }] = useAnimalById(
    animalId as string,
  );
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const editedAnimal = await edit({
      ...(animal as Animal),
      name: target.name.value,
    });
    navigate(`/${editedAnimal.id}`);
  };

  return (
    <div>
      <Link
        to={animal?.id ? `/${animal?.id}` : '/'}
        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mb-4 inline-flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden />
        Back
      </Link>

      {showSkeleton ? (
        <div>Loading...</div>
      ) : animal ? (
        <AnimalForm
          isLoading={isLoading}
          animal={animal}
          onSubmit={handleSubmit}
        />
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
