import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useAnimals } from '@pawprintsrescue/data-access';
import { Link, useNavigate } from 'react-router-dom';
import { AnimalForm } from './components/form';

export function AnimalNew() {
  const { add } = useAnimals();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const addedAnimal = await add({ name: target.name.value });
    navigate(`/${addedAnimal.id}`);
  };

  return (
    <div>
      <Link
        to={'/'}
        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mb-4 inline-flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden />
        Back
      </Link>

      <AnimalForm onSubmit={handleSubmit} />
    </div>
  );
}
