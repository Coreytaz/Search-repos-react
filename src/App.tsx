import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Repos from './components/Repos/Repos';
import { useRepositorySearch } from './hooks/useRepositorySearch';
import './App.css';

const DEBOUNCE_MS = 500;

export default function App() {
  const [query, setQuery] = useState('');
  const { state, search, cancel, clear } = useRepositorySearch();

  useEffect(() => {
    if (!query.trim()) return;

    const timer = window.setTimeout(() => {
      void search(query);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query, search]);

  function handleQueryChange(next: string) {
    if (next.trim()) cancel();
    else clear();
    setQuery(next);
  }

  function handleReset() {
    setQuery('');
    clear();
  }

  function handleSubmit() {
    if (!query.trim()) {
      handleReset();
      return;
    }
    void search(query, true);
  }

  return (
    <>
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        isLoading={state.status === 'loading'}
      />
      <main className="page-main" id="main-content">
        <Repos state={state} onRetry={handleSubmit} />
      </main>
      <footer className="page-footer">
        <span>Маленький поиск. Большие открытия.</span>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          Данные GitHub ↗
        </a>
      </footer>
    </>
  );
}
