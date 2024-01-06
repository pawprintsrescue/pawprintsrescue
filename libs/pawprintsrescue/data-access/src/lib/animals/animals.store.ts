import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, createStore } from 'zustand/vanilla';

import {
  computeWith,
  getErrorMessages,
  initStoreState,
  trackStatusWith,
  upsert,
  waitFor,
} from '@shared/data-access';
import {
  createAnimal,
  deleteAnimal,
  getAnimal,
  getAnimals,
  updateAnimal,
} from './animals.api';
import { Animal } from './animals.model';
import {
  AnimalsAPI,
  AnimalsComputedState,
  AnimalsState,
  AnimalsViewModel,
} from './animals.state';

// *******************************************************************
// initializers
// *******************************************************************

/**
 * These ACTIONS enable waitFor() to look up existing, async request (if any)
 */
const ACTIONS = {
  loadAll: () => 'animals:loadAll',
  findById: (id: string) => `animals:findById:${id}`,
  add: () => `animals:add`,
  edit: (id: string) => `animals:edit:${id}`,
  remove: (id: string) => `animals:remove:${id}`,
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
  const buildComputedFn = (state: AnimalsState): AnimalsComputedState => {
    const selectedAnimal = state.allAnimals.find(
      (it) => it.id === state.selectedAnimalId,
    );
    const errors = getErrorMessages(state);

    return {
      selectedAnimal,
      errors,
    };
  };

  /**
   * Factory to create a Zustand Reactive AnimalsStore; which emits a AnimalsViewModel
   */
  const configureStore = (
    set: (
      state:
        | Partial<AnimalsState>
        | ((state: AnimalsState) => Partial<AnimalsState>),
    ) => void,
    get: () => AnimalsState,
    store: StoreApi<AnimalsViewModel>,
  ): AnimalsViewModel => {
    set = computeWith(buildComputedFn, store);

    const trackStatus = trackStatusWith(set, get);

    const state: AnimalsState = initState();
    const computed: AnimalsComputedState = buildComputedFn(state);

    const api: AnimalsAPI = {
      loadAll: async (query?: string): Promise<Animal[]> => {
        const { searchQuery } = get();
        if (query === searchQuery) return get().allAnimals;

        const { allAnimals } = await trackStatus(async () => {
          const allAnimals = await getAnimals(query);

          return {
            allAnimals,
            searchQuery: query || '',
          };
        }, ACTIONS.loadAll());

        return allAnimals;
      },
      findById: async (id: string): Promise<Animal | null> => {
        const animal = await waitFor<Animal | null>(
          () => getAnimal(id),
          ACTIONS.findById(id),
        );

        return animal;
      },
      add: async (
        partial: Omit<Animal, 'id' | 'createdAt'>,
      ): Promise<Animal> => {
        let created = partial as Animal;

        await trackStatus(async () => {
          created = await createAnimal(partial);
          const allAnimals = await get().allAnimals;

          return {
            allAnimals: upsert(created, allAnimals),
            searchQuery: '',
            selectedAnimalId: created.id,
          };
        }, ACTIONS.add());

        return created;
      },
      edit: async (animal: Animal, optimistic = false): Promise<Animal> => {
        let updated = animal;

        await trackStatus(async () => {
          if (optimistic)
            set((state: AnimalsState) => ({
              allAnimals: upsert(animal, state.allAnimals),
            }));

          updated = await updateAnimal(animal);
          const allAnimals = await get().allAnimals;

          return {
            allAnimals: upsert(updated, allAnimals),
            searchQuery: '',
            selectedAnimalId: updated.id,
          };
        }, ACTIONS.edit(animal.id));

        return updated;
      },
      remove: async (animal: Animal): Promise<boolean> => {
        let deleted = false;

        await trackStatus(async () => {
          deleted = await deleteAnimal(animal.id);
          const allAnimals = await get().allAnimals;

          return {
            allAnimals: deleted
              ? allAnimals.filter((it) => it.id !== animal.id)
              : allAnimals,
            selectedAnimalId: '',
          };
        }, ACTIONS.remove(animal.id));

        return deleted;
      },
      select: (animal: Animal) => {
        set({ selectedAnimalId: animal.id });
      },
    };

    // Initial Store view model
    return {
      ...state,
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
  // On app startup, determine if we have search params in the URL
  const { searchParams } = new URL(document.location.href);
  const { q: searchQuery, id: selectedAnimalId } =
    Object.fromEntries(searchParams);

  if (searchQuery) _store.getState().loadAll(searchQuery);
  if (selectedAnimalId) _store.setState({ selectedAnimalId });

  // Whenever the state changes, update the URL
  _store.subscribe((state) => {
    const { searchParams } = new URL(document.location.href);
    const { searchQuery, selectedAnimalId } = state;

    if (searchQuery) searchParams.set('q', searchQuery);
    else searchParams.delete('q');

    if (selectedAnimalId) searchParams.set('id', selectedAnimalId);
    else searchParams.delete('id');

    const newUrl =
      window.location.pathname +
      (searchParams.size > 0 ? `?${searchParams.toString()}` : '');
    window.history.replaceState({}, '', newUrl);
  });
};
