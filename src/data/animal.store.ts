import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import * as api from './animal.api';
import { Animal, AnimalType, Species } from './animal.model';

export interface AnimalState {
  animals: Animal[];
  type?: AnimalType;
  selected?: Animal;
}

export const useAnimalStore = create(
  immer<AnimalState>(() => ({
    animals: [],
  })),
);

export const getAnimals = async (
  query?: string | null,
  animalType?: AnimalType,
): Promise<Animal[]> => {
  let { animals, type } = useAnimalStore.getState();

  if (!animals?.length) {
    const adoptable = await api.getAnimals('json_adoptable_animals');
    const recentAdoptions = await api.getAnimals('json_recent_adoptions');
    animals = adoptable.concat(recentAdoptions);
    animals = animals.sort(sortBy('ANIMALNAME'));
    useAnimalStore.setState({ animals, selected: undefined }); // Clear selected animal
  }

  if (type !== animalType) useAnimalStore.setState({ selected: undefined }); // Clear selected animal

  if (animalType) {
    type = animalType;
    const species: Species =
      animalType === 'Cat' || animalType === 'Kitten' ? 'Cat' : 'Dog';
    animals = animals.filter((animal) => animal.SPECIESNAME === species);
    animals = animals.filter((animal) => {
      const dob = new Date(animal.DATEOFBIRTH);
      const today = new Date();
      // DOB is within the last year
      const lastYear = today.getTime() - 365 * 24 * 60 * 60 * 1000;
      return type === 'Kitten' || type === 'Puppy'
        ? dob.getTime() > lastYear
        : dob.getTime() <= lastYear;
    });
    useAnimalStore.setState({ type });
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
    useAnimalStore.setState({ selected: undefined }); // Clear selected animal
  }

  // Simulate network delay to provide a better UX
  // await new Promise((resolve) => setTimeout(resolve, 400));

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
