// *******************************************************************
// React HOOKS
// *******************************************************************

import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import { AnimalsAPI, AnimalsViewModel } from './animals.state';
import { store } from './animals.store';

import { Animal, makeAnimal } from './animals.model';

/**
 * Hook to build and use Animals store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAnimals(selector?: any): AnimalsViewModel {
  // Auto-check if publishable
  useEffect(() => {
    const vm = store().getState();
    if (vm.showSkeleton) vm.loadAll();
  }, []);

  // return entire view model or selected slice
  return useStore(store(), selector);
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
