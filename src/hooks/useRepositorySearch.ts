import { useCallback, useEffect, useRef, useState } from 'react';

import { searchGithubRepositories } from '../services/github';
import type { Repository } from '../types/github';

type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SearchState {
  status: SearchStatus;
  repositories: Repository[];
  totalCount: number;
  error: string | null;
}

const INITIAL_STATE: SearchState = {
  status: 'idle',
  repositories: [],
  totalCount: 0,
  error: null,
};

export function useRepositorySearch() {
  const [state, setState] = useState<SearchState>(INITIAL_STATE);
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const requestedQueryRef = useRef<string | null>(null);

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    requestIdRef.current += 1;
    requestedQueryRef.current = null;
  }, []);

  const clear = useCallback(() => {
    cancel();
    setState(INITIAL_STATE);
  }, [cancel]);

  const search = useCallback(async (query: string, force = false) => {
    const normalized = query.trim();
    if (!normalized) {
      // The caller handles clearing the input, so an empty request is a no-op.
      return;
    }
    if (!force && requestedQueryRef.current === normalized) return;

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    requestedQueryRef.current = normalized;
    const requestId = ++requestIdRef.current;
    setState({ ...INITIAL_STATE, status: 'loading' });

    try {
      const results = await searchGithubRepositories(normalized, controller.signal);
      if (controller.signal.aborted || requestId !== requestIdRef.current) return;
      setState({
        status: 'success',
        repositories: results.items,
        totalCount: results.totalCount,
        error: null,
      });
    } catch (error: unknown) {
      if (controller.signal.aborted || requestId !== requestIdRef.current) return;
      requestedQueryRef.current = null;
      setState({
        ...INITIAL_STATE,
        status: 'error',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка поиска.',
      });
    }
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { state, search, cancel, clear };
}
