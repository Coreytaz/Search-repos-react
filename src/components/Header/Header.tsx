import type { ChangeEvent, FormEvent } from 'react';

import { CodeIcon, ExternalLinkIcon, SearchIcon } from '../ui/Icons';
import styles from './Header.module.css';

interface HeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export default function Header({
  query,
  onQueryChange,
  onSubmit,
  onReset,
  isLoading,
}: HeaderProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onQueryChange(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.navigation} aria-label="Главная навигация">
          <a className={styles.skipLink} href="#main-content">
            Перейти к результатам
          </a>
          <button
            type="button"
            className={styles.logo}
            onClick={onReset}
            aria-label="ReactRepos — сбросить поиск"
          >
            <span className={styles.logoMark}>
              <CodeIcon width={23} height={23} />
            </span>
            <span className={styles.logoFull}>
              React<span>Repos</span>
            </span>
            <span className={styles.logoShort} aria-hidden="true">
              RR
            </span>
          </button>
          <a
            className={styles.githubLink}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть GitHub <ExternalLinkIcon width={15} height={15} />
          </a>
        </nav>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>
            <span /> ВСЕЛЕННАЯ OPEN SOURCE
          </p>
          <h1>
            Следующий большой проект
            <br />
            начинается с <span>любопытства.</span>
          </h1>
          <p className={styles.description}>
            Откройте для себя код, который вдохновляет.
            <br />
            Ищите публичные репозитории, идеи и любимые технологии.
          </p>
          <form role="search" className={styles.search} onSubmit={handleSubmit}>
            <SearchIcon className={styles.inputIcon} width={21} height={21} />
            <label htmlFor="repo-query" className="visually-hidden">
              Поиск репозиториев
            </label>
            <input
              id="repo-query"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder="Название, тема или технология..."
              value={query}
              onChange={handleChange}
              maxLength={256}
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Искать репозитории"
              aria-busy={isLoading}
            >
              <span>Найти</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>
          <div className={styles.suggestions}>
            <span>Попробуйте</span>
            {['React', 'TypeScript', 'Rust', 'Machine learning'].map((topic) => (
              <button type="button" key={topic} onClick={() => onQueryChange(topic)}>
                {topic}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
