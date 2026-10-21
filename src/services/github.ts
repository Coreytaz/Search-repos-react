import type { Repository, RepositorySearchResults } from '../types/github';

const SEARCH_ENDPOINT = 'https://api.github.com/search/repositories';
const PAGE_SIZE = 10;

export class GithubSearchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GithubSearchError';
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSafeGithubUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'github.com';
  } catch {
    return false;
  }
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function isRepository(value: unknown): value is Repository {
  if (!isObject(value) || !isObject(value.owner)) return false;

  return (
    typeof value.id === 'number' &&
    Number.isFinite(value.id) &&
    typeof value.name === 'string' &&
    typeof value.full_name === 'string' &&
    isSafeGithubUrl(value.html_url) &&
    (value.description === null || typeof value.description === 'string') &&
    typeof value.stargazers_count === 'number' &&
    typeof value.forks_count === 'number' &&
    (value.language === null || typeof value.language === 'string') &&
    typeof value.owner.login === 'string' &&
    isHttpsUrl(value.owner.avatar_url)
  );
}

export async function searchGithubRepositories(
  query: string,
  signal?: AbortSignal,
): Promise<RepositorySearchResults> {
  const normalized = query.trim();
  if (!normalized) return { items: [], totalCount: 0 };

  const url = new URL(SEARCH_ENDPOINT);
  url.searchParams.set('q', normalized);
  url.searchParams.set('per_page', String(PAGE_SIZE));

  let response: Response;
  try {
    response = await fetch(url, {
      signal,
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new GithubSearchError('Не удалось подключиться к GitHub. Проверьте соединение.');
  }

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new GithubSearchError('GitHub ограничил частоту запросов. Повторите поиск позже.');
    }
    if (response.status === 422) {
      throw new GithubSearchError('Некорректный поисковый запрос. Измените текст поиска.');
    }
    throw new GithubSearchError(`Не удалось загрузить репозитории (HTTP ${response.status}).`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new GithubSearchError('GitHub вернул некорректный ответ.');
  }

  if (!isObject(data) || !Array.isArray(data.items) || typeof data.total_count !== 'number') {
    throw new GithubSearchError('GitHub вернул ответ неожиданного формата.');
  }

  return {
    items: data.items.filter(isRepository),
    totalCount: data.total_count,
  };
}
