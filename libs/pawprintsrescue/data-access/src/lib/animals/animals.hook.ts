// *******************************************************************
// React HOOKS
// *******************************************************************

import { useEffect } from 'react';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { Animal } from './animals.model';
import { AnimalsViewModel } from './animals.state';
import { store, syncUrlWithStore } from './animals.store';
import { formatDate } from './animals.utils';

interface AnimalsEventHandlers {
  handleSort: (key: string) => void;
  handleAdd: () => boolean;
  handleEdit: (animal: Animal, e: React.MouseEvent<unknown>) => boolean;
  handleRemove: (animal: Animal, e: React.MouseEvent<unknown>) => boolean;
  handleSelect: (animal: Animal, e: React.MouseEvent<unknown>) => void;
  isSelected: (animal: Animal) => boolean;
}

/**
 * Hook to build and use Animals store
 */
// selector: (state: AnimalsViewModel) => Partial<AnimalsViewModel> = (state) => state,
export function useAnimals(
  syncUrl = false,
): AnimalsViewModel & AnimalsEventHandlers {
  const vm = useStoreWithEqualityFn(store());
  const {
    showSkeleton,
    searchQuery,
    selectedAnimalId,
    loadAll,
    add,
    edit,
    remove,
    select,
  } = vm;

  // Event handlers
  const handleSort = (key: string) => {
    loadAll(searchQuery, key);
  };

  const handleAdd = () => {
    const name = prompt('Enter a name for the animal');
    if (name) {
      add({ name });

      return true;
    }

    return false;
  };

  const handleEdit = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    const name = prompt('Enter a new name for the animal', animal.name);
    if (name) {
      edit({ ...animal, name });

      return true;
    }

    return false;
  };

  const handleRemove = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure you want to remove this animal?');
    if (confirmed) {
      remove(animal);

      return true;
    }

    return false;
  };

  const handleSelect = (animal: Animal, e: React.MouseEvent<unknown>) => {
    e.stopPropagation();

    select(animal);

    alert(`You selected the following animal:
${'' /* Intential blank line */}
ID: ${animal.id}
Name: ${animal.name}
Created: ${formatDate(animal.createdAt)}
    `);
  };
  const isSelected = (animal: Animal) => animal.id === selectedAnimalId;

  useEffect(() => {
    // Whenever the state changes, update the URL
    if (syncUrl) syncUrlWithStore();
  }, [vm]);

  useEffect(() => {
    if (showSkeleton) loadAll();
  }, [showSkeleton, loadAll]);

  return {
    ...vm,
    handleSort,
    handleAdd,
    handleEdit,
    handleRemove,
    handleSelect,
    isSelected,
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
