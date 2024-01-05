export interface Animal {
  id: string;
  name: string;

  createdAt?: number;
}

export function makeAnimal(data: Partial<Animal> = {}): Animal {
  return {
    id: data.id ?? makeAnimalId(),
    name: data.name ?? '',
    createdAt: data.createdAt ?? Date.now(),
  };
}

export function makeAnimalId(): string {
  return Math.random().toString(36).substring(2, 9);
}
