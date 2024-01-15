import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import {
  Animal,
  formatDate,
  useAnimalById,
} from '@pawprintsrescue/data-access';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

export function AnimalDetail() {
  const { animalId } = useParams();
  const [animal, { showSkeleton, isLoading, remove }] = useAnimalById(
    animalId as string,
  );
  const navigate = useNavigate();

  const handleRemove = async (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(
      `Are you sure you want to remove ${animal.name}?`,
    );
    if (confirmed) {
      await remove(animal);
      navigate('/');
    }
  };

  return (
    <div>
      <Link
        to={animal?.id ? `/?id=${animal?.id}` : '/'}
        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-500 mb-4 inline-flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden />
        Back
      </Link>

      {showSkeleton ? (
        <div>Loading...</div>
      ) : animal ? (
        <>
          <h2 className="text-3xl font-bold">{animal.name}</h2>
          <p>{animal.id}</p>
          <p>{formatDate(animal.createdAt)}</p>

          <div className="mt-4 space-x-2">
            <button
              type="button"
              className="btn-neutral"
              onClick={() => navigate(`/${animal.id}/edit`)}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={(e) => handleRemove(animal, e)}
              disabled={isLoading}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
