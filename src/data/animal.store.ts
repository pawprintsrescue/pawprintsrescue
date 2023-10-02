/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import * as api from './animal.api';
import { Animal } from './animal.model';

export interface AnimalState {
  animals: Animal[];
  selected?: Animal;
}

export const useAnimalStore = create(
  immer<AnimalState>(() => ({
    animals: [],
  })),
);

export const getAnimals = async (query?: string | null): Promise<Animal[]> => {
  let { animals } = useAnimalStore.getState();

  if (!animals?.length) {
    const adoptable = await api.getAnimals('json_adoptable_animals');
    const recentAdoptions = await api.getAnimals('json_recent_adoptions');
    animals = adoptable.concat(recentAdoptions);
    animals = animals.sort(sortBy('ANIMALNAME'));
    useAnimalStore.setState({ animals, selected: undefined }); // Clear selected animal
  }

  if (query) {
    animals = matchSorter(animals, query, {
      keys: [
        'ANIMALNAME',
        'DATEOFBIRTH',
        'ANIMALAGE',
        'SEXNAME',
        'BASECOLOURNAME',
        'ANIMALCOMMENTS',
      ],
    });
  }

  return animals;
};

export const getAnimal = async (id: number): Promise<Animal | null> => {
  let { animals } = useAnimalStore.getState();
  if (!animals?.length) animals = await getAnimals();

  const animal = animals?.find((animal) => animal.ID === id);
  useAnimalStore.setState({ selected: animal });

  return animal ?? null;
};

export const getSelectedAnimal = (): Animal | null => {
  const { selected } = useAnimalStore.getState();

  return selected ?? null;
};
