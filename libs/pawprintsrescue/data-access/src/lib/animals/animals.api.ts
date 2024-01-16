import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import animals from '../../data/animals';
import { Animal, makeAnimal } from './animals.model';

/**
 * Publish async API methods for CRUD (Create, Read, Update, Delete) operations
 * Note: use localforage offline storage for all store animals
 */

const allAnimals = async (): Promise<Animal[]> => {
  let storedAnimals = await localforage.getItem<Animal[]>('animals');
  if (!storedAnimals) {
    storedAnimals = await set(animals);
  }

  return storedAnimals;
};

// Read
export async function getAnimals(
  query = '',
  sortKey = 'name',
  sortDirection = 'asc',
): Promise<Animal[]> {
  // await fakeNetwork(`getAnimals:${query}`);
  await fakeNetwork(`getAnimals:${query}`);

  let animals = await allAnimals();
  if (query) {
    animals = matchSorter(animals, query, { keys: ['name'] });
  }

  return animals.sort(
    sortBy(sortDirection === 'asc' ? `${sortKey}` : `-${sortKey}`),
  );
}

// Read
export async function getAnimal(id: string): Promise<Animal | null> {
  await fakeNetwork(`animal:${id}`);

  const animals = await allAnimals();
  const animal = animals.find((animal) => animal.id === id);

  return animal ?? null;
}

// Create
export async function createAnimal(
  partial: Omit<Animal, 'id' | 'createdAt'>,
): Promise<Animal> {
  await fakeNetwork();

  const animals = await allAnimals();
  const newAnimal = makeAnimal(partial);
  await set([newAnimal, ...animals]);

  return newAnimal;
}

// Update
export async function updateAnimal(updated: Animal): Promise<Animal> {
  await fakeNetwork();

  const animals = await allAnimals();
  const existing = animals.find((animal) => animal.id === updated.id);
  if (!existing) throw new Error(`No animal found for ${updated.id}`);

  updated = { ...existing, ...updated };
  await set(animals.map((it) => (it.id === updated.id ? updated : it)));

  return updated;
}

// Delete
export async function deleteAnimal(id: string): Promise<boolean> {
  await fakeNetwork();

  const animals = await allAnimals();
  const index = animals.findIndex((animal) => animal.id === id);
  if (index > -1) {
    animals.splice(index, 1);
    await set(animals);

    return true;
  }

  return false;
}

function set(animals: Animal[]) {
  return localforage.setItem('animals', animals);
}

// Fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, Promise<boolean>> = {};

async function fakeNetwork(key = '') {
  if (!key) fakeCache = {};

  if (!fakeCache[key]) {
    fakeCache[key] = new Promise((resolve) => {
      const timeout = Math.random() * 800;

      console.debug('fakeNetwork', { key, timeout });

      setTimeout(resolve, timeout);
    });
  }

  return fakeCache[key];
}
