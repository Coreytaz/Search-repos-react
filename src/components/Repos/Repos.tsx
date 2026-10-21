import type { SearchState } from '../../hooks/useRepositorySearch';
import RepositoryCard from './RepositoryCard';
import { SearchIcon } from '../ui/Icons';
import './Repos.css';

interface ReposProps {
  state: SearchState;
  onRetry: () => void;
}

export default function Repos({ state, onRetry }: ReposProps) {
  if (state.status === 'loading') {
    return (
      <section className="results-status" role="status" aria-live="polite">
        <span className="results-spinner" aria-hidden="true" />
        <h2>Ищем репозитории...</h2>
        <p>Получаем данные из GitHub.</p>
      </section>
    );
  }

  if (state.status === 'error') {
    return (
      <section className="results-status" role="alert">
        <span className="results-status__symbol" aria-hidden="true">
          !
        </span>
        <h2>Не удалось выполнить поиск</h2>
        <p>{state.error}</p>
        <button className="results-retry" type="button" onClick={onRetry}>
          Повторить
        </button>
      </section>
    );
  }

  if (state.status === 'idle' || state.repositories.length === 0) {
    return (
      <section className="results-status" role="status">
        <div className="results-status__illustration" aria-hidden="true">
          <span className="results-status__orbit" />
          <span className="results-status__symbol">
            <SearchIcon width={30} height={30} />
          </span>
          <span className="results-status__spark">✦</span>
        </div>
        <h2>{state.status === 'idle' ? 'Начните с поиска' : 'Ничего не найдено'}</h2>
        <p>
          {state.status === 'idle'
            ? 'Где-то здесь ваш следующий любимый репозиторий. Введите запрос или выберите технологию выше.'
            : 'Попробуйте другое название или более общий запрос.'}
        </p>
        {state.status === 'idle' && (
          <span className="results-status__hint">Хорошие идеи начинаются с одного запроса</span>
        )}
      </section>
    );
  }

  return (
    <section className="results" aria-label="Найденные репозитории">
      <div className="results__heading">
        <h2>Результаты поиска</h2>
        <span>Всего найдено: {new Intl.NumberFormat('ru').format(state.totalCount)}</span>
      </div>
      <div className="repo-grid">
        {state.repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </section>
  );
}
