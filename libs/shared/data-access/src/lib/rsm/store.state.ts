export type RestErrorMessage = { memberNames?: string[]; errorMessage: string };
export type RestErrors = RestErrorMessage[];

// ****************************************************
// Store State
// ****************************************************

type Errors = { errors?: RestErrors };

/**
 * Selector to quickly determine isLoading state
 */
export type StoreState = {
  requestStatus: StatusState;

  // these are computed values based on request status
  isReady: boolean; // state == 'success'
  isLoading?: boolean; // if busy
  showSkeleton?: boolean; // if not initialized
};

export function initStoreState(): StoreState {
  return {
    requestStatus: { value: 'initializing' },
    isLoading: false,
    showSkeleton: true,
    isReady: false,
  };
}

// ****************************************************
// Status State
// ****************************************************

export declare type StatusState =
  | SuccessState
  | ErrorState
  | PendingState
  | InitializingState;
export interface SuccessState {
  value: 'success';
}
export interface PendingState {
  value: 'pending';
}
export interface InitializingState {
  value: 'initializing';
}
export interface ErrorState {
  value: 'error';
  errors: RestErrors;
}

// ****************************************************
// Status Map Functions
// ****************************************************

/**
 * With 'ready' async action:
 *  -  update loading status
 *  -  trigger async action
 *  -  update with action data AND updated status
 */
export function trackStatusWith<T extends StoreState>(
  get: () => T,
  set: (state: unknown) => T,
) {
  return async <U = unknown>(action: () => Promise<Partial<T>>) => {
    // Track isLoading state
    set(updateRequestStatus('pending'));

    // Trigger async action
    let withUpdatedRequestStatus = updateRequestStatus('success');
    let updates: U;
    try {
      updates = (await action()) as U;
    } catch (error) {
      withUpdatedRequestStatus = updateRequestStatus('error');
    }

    // Update with action data AND updated status
    set((state: T) =>
      withUpdatedRequestStatus({
        ...state,
        ...updates,
      }),
    );

    return updates!;
  };
}

export const getRequestStatus = (state: StoreState) => {
  return state.requestStatus;
};

export const getErrorMessages = (state: StoreState): string[] => {
  const errors = (state.requestStatus as ErrorState).errors || [];
  return errors.map((it) => (it as RestErrorMessage).errorMessage);
};

export const getIsInitializing = (s: StoreState) =>
  getRequestStatus(s).value === 'initializing';
export const getIsLoading = (s: StoreState) =>
  getRequestStatus(s).value === 'pending';
export const getIsReady = (s: StoreState) =>
  getRequestStatus(s).value === 'success';

export function updateRequestStatus<T extends StoreState>(
  flag: 'pending' | 'success' | 'initializing' | 'error',
  updates?: Partial<T> & Errors,
) {
  return (state: T): T => {
    const wasInitializing = getIsInitializing(state);
    state = {
      ...state,
      requestStatus: resolveStatus(flag, updates?.errors),
    };

    return {
      ...state,
      // Update raw values for view models
      isLoading: getIsLoading(state),
      showSkeleton:
        (wasInitializing && getIsLoading(state)) || getIsInitializing(state),
      isReady: getIsReady(state),
    };
  };
}

// ****************************************************
// Internal Status Utils
// ****************************************************

function resolveStatus(flag: StatusState['value'], errors?: RestErrors) {
  const newStatus = {
    value: flag,
  } as StatusState;

  if (flag === 'error') {
    newStatus.value = 'error';
    (newStatus as ErrorState).errors = errors || [];

    // Debugging
    if (errors?.length) console.log(errors);
  }

  return newStatus;
}
