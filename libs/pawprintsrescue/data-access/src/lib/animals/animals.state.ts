import { StoreState } from '@shared/data-access';
import { Animal } from './animals.model';

// *******************************************************************
// Types and initializers
// *******************************************************************

/**
 * This state is serializable
 */
export interface AnimalsState extends StoreState {
  allAnimals: Animal[];
  searchQuery: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  selectedAnimalId?: string;
}

/**
 * Read-only values computed from existing/updated state
 */
export interface AnimalsComputedState {
  selectedAnimal?: Animal;
  errors: string[];
}

/**
 * This is a simple API meant for use within the
 * UI layer html templates
 */
export interface AnimalsAPI {
  // Animals RAVE (Remove, Add, View, Edit) - synonymous with CRUD
  loadAll: (
    query?: string,
    sortBy?: string,
    sortDirection?: 'asc' | 'desc',
  ) => Promise<Animal[]>; // View
  findById: (id: string) => Promise<Animal | null>; // View
  add: (partial: Omit<Animal, 'id' | 'createdAt'>) => Promise<Animal>; // Add
  edit: (animal: Animal, optimistic?: boolean) => Promise<Animal>; // Edit
  remove: (animal: Animal) => Promise<boolean>; // Remove
  select: (animal: Animal) => void;
}

export type AnimalsViewModel = AnimalsState & AnimalsComputedState & AnimalsAPI;
