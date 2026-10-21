import { afterEach, describe, expect, it, vi } from 'vitest';
import { GithubSearchError, isRepository, searchGithubRepositories } from './github';

const repository = {
  id: 1,
  name: 'example',
  full_name: 'octocat/example',
  html_url: 'https://github.com/octocat/example',
  description: null,
  stargazers_count: 123,
  forks_count: 8,
  language: 'TypeScript',
  owner: { login: 'octocat', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
};

afterEach(() => vi.unstubAllGlobals());

describe('GitHub repository search', () => {
  it('properly URL-encodes search text and validates results', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [repository], total_count: 1 }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await searchGithubRepositories(' react & typescript ');
    const url = new URL(fetchMock.mock.calls[0]?.[0] as URL);

    expect(url.searchParams.get('q')).toBe('react & typescript');
    expect(url.searchParams.get('per_page')).toBe('10');
    expect(result.items).toEqual([repository]);
    expect(result.totalCount).toBe(1);
  });

  it('rejects unexpected response shapes and unsafe links', async () => {
    expect(isRepository({ ...repository, html_url: 'javascript:alert(1)' })).toBe(false);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: null }) }));
    await expect(searchGithubRepositories('react')).rejects.toBeInstanceOf(GithubSearchError);
  });

  it('shows rate limit errors clearly', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    await expect(searchGithubRepositories('react')).rejects.toThrow('GitHub ограничил');
  });

  it('does not make requests for blank queries', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(searchGithubRepositories('   ')).resolves.toEqual({ items: [], totalCount: 0 });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
