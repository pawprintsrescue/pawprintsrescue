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
  sortBy: 'name',
  sortDirection: 'asc',
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
      loadAll: async (
        query?: string,
        sortBy?: string,
        sortDirection?: 'asc' | 'desc',
      ): Promise<Animal[]> => {
        const { allAnimals } = await trackStatus(async () => {
          const sortKeys = sortBy ? [sortBy || 'name'] : undefined;
          sortDirection =
            sortDirection ??
            (sortBy
              ? sortBy === get().sortBy && get().sortDirection === 'asc'
                ? 'desc'
                : 'asc'
              : undefined);
          const allAnimals = await getAnimals(query, sortKeys, sortDirection);

          return {
            allAnimals,
            searchQuery: query || '',
            sortBy: sortBy || 'name',
            sortDirection: sortDirection || 'asc',
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
          // const allAnimals = await get().allAnimals;
          const { searchQuery, sortBy, sortDirection } = get();
          const allAnimals = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all animals with existing search query and sorting

          return {
            // allAnimals: upsert(created, allAnimals),
            allAnimals,
            searchQuery: '',
            selectedAnimalId: created.id,
          };
        }, ACTIONS.add());

        return created;
      },
      edit: async (animal: Animal, optimistic = false): Promise<Animal> => {
        let updated = animal;

        await trackStatus(async () => {
          if (optimistic) {
            set((state: AnimalsState) => ({
              allAnimals: upsert(animal, state.allAnimals),
            }));
          }

          updated = await updateAnimal(animal);
          // const allAnimals = await get().allAnimals;
          const { searchQuery, sortBy, sortDirection } = get();
          const allAnimals = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all animals with existing search query and sorting

          return {
            // allAnimals: upsert(updated, allAnimals),
            allAnimals,
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
          // const allAnimals = await get().allAnimals;
          const { searchQuery, sortBy, sortDirection } = get();
          const allAnimals = await api.loadAll(
            searchQuery,
            sortBy,
            sortDirection,
          ); // reload all animals with existing search query and sorting

          return {
            // allAnimals: deleted
            //   ? allAnimals.filter((it) => it.id !== animal.id)
            //   : allAnimals,
            allAnimals,
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

export const updateStoreWithUrl = async (
  _store: StoreApi<AnimalsViewModel>,
) => {
  const { searchParams } = new URL(window.location.href);
  const {
    q: searchQuery,
    sort: sortBy,
    direction: sortDirection,
    id: selectedAnimalId,
    forceSkeleton,
  } = Object.fromEntries(searchParams) as {
    q?: string;
    sort?: string;
    direction?: 'asc' | 'desc';
    id?: string;
    forceSkeleton?: string;
  };

  _store.setState({ selectedAnimalId });
  _store.setState({ forceSkeleton: Boolean(forceSkeleton) });

  if (searchQuery || sortBy || sortDirection)
    await _store.getState().loadAll(searchQuery, sortBy, sortDirection);
};

export const updateUrlWithState = (state: AnimalsViewModel) => {
  const { searchQuery, sortBy, sortDirection, selectedAnimalId } = state;
  const { pathname } = window.location;
  const searchParams = new URLSearchParams({
    ...(searchQuery ? { q: searchQuery } : {}),
    ...(sortBy ? { sort: sortBy } : {}),
    ...(sortDirection ? { direction: sortDirection } : {}),
    // Only include the selectedAnimalId if it's not already in the URL as a path param
    ...(selectedAnimalId && !pathname.includes(`/${selectedAnimalId}`)
      ? { id: selectedAnimalId }
      : {}),
  });

  const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;

  if (window.location.href !== url) {
    window.history.replaceState({}, '', url);
  }
};

const syncUrlWithStore = (_store: StoreApi<AnimalsViewModel>) => {
  // On app startup, determine if we have search params in the URL
  updateStoreWithUrl(_store);

  // Whenever the state changes, update the URL
  _store.subscribe(updateUrlWithState);
};
