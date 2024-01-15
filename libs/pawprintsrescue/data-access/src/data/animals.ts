import { faker } from '@faker-js/faker';
import { Animal } from '../lib/animals';

// Generate 10 animals using faker
const animals: Animal[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.animal.cat(),
  createdAt: faker.date.past().getTime(),
}));

export default animals;
