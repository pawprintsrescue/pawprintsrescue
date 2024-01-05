import { Animal, useAnimals } from '@pawprintsrescue/data-access';

export function Home() {
  const { allAnimals, isLoading, showSkeleton, add, remove } = useAnimals();

  const handleAdd = () => {
    const name = `New Animal ${Math.floor(Math.random() * 1000)}`;
    add({ name });
  };

  const handleRemove = (animal: Animal) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to remove this animal?')) remove(animal);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold text-primary-500 dark:text-primary-400">
        Paw Prints Animal Rescue
      </h1>

      <hr />

      <button
        type="button"
        className="rounded-md bg-primary-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        onClick={() => handleAdd()}
        disabled={isLoading}
      >
        Add new animal
      </button>
      {showSkeleton ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-3xl font-bold">Animals</h2>
          <ul className="space-y-2">
            {allAnimals.map((animal) => (
              <li key={animal.id} className="flex items-center">
                <button
                  type="button"
                  className="rounded bg-danger-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-danger-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-500 mr-2"
                  onClick={() => handleRemove(animal)}
                >
                  X
                </button>
                {animal.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Home;
