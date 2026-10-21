import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { SearchState } from '../../hooks/useRepositorySearch';
import Repos from './Repos';

const idle: SearchState = { status: 'idle', repositories: [], totalCount: 0, error: null };

const repository = {
  id: 1,
  name: 'example',
  full_name: 'octocat/example',
  html_url: 'https://github.com/octocat/example',
  description: 'Example description',
  stargazers_count: 1500,
  forks_count: 40,
  language: 'TypeScript',
  owner: { login: 'octocat', avatar_url: 'https://avatars.githubusercontent.com/u/1' },
};

describe('repository result states', () => {
  it('renders an accessible initial prompt', () => {
    render(<Repos state={idle} onRetry={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Начните с поиска' })).toBeInTheDocument();
  });

  it('renders repo details and a safe external link', () => {
    render(<Repos state={{ ...idle, status: 'success', repositories: [repository], totalCount: 1 }} onRetry={vi.fn()} />);
    const link = screen.getByRole('link', { name: /example/ });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Example description')).toBeInTheDocument();
    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });

  it('renders failure state', () => {
    render(<Repos state={{ ...idle, status: 'error', error: 'Network failure' }} onRetry={vi.fn()} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network failure');
    expect(screen.getByRole('button', { name: 'Повторить' })).toBeInTheDocument();
  });
});
