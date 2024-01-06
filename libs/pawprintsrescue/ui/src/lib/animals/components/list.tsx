import { Animal, formatDate, useAnimals } from '@pawprintsrescue/data-access';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function AnimalList() {
  const {
    allAnimals,
    isLoading,
    sortBy,
    sortDirection,
    selectedAnimal,
    select,
    handleSort,
    handleAdd,
    handleEdit,
    handleRemove,
    isSelected,
    handleSelect,
  } = useAnimals();
  const navigate = useNavigate();
  const animalRefs = useRef<HTMLTableRowElement[]>([]);

  const navigateToAnimal = (
    animal: Animal,
    e: React.MouseEvent<unknown> | React.KeyboardEvent<unknown>,
  ) => {
    if (
      e.nativeEvent instanceof KeyboardEvent &&
      e.nativeEvent.key !== 'Enter' &&
      e.nativeEvent.key !== ' ' // Spacebar
    ) {
      return;
    }

    e.stopPropagation();

    if (isLoading) return;

    select(animal);
    navigate(`/${animal.id}`);
  };

  useEffect(() => {
    if (selectedAnimal && animalRefs.current) {
      const index = allAnimals.findIndex((a) => a.id === selectedAnimal?.id);
      animalRefs.current[index]?.focus();
    }
  }, [allAnimals, selectedAnimal]);

  return (
    <div className="flow-root">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-600 dark:border-neutral-500">
              <th
                className="hidden cursor-pointer p-2 text-left sm:table-cell"
                onClick={() => handleSort('id')}
              >
                ID
                {SortIndicator({ key: 'id', sortBy, sortDirection })}
              </th>
              <th
                className="cursor-pointer p-2 text-left"
                onClick={() => handleSort('name')}
              >
                Name
                {SortIndicator({ key: 'name', sortBy, sortDirection })}
              </th>
              <th
                className="hidden cursor-pointer p-2 text-right sm:table-cell"
                onClick={() => handleSort('createdAt')}
              >
                Created
                {SortIndicator({ key: 'createdAt', sortBy, sortDirection })}
              </th>
              <th className="p-2">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allAnimals.map((animal, index) => (
              <tr
                ref={(el) => {
                  if (el) animalRefs.current[index] = el;
                }}
                key={animal.id}
                className={clsx(
                  'cursor-pointer focus:outline-none',
                  isSelected(animal)
                    ? 'bg-info-200 dark:bg-info-700'
                    : 'hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700',
                )}
                tabIndex={0}
                onClick={(e) => navigateToAnimal(animal, e)}
                onKeyUp={(e) => navigateToAnimal(animal, e)}
              >
                <td className="hidden p-2 sm:table-cell">{animal.id}</td>
                <td className="whitespace-nowrap p-2">{animal.name}</td>
                <td className="hidden p-2 text-right sm:table-cell">
                  {formatDate(animal.createdAt)}
                </td>
                <td className="p-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      // className="text-info-500 enabled:hover:text-info-400 dark:text-info-400 dark:enabled:hover:text-info-300 focus:text-info-400 dark:focus:text-info-300 focus:outline-none disabled:opacity-50"
                      className="btn-info btn-link"
                      onClick={(e) => handleSelect(animal, e)}
                      disabled={isLoading}
                    >
                      View<span className="sr-only">, {animal.name}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-neutral btn-link"
                      onClick={(e) => handleEdit(animal, e)}
                      disabled={isLoading}
                    >
                      Edit<span className="sr-only">, {animal.name}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-danger btn-link"
                      onClick={(e) => handleRemove(animal, e)}
                      disabled={isLoading}
                    >
                      Remove<span className="sr-only">, {animal.name}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="p-2 text-right">
                <button
                  type="button"
                  className="btn-primary btn-link"
                  onClick={() => handleAdd()}
                  disabled={isLoading}
                >
                  Add an animal
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

interface SortIndicatorProps {
  key: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

function SortIndicator({ key, sortBy, sortDirection }: SortIndicatorProps) {
  return sortBy === key ? (
    <>
      <span
        className={clsx(
          'inline-block',
          sortDirection === 'asc' ? 'rotate-180 pr-2' : 'pl-2',
        )}
      >
        ^
      </span>
      <span className="sr-only">
        {sortDirection === 'asc' ? 'sorted ascending' : 'sorted descending'}
      </span>
    </>
  ) : null;
}
