/* eslint-disable react-refresh/only-export-components */
import { Animal } from '@/data';
import { useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { AnimalList } from '../components/animal.list';
import { getAnimals, getSelectedAnimal } from '../data/animal.store';

export async function loader() {
  const animals = await getAnimals();
  const cats = animals.filter((animal) => {
    const dob = new Date(animal.DATEOFBIRTH);
    const today = new Date();
    // DOB is within the last year
    return dob.getTime() <= today.getTime() - 365 * 24 * 60 * 60 * 1000;
  });
  const selected = getSelectedAnimal();

  return { animals: cats, selected };
}

export const CatsPage = () => {
  const { hash } = useLocation();
  const { animals, selected } = useLoaderData() as {
    animals: Animal[];
    selected: Animal | null;
  };

  useEffect(() => {
    const fragment = hash.substring(1);
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [hash]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">Cats</h1>
      <p className="text-sm mb-2 text-gray-900">
        <strong>All Paw Prints cats are:</strong>
        <ol className="list-decimal list-inside">
          <li>
            Tested for the feline leukemia (FeLV) and the feline
            immunodeficiency (FIV) viruses (and negative unless otherwise noted)
          </li>
          <li>Vaccinated appropriate to their age</li>
          <li>Sterilized</li>
          <li>Microchipped</li>
        </ol>
      </p>
      <p className="text-sm mb-2 text-gray-900 font-bold">
        Unless otherwise noted, our adoption fee for adult cats is $100 or $175
        for two adult cats.
      </p>
      <AnimalList animals={animals} selected={selected} />
    </div>
  );
};
