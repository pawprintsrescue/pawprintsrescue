import { faker } from '@faker-js/faker';

export interface Animal {
  id: string;
  name: string;
  createdAt: number;
}

export function makeAnimal(partial?: Partial<Animal>): Animal {
  return {
    id: partial?.id ?? generateAnimalId(),
    name: partial?.name ?? '',
    createdAt: partial?.createdAt ?? Date.now(),
  } satisfies Animal;
}

export function generateAnimalId(): string {
  return faker.string.uuid();
}
