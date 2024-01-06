import { AnimalList } from '@pawprintsrescue/ui';

export function App() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-4xl font-bold text-primary-500 dark:text-primary-400">
        Paw Prints Animal Rescue
      </h1>

      <hr />

      <AnimalList />
    </div>
  );
}

export default App;
