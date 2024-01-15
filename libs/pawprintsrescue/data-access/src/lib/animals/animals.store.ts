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
        sortBy = 'name',
        sortDirection?: 'asc' | 'desc',
      ): Promise<Animal[]> => {
        const { allAnimals } = await trackStatus(async () => {
          const sortKeys = [sortBy];
          sortDirection =
            sortDirection ??
            (sortBy === get().sortBy && get().sortDirection === 'asc'
              ? 'desc'
              : 'asc');
          const allAnimals = await getAnimals(query, sortKeys, sortDirection);

          return {
            allAnimals,
            searchQuery: query || '',
            sortBy,
            sortDirection,
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
    // On app startup, determine if we have search params in the URL
    syncStoreWithUrl(_store);
  }

  return _store;
};

export const api = (): AnimalsAPI => {
  return store().getState();
};

// *******************************************************************
// Bookmark URL Synchronizer
// *******************************************************************

export interface AnimalsUrlParams {
  q?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
  id?: string;
  forceSkeleton?: boolean;
}

export const syncUrlWithStore = (state?: AnimalsViewModel) => {
  const defaultState: AnimalsState = initState();

  state = state ?? store().getState();
  const { searchQuery, sortBy, sortDirection, selectedAnimalId } = state;
  const { pathname } = window.location;
  const searchParams = new URLSearchParams({
    ...(searchQuery ? { q: searchQuery } : {}),
    ...(sortBy && sortBy !== defaultState.sortBy ? { sort: sortBy } : {}),
    ...(sortDirection && sortDirection !== defaultState.sortDirection
      ? { direction: sortDirection }
      : {}),
    // Only include the selectedAnimalId if it is not already in the URL as a path param
    ...(selectedAnimalId && !pathname.includes(`/${selectedAnimalId}`)
      ? { id: selectedAnimalId }
      : {}),
  });

  const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;

  if (window.location.href !== url) {
    window.history.replaceState({}, '', url);
  }
};

const syncStoreWithUrl = async (_store: StoreApi<AnimalsViewModel>) => {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);
  const searchQuery = searchParams.get('q') ?? undefined;
  const sortBy = searchParams.get('sort') ?? undefined;
  const sortDirection = searchParams.get('direction') ?? undefined;
  const selectedAnimalId = searchParams.get('id') ?? undefined;
  const forceSkeleton = searchParams.get('forceSkeleton') ?? false;

  const { getState: get, setState: set } = _store;
  set({ selectedAnimalId, forceSkeleton: Boolean(forceSkeleton) });

  if (searchQuery || sortBy || sortDirection) {
    get().loadAll(
      searchQuery,
      sortBy,
      sortDirection as 'asc' | 'desc' | undefined,
    );
  }
};
