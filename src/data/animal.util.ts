import { Animal, AnimalType } from './animal.model';

export const getAnimalType = (animal: Animal): AnimalType => {
  const species = animal.SPECIESNAME;
  const dob = new Date(animal.DATEOFBIRTH);
  const today = new Date();
  // DOB is within the last year
  const lastYear = today.getTime() - 365 * 24 * 60 * 60 * 1000;
  return dob.getTime() > lastYear
    ? species === 'Cat'
      ? 'Cat'
      : 'Dog' // Includes Puppy
    : 'Kitten';
};

export const getAnimalLink = (animal: Animal): string => {
  const type = getAnimalType(animal);
  let segment = 'animals';
  switch (type) {
    case 'Kitten':
      segment = 'kittens';
      break;
    case 'Cat':
      segment = 'cats';
      break;
    case 'Puppy':
      segment = 'dogs'; // puppies share the same page as dogs
      break;
    case 'Dog':
      segment = 'dogs';
      break;
  }

  return `/${segment}/${animal.ID}`;
};
