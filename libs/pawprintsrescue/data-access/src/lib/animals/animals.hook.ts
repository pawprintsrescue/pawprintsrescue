// *******************************************************************
// React HOOKS
// *******************************************************************

import { DebouncedFunc, debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { Animal } from './animals.model';
import { AnimalsViewModel } from './animals.state';
import { store, updateUrlWithState } from './animals.store';
import { formatDate } from './animals.utils';

interface AnimalsEventHandlers {
  isSearching: boolean;
  handleSearch: DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void>;
  handleSort: (key: string) => void;
  handleAdd: () => boolean;
  handleEdit: (animal: Animal, e: React.MouseEvent<unknown>) => boolean;
  handleRemove: (animal: Animal, e: React.MouseEvent<unknown>) => boolean;
  isSelected: (animal: Animal) => boolean;
  handleSelect: (animal: Animal, e: React.MouseEvent<unknown>) => void;
}

/**
 * Hook to build and use Animals store
 */
// selector: (state: AnimalsViewModel) => Partial<AnimalsViewModel> = (state) => state,
export function useAnimals(): AnimalsViewModel & AnimalsEventHandlers {
  // Entire view model or selected slice
  // const vm = useStore(store(), selector) as AnimalsViewModel;
  const vm = useStore(store()) as AnimalsViewModel;

  // Event handlers
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSearching(true);

      await vm.loadAll(e.target.value);

      setIsSearching(false);
    },
    500,
  );

  const handleSort = (key: string) => {
    vm.loadAll(vm.searchQuery, key);
  };

  const handleAdd = () => {
    const name = prompt('Enter a name for the animal');
    if (name) {
      vm.add({ name });

      return true;
    }

    return false;
  };

  const handleEdit = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    const name = prompt('Enter a new name for the animal', animal.name);
    if (name) {
      vm.edit({ ...animal, name });

      return true;
    }

    return false;
  };

  const handleRemove = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure you want to remove this animal?');
    if (confirmed) {
      vm.remove(animal);

      return true;
    }

    return false;
  };

  const isSelected = (animal: Animal) => animal.id === vm.selectedAnimalId;
  const handleSelect = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    vm.select(animal);

    alert(`You selected the following animal:
${'' /* Intential blank line */}
ID: ${animal.id}
Name: ${animal.name}
Created: ${formatDate(animal.createdAt)}
    `);
  };

  useEffect(() => {
    const vm = store().getState();
    updateUrlWithState(vm);
    if (vm.showSkeleton) vm.loadAll();
  }, []);

  return {
    ...vm,
    isSearching,
    handleSearch,
    handleSort,
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
export type AnimalByIdResults = [Animal | undefined, AnimalsViewModel];

export function useAnimalById(id: string): AnimalByIdResults {
  const vm = useAnimals();
  const animal = vm.allAnimals.find((it) => it.id === id);

  return [animal, vm];
}
