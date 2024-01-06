import { formatDate, useAnimals } from '@pawprintsrescue/data-access';
import clsx from 'clsx';

export function AnimalList() {
  const {
    allAnimals,
    searchQuery,
    isLoading,
    showSkeleton,
    handleSearch,
    handleAdd,
    handleEdit,
    handleRemove,
    handleSelect,
    isSelected,
  } = useAnimals();

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <input
          type="search"
          name="q"
          className="rounded-md border-neutral-300 text-neutral-900 placeholder:text-neutral-500 w-full max-w-sm focus:border-info-600 focus:ring-info-600 dark:focus:border-info-500 dark:focus:ring-info-500"
          placeholder="Search animals"
          aria-label="Search animals"
          defaultValue={searchQuery}
          onChange={handleSearch}
          disabled={isLoading}
        />
        <button
          type="button"
          className="rounded-md bg-primary-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          onClick={() => handleAdd()}
          disabled={isLoading}
        >
          Add animal
        </button>
      </div>

      {showSkeleton ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-600 dark:border-neutral-500">
              <th className="text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-right">Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allAnimals.map((animal) => (
              <tr
                key={animal.id}
                className={clsx(
                  'cursor-pointer focus:outline-none',
                  isSelected(animal)
                    ? 'bg-info-200 dark:bg-info-700'
                    : 'hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-700',
                )}
                tabIndex={0}
                onClick={(e) => handleSelect(animal, e)}
                onKeyUp={(e) => handleSelect(animal, e)}
              >
                <td>{animal.id}</td>
                <td>{animal.name}</td>
                <td className="text-right">{formatDate(animal.createdAt)}</td>
                <td className="text-right">
                  <button
                    type="button"
                    className="rounded bg-neutral-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 mr-2"
                    onClick={(e) => handleEdit(animal, e)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded bg-danger-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-danger-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger-500"
                    onClick={(e) => handleRemove(animal, e)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AnimalList;
