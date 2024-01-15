import { useNavigate } from 'react-router-dom';

export interface AnimalFormProps {
  isLoading?: boolean;
  animal?: { id: string; name: string };
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AnimalForm({ isLoading, animal, onSubmit }: AnimalFormProps) {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6">
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            className="focus:ring-info-600 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Fluffy"
            defaultValue={animal?.name}
            required
            autoFocus
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          className="btn-neutral"
          onClick={(e) => navigate(`/${animal?.id}`)}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          Save
        </button>
      </div>
    </form>
  );
}
