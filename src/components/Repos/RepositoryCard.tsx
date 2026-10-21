import type { Repository } from '../../types/github';
import { formatCount } from '../../utils/formatCount';
import { ExternalLinkIcon, ForkIcon, StarIcon } from '../ui/Icons';

interface RepositoryCardProps {
  repository: Repository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const { owner } = repository;

  return (
    <article className="repo-card">
      <div className="repo-card__top">
        <img
          className="repo-card__avatar"
          src={owner.avatar_url}
          alt={`Аватар ${owner.login}`}
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
        />
        <div className="repo-card__identity">
          <span className="repo-card__owner">{owner.login}</span>
          <h3 className="repo-card__name">
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer" title={repository.full_name}>
              <span className="repo-card__name-text">{repository.name}</span>
              <ExternalLinkIcon width={16} height={16} />
            </a>
          </h3>
        </div>
      </div>
      <p className="repo-card__description">{repository.description || 'Описание не добавлено.'}</p>
      <div className="repo-card__footer">
        <ul className="repo-card__stats" aria-label="Статистика репозитория">
          <li title="Звёзды GitHub"><StarIcon width={17} height={17} /> {formatCount(repository.stargazers_count)}</li>
          <li title="Форки"><ForkIcon width={17} height={17} /> {formatCount(repository.forks_count)}</li>
        </ul>
        {repository.language && <span className="repo-card__language" title="Основной язык">{repository.language}</span>}
      </div>
    </article>
  );
}
