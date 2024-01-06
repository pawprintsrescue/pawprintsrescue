// *******************************************************************
// React HOOKS
// *******************************************************************

import { DebouncedFunc, debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import { Animal, makeAnimal } from './animals.model';
import { AnimalsAPI, AnimalsViewModel } from './animals.state';
import { store } from './animals.store';
import { formatDate } from './animals.utils';

interface AnimalsEventHandlers {
  handleSearch: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void>;
  handleAdd: () => void;
  handleEdit: (animal: Animal, e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemove: (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  isSelected: (animal: Animal) => boolean;
  handleSelect: (
    animal: Animal,
    e:
      | React.MouseEvent<HTMLTableRowElement>
      | React.KeyboardEvent<HTMLTableRowElement>,
  ) => void;
}

/**
 * Hook to build and use Animals store
 */
// selector: (state: AnimalsViewModel) => Partial<AnimalsViewModel> = (state) => state,
export function useAnimals(): AnimalsViewModel & AnimalsEventHandlers {
  useEffect(() => {
    const vm = store().getState();
    if (vm.showSkeleton) vm.loadAll();
  }, []);

  // Entire view model or selected slice
  // const vm = useStore(store(), selector) as AnimalsViewModel;
  const vm = useStore(store()) as AnimalsViewModel;

  // Event handlers
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    vm.loadAll(e.target.value);
  }, 300);

  const handleAdd = () => {
    const name = prompt('Enter a name for the animal');
    if (name) vm.add({ name });
  };

  const handleEdit = (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    const name = prompt('Enter a new name for the animal', animal.name);
    if (name) vm.edit({ ...animal, name });
  };

  const handleRemove = (
    animal: Animal,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to remove this animal?'))
      vm.remove(animal);
  };

  const isSelected = (animal: Animal) => animal.id === vm.selectedAnimalId;
  const handleSelect = (
    animal: Animal,
    e:
      | React.MouseEvent<HTMLTableRowElement>
      | React.KeyboardEvent<HTMLTableRowElement>,
  ) => {
    if (
      e.nativeEvent instanceof KeyboardEvent &&
      e.nativeEvent.key !== 'Enter' &&
      e.nativeEvent.key !== ' ' // Spacebar
    )
      return;

    const formatAnimal = (animal: Animal) => `
${'' /* Intential blank line */}
ID: ${animal.id}
Name: ${animal.name}
Created: ${formatDate(animal.createdAt)}
    `;

    vm.select(animal);
    alert(`You selected the following animal: ${formatAnimal(animal)}`);
  };

  return {
    ...vm,
    handleSearch,
    handleAdd,
    handleEdit,
    handleRemove,
    isSelected,
    handleSelect,
  };
}

/**
 * Hook to load specific animal by ID
 */
export type AnimalByIdResults = [Animal | undefined, AnimalsAPI];

export function useAnimalById(id: string): AnimalByIdResults {
  const selector = useCallback(
    (state: AnimalsViewModel): AnimalByIdResults => {
      const animal =
        id === 'new'
          ? makeAnimal()
          : state.allAnimals.find((it) => it.id === id);
      return [animal, state];
    },
    [id],
  );

  // return entire view model or selected slice
  return useStore(store(), selector);
}
