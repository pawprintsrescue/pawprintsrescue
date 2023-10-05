import { Animal, AsmRecentlyAdopted } from './animal.model';

export type AnimalServiceMethod =
  | 'json_adoptable_animals'
  | 'json_recent_adoptions'
  | 'json_shelter_animals';

export async function getAnimalImage(id: number, thumbnail = false) {
  const method = thumbnail ? 'animal_thumbnail' : 'animal_image';
  const image = await fetch(
    `${import.meta.env.VITE_ASM_SERVICEURL}?method=${method}&account=${
      import.meta.env.VITE_ASM_ACCOUNT
    }&animalid=${id}`,
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
      }`,
    )
      .then((response) => response.json() as Promise<Animal[]>)
      .then((animals) =>
        animals.map(async (animal) => {
          const id: number =
            method === 'json_recent_adoptions'
              ? (animal as unknown as AsmRecentlyAdopted).ANIMALID
              : animal.ID;

          return {
            ...animal,
            ID: id,
            thumbnail: await getAnimalImage(id, true),
            // image: await getAnimalImage(id),
          } satisfies Animal;
        }),
      ),
  );

  if (!animals) animals = [];

  return animals;
}