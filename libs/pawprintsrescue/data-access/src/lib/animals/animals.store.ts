/* eslint-disable @typescript-eslint/no-explicit-any */
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, createStore } from 'zustand/vanilla';

import {
  createAnimal,
  deleteAnimal,
  getAnimal,
  getAnimals,
  updateAnimal,
} from './animals.api';
import { Animal } from './animals.model';

import {
  computeWith,
  getErrorMessages,
  initStoreState,
  trackStatusWith,
  upsert,
  waitFor,
} from '@shared/data-access';
import { AnimalsAPI, AnimalsState, AnimalsViewModel } from './animals.state';

// *******************************************************************
// initializers
// *******************************************************************

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: () => 'animals:loadAll',
  findById: (id: string) => `animals:findById:${id}`,
};

const initState = (): AnimalsState => ({
  ...initStoreState(),
  allAnimals: [],
  searchQuery: '',
});

// *******************************************************************
// AnimalsStore Factory
// *******************************************************************

/**
 * Create an instance of the Zustand store engine for Animals
 */
export function buildAnimalsStore(): StoreApi<AnimalsViewModel> {
  // Calculate our computed properties
  const buildComputedFn = (
    partial: Partial<AnimalsViewModel>,
  ): AnimalsViewModel => {
    const state = partial as AnimalsState;
    const errors = getErrorMessages(state);

    return {
      ...state,
      errors,
    } as AnimalsViewModel;
  };

  /**
   * Factory to create a Zustand Reactive AnimalsStore; which emits a AnimalsViewModel
   */
  const configureStore = (
    set: (data: any) => any,
    get: () => AnimalsState,
    store: StoreApi<AnimalsViewModel>,
  ): AnimalsViewModel => {
    set = computeWith<AnimalsViewModel>(buildComputedFn, store);

    const trackStatus = trackStatusWith(get, set);

    const data: AnimalsState = initState();
    const computed = buildComputedFn(data);

    const api: AnimalsAPI = {
      loadAll: async (query?: string) => {
        const { searchQuery } = get();
        if (query === searchQuery) return get().allAnimals;

        const allAnimals = await waitFor(ACTIONS.loadAll(), () =>
          trackStatus<Animal[]>(async () => {
            const allAnimals = await getAnimals(query);
            return { allAnimals, searchQuery: query || '' };
          }),
        );

        return allAnimals;
      },
      add: async (partial: Omit<Animal, 'id' | 'createdAt'>) => {
        const animal = await trackStatus<Animal>(async () => {
          const animal = await createAnimal(partial);
          const allAnimals = await get().allAnimals;

          return { allAnimals: upsert(animal, allAnimals) };
        });

        return animal;
      },
      findById: async (id: string) => {
        const animal = await waitFor<Animal | null>(ACTIONS.findById(id), () =>
          getAnimal(id),
        );

        return animal;
      },
      edit: async (animal: Animal, optimistic = false) => {
        const saveEntity = (it: Animal) => (state: AnimalsState) => {
          const allAnimals = upsert(it, state.allAnimals);

          return { allAnimals };
        };

        if (animal.id === 'new') animal.id = '';
        if (optimistic) set(saveEntity(animal));

        const updated = await updateAnimal(animal);
        set(saveEntity(updated));

        return updated;
      },
      remove: async (animal: Animal) => {
        const deleted = await deleteAnimal(animal.id);
        if (deleted) {
          set((state: AnimalsState) => ({
            allAnimals: state.allAnimals.filter((it) => it.id !== animal.id),
          }));
        }

        return deleted;
      },
    };

    // Initial Store view model
    return {
      ...data,
      ...computed,
      ...api,
    };
  };

  /**
   * Enable the ReactiveStore for Redux DevTools, and persistence to localStorage,
   * and ensure the ViewModel is immutable using Immer
   */
  const store = createStore<AnimalsViewModel>()(
    // prettier-ignore
    devtools(
        immer(
          configureStore
        ), 
        { name: 'store:animals' }
      ),
  );

  return store;
}

// *******************************************************************
// Singleton instance of the Zustand store engine for Animals
// *******************************************************************

let _store: StoreApi<AnimalsViewModel>;

export const store = () => {
  if (!_store) {
    _store = buildAnimalsStore();
    syncUrlWithStore(_store);
  }

  return _store;
};

export const api = (): AnimalsAPI => {
  return store().getState();
};

// *******************************************************************
// Bookmark URL Synchronizer
// *******************************************************************

const syncUrlWithStore = (_store: StoreApi<AnimalsViewModel>) => {
  // On app startup, determine if we have a search query in the URL
  const { searchParams } = new URL(document.location.href);
  const searchQuery = searchParams.get('q');
  if (searchQuery) {
    _store.getState().loadAll(searchQuery);
  }

  // Whenever the searchQuery changes, update the URL
  _store.subscribe((state) => {
    const { searchQuery } = state;
    const { searchParams } = new URL(document.location.href);

    if (searchQuery) searchParams.set('q', searchQuery);
    else searchParams.delete('q');

    const newUrl =
      window.location.pathname +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : '');
    window.history.replaceState({}, '', newUrl);
  });
};
