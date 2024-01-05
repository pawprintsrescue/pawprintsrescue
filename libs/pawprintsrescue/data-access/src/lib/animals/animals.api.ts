import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { Animal, makeAnimal } from './animals.model';

/**
 * Publish async API methods for CRUD (Create, Read, Update, Delete) operations
 * Note: use localforage offline storage for all store animals
 */

const allAnimals = async (): Promise<Animal[]> => {
  return (await localforage.getItem<Animal[]>('animals')) || [];
};

// Read
export async function getAnimals(query = ''): Promise<Animal[]> {
  await fakeNetwork(`getAnimals:${query}`);

  let animals = await allAnimals();
  if (query) {
    animals = matchSorter(animals, query, { keys: ['name'] });
  }

  return animals.sort(sortBy('name', 'createdAt'));
}

// Read
export async function getAnimal(id: string) {
  await fakeNetwork(`animal:${id}`);

  const animals = await allAnimals();
  const animal = animals.find((animal) => animal.id === id);

  return animal ?? null;
}

// Create
export async function createAnimal(partial: Omit<Animal, 'id' | 'createdAt'>) {
  await fakeNetwork();

  const animals = await getAnimals();
  const newAnimal = makeAnimal(partial);
  await set([newAnimal, ...animals]);

  return newAnimal;
}

// Update
export async function updateAnimal(updated: Animal) {
  await fakeNetwork();

  const animals = await allAnimals();
  const existing = animals.find((animal) => animal.id === updated.id);
  if (!existing) throw new Error(`No animal found for ${updated.id}`);

  Object.assign(existing, updated);
  await set(animals.map((it) => (it.id === existing.id ? existing : it)));

  return existing;
}

// Delete
export async function deleteAnimal(id: string) {
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

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, Promise<boolean>> = {};

async function fakeNetwork(key = '') {
  if (!key) fakeCache = {};

  if (!fakeCache[key]) {
    fakeCache[key] = new Promise((res) => {
      setTimeout(res, Math.random() * 800);
    });
  }

  return fakeCache[key];
}
