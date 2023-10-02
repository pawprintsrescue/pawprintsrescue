import { Animal } from './animal.model';

export type AnimalServiceMethod =
  | 'json_adoptable_animals'
  | 'json_recent_adoptions'
  | 'json_shelter_animals';

export async function getAnimalImage(id: number) {
  const method = 'animal_image';
  const image = await fetch(
    `${import.meta.env.VITE_ASM_SERVICEURL}?method=${method}&account=${
      import.meta.env.VITE_ASM_ACCOUNT
    }&animalid=${id}&seq=1`
  )
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      const blob = new Blob([arrayBuffer]);
      return URL.createObjectURL(blob);
    });

  return image;
}

export async function getAnimals(method = 'json_shelter_animals') {
  let animals = await Promise.all(
    await fetch(
      `${import.meta.env.VITE_ASM_SERVICEURL}?method=${method}&account=${
        import.meta.env.VITE_ASM_ACCOUNT
      }&username=${import.meta.env.VITE_ASM_USERNAME}&password=${
        import.meta.env.VITE_ASM_PASSWORD
      }`
    )
      .then((response) => response.json() as Promise<Animal[]>)
      .then((animals) =>
        animals.map(async (animal) => ({
          ...animal,
          image: await getAnimalImage(animal.ID),
        }))
      )
  );

  if (!animals) animals = [];

  return animals;
}

// export async function createAnimal() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let animal = { id, createdAt: Date.now() };
//   let animals = await getAnimals();
//   animals.unshift(animal);
//   await set(animals);
//   return animal;
// }

// export async function getAnimal(id) {
//   await fakeNetwork(`animal:${id}`);
//   let animals = await localforage.getItem('animals');
//   let animal = animals.find((animal) => animal.id === id);
//   return animal ?? null;
// }

// export async function updateAnimal(id, updates) {
//   await fakeNetwork();
//   let animals = await localforage.getItem('animals');
//   let animal = animals.find((animal) => animal.id === id);
//   if (!animal) throw new Error('No animal found for', id);
//   Object.assign(animal, updates);
//   await set(animals);
//   return animal;
// }

// export async function deleteAnimal(id) {
//   let animals = await localforage.getItem('animals');
//   let index = animals.findIndex((animal) => animal.id === id);
//   if (index > -1) {
//     animals.splice(index, 1);
//     await set(animals);
//     return true;
//   }
//   return false;
// }

// function set(animals) {
//   return localforage.setItem('animals', animals);
// }

// // fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }
